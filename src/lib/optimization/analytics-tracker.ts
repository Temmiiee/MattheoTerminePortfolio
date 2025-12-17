/**
 * Analytics tracker for Core Web Vitals and performance metrics
 * Implements continuous monitoring and automated reporting
 */

import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';
import { CoreWebVitals } from './types';

export interface AnalyticsConfig {
  enabled: boolean;
  endpoint?: string;
  reportInterval?: number; // milliseconds
  debug?: boolean;
}

export interface MetricReport {
  metrics: Partial<CoreWebVitals>;
  timestamp: number;
  url: string;
  userAgent: string;
}

export class AnalyticsTracker {
  private metrics: Partial<CoreWebVitals> = {};
  private config: AnalyticsConfig;
  private reportTimer?: NodeJS.Timeout;
  private metricsHistory: MetricReport[] = [];

  constructor(config: AnalyticsConfig = { enabled: true }) {
    this.config = config;
  }

  /**
   * Initialize Core Web Vitals tracking
   */
  trackCoreWebVitals(): void {
    if (!this.config.enabled) return;

    // Track LCP
    onLCP((metric: Metric) => {
      this.metrics.lcp = metric.value;
      this.handleMetric('LCP', metric);
    });

    // Track INP (replaces FID)
    onINP((metric: Metric) => {
      this.metrics.fid = metric.value;
      this.handleMetric('INP', metric);
    });

    // Track CLS
    onCLS((metric: Metric) => {
      this.metrics.cls = metric.value;
      this.handleMetric('CLS', metric);
    });

    // Track FCP
    onFCP((metric: Metric) => {
      this.metrics.fcp = metric.value;
      this.handleMetric('FCP', metric);
    });

    // Track TTFB
    onTTFB((metric: Metric) => {
      this.metrics.ttfb = metric.value;
      this.handleMetric('TTFB', metric);
    });

    // Set up automated reporting if interval is configured AND endpoint is available
    if (this.config.reportInterval && this.config.endpoint && this.config.endpoint.trim() !== '') {
      this.startAutomatedReporting();
    }
  }

  /**
   * Get current metrics snapshot
   */
  getMetrics(): Partial<CoreWebVitals> {
    return { ...this.metrics };
  }

  /**
   * Get metrics history
   */
  getMetricsHistory(): MetricReport[] {
    return [...this.metricsHistory];
  }

  /**
   * Generate a performance report
   */
  generateReport(): MetricReport {
    const report: MetricReport = {
      metrics: { ...this.metrics },
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
    };

    this.metricsHistory.push(report);
    return report;
  }

  /**
   * Send metrics to analytics endpoint
   */
  async sendToAnalytics(report: MetricReport): Promise<void> {
    // Skip if no endpoint configured or endpoint is empty
    if (!this.config.endpoint || this.config.endpoint.trim() === '') return;

    try {
      const body = JSON.stringify(report);

      // Use sendBeacon for reliability
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        navigator.sendBeacon(this.config.endpoint, body);
      } else {
        // Fallback to fetch
        await fetch(this.config.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          keepalive: true
        });
      }
    } catch (error) {
      if (this.config.debug) {
        console.error('Failed to send analytics:', error);
      }
    }
  }

  /**
   * Store metrics in local storage for persistence
   */
  persistMetrics(): void {
    if (typeof window === 'undefined') return;

    try {
      const data = {
        metrics: this.metrics,
        timestamp: Date.now()
      };
      localStorage.setItem('webVitalsMetrics', JSON.stringify(data));
    } catch (error) {
      if (this.config.debug) {
        console.error('Failed to persist metrics:', error);
      }
    }
  }

  /**
   * Load persisted metrics from local storage
   */
  loadPersistedMetrics(): Partial<CoreWebVitals> | null {
    if (typeof window === 'undefined') return null;

    try {
      const data = localStorage.getItem('webVitalsMetrics');
      if (data) {
        const parsed = JSON.parse(data);
        return parsed.metrics;
      }
    } catch (error) {
      if (this.config.debug) {
        console.error('Failed to load persisted metrics:', error);
      }
    }
    return null;
  }

  /**
   * Start automated reporting at configured interval
   */
  private startAutomatedReporting(): void {
    if (this.reportTimer) {
      clearInterval(this.reportTimer);
    }

    this.reportTimer = setInterval(() => {
      const report = this.generateReport();
      this.sendToAnalytics(report);
      this.persistMetrics();
    }, this.config.reportInterval);
  }

  /**
   * Stop automated reporting
   */
  stopAutomatedReporting(): void {
    if (this.reportTimer) {
      clearInterval(this.reportTimer);
      this.reportTimer = undefined;
    }
  }

  /**
   * Handle individual metric updates
   */
  private handleMetric(name: string, metric: Metric): void {
    if (this.config.debug) {
      console.info(`${name}:`, {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta
      });
    }

    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
      gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true
      });
    }

    // Persist after each metric update
    this.persistMetrics();
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.stopAutomatedReporting();
    this.metrics = {};
    this.metricsHistory = [];
  }
}

// Singleton instance for global use
let globalTracker: AnalyticsTracker | null = null;

export function getAnalyticsTracker(config?: AnalyticsConfig): AnalyticsTracker {
  if (!globalTracker) {
    globalTracker = new AnalyticsTracker(config);
  }
  return globalTracker;
}
