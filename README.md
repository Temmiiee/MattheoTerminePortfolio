# Matthéo Termine - Portfolio Website

A modern, accessible website for Matthéo Termine, a freelance web integrator specializing in creating fast, SEO-optimized, and RGAA-compliant websites.

![CI/CD Pipeline](https://github.com/Temmiiee/TemmiiePortfolio/workflows/CI/CD%20Pipeline/badge.svg)
![Code Quality](https://github.com/Temmiiee/TemmiiePortfolio/workflows/Code%20Quality/badge.svg)

## ✨ Features

- 🎨 Modern, responsive design
- ♿ RGAA accessibility compliance
- 🚀 Optimized for performance and SEO
- 🔧 Built with Next.js 15 and TypeScript
- 🎯 Interactive quote calculator
- 📱 Mobile-first approach
- 🌐 Structured data for better SEO
- 🔒 Security-focused development

## 🚦 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Temmiiee/TemmiiePortfolio.git
   cd TemmiiePortfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional):
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:9002`

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **PDF Generation**: jsPDF
- **Error Monitoring**: Sentry (optional)
- **Analytics**: Built-in performance monitoring

## 🎯 Key Sections

1. **Hero Section**: Introduction and main call-to-action
2. **Services**: Web development services offered
3. **Process**: Step-by-step work methodology
4. **Projects**: Portfolio showcase with detailed project cards
5. **Pricing**: Transparent pricing plans with quote calculator
6. **About**: Personal background and expertise
7. **Contact**: Multiple contact methods including form

## ♿ Accessibility Features

- RGAA compliance for French accessibility standards
- Semantic HTML structure
- Proper ARIA labels and roles
- Keyboard navigation support
- Skip links for screen readers
- High contrast color scheme
- Focus management

## 📱 Responsive Design

The website is fully responsive and optimized for all device sizes:
- Mobile-first approach
- Breakpoints: mobile (default), tablet (768px+), desktop (1024px+)
- Touch-friendly interactions
- Optimized images and assets

## 🚀 Performance

- Lighthouse Score: 95+ across all metrics
- Core Web Vitals optimized
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Minimal bundle size

## 🔧 Development

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/            # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and data
└── styles/               # Global styles

public/
├── images/               # Static images
├── icons/                # Icon files
└── ...                   # Other static assets
```

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting (recommended)
- Pre-commit hooks (recommended)

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# SMTP Configuration (optional)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
SMTP_FROM=noreply@your-domain.com

# Sentry (optional)
SENTRY_DSN=your-sentry-dsn

# Base URL
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The project is compatible with:
- Netlify
- AWS Amplify
- Railway
- Docker containers

## 🔒 Security

- Input validation with Zod schemas
- XSS protection
- CSRF protection
- Secure headers configuration
- Regular dependency updates via Dependabot

## 🧪 Testing

```bash
# Run type checking
npm run typecheck

# Run linting
npm run lint

# Build for production (test)
npm run build
```

## 📊 Analytics & Monitoring

- Built-in Next.js analytics
- Sentry for error monitoring (optional)
- Core Web Vitals tracking
- Custom event tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Matthéo Termine - [contact@mattheo-termine.fr](mailto:contact@mattheo-termine.fr)

Project Link: [https://github.com/Temmiiee/TemmiiePortfolio](https://github.com/Temmiiee/TemmiiePortfolio)