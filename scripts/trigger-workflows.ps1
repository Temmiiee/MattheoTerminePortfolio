# 🚀 Script de déclenchement des workflows GitHub Actions
param(
    [string]$WorkflowType = "all",
    [string]$Message = "Manual workflow trigger"
)

Write-Host "🔥 Déclenchement des workflows GitHub Actions" -ForegroundColor Cyan
Write-Host "=" * 50

switch ($WorkflowType.ToLower()) {
    "codeql" {
        Write-Host "🔍 Déclenchement CodeQL Analysis..." -ForegroundColor Yellow
        
        # Créer un petit changement pour déclencher CodeQL
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        Add-Content -Path "WORKFLOW_TRIGGER.md" -Value "`n<!-- CodeQL trigger: $timestamp -->"
        
        git add WORKFLOW_TRIGGER.md
        git commit -m "trigger: CodeQL Analysis - $Message"
        git push
        
        Write-Host "✅ CodeQL workflow déclenché via push" -ForegroundColor Green
    }
    
    "security" {
        Write-Host "🛡️ Déclenchement Security Scan..." -ForegroundColor Yellow
        
        # Toucher package.json pour déclencher le security scan
        $packageJson = Get-Content "package.json" | ConvertFrom-Json
        $packageJson.scripts.PSObject.Properties.Add([PSNoteProperty]::new("security-trigger", "echo 'Security scan triggered'"))
        $packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"
        
        git add package.json
        git commit -m "trigger: Security Scan - $Message"
        git push
        
        Write-Host "✅ Security Scan workflow déclenché" -ForegroundColor Green
        
        # Restaurer package.json
        git checkout HEAD~1 -- package.json
        git add package.json
        git commit -m "restore: Package.json après déclenchement security scan"
        git push
    }
    
    "dependabot" {
        Write-Host "🤖 Information Dependabot..." -ForegroundColor Yellow
        Write-Host "ℹ️ Dependabot se déclenche automatiquement selon la configuration:" -ForegroundColor Cyan
        Write-Host "  - Quotidiennement pour les mises à jour de sécurité"
        Write-Host "  - Hebdomadairement pour les autres mises à jour"
        Write-Host "  - Via PR automatiques quand des mises à jour sont disponibles"
        Write-Host ""
        Write-Host "Pour forcer une vérification Dependabot:" -ForegroundColor Yellow
        Write-Host "1. Aller sur: https://github.com/Temmiiee/TemmiiePortfolio/network/dependencies"
        Write-Host "2. Cliquer sur 'Check for updates' si disponible"
        Write-Host "3. Ou attendre la prochaine exécution programmée"
    }
    
    "all" {
        Write-Host "🚀 Déclenchement de tous les workflows..." -ForegroundColor Yellow
        
        # Créer des changements pour déclencher tous les workflows
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        
        # 1. Déclencher CodeQL + Security Scan via push général
        Add-Content -Path "WORKFLOW_TRIGGER.md" -Value "`n<!-- All workflows trigger: $timestamp -->"
        
        # 2. Mettre à jour une dépendance de dev pour Security Scan
        try {
            npm update --save-dev typescript 2>$null
            Write-Host "📦 Dépendance TypeScript mise à jour" -ForegroundColor Green
        } catch {
            Write-Host "⚠️ Impossible de mettre à jour TypeScript" -ForegroundColor Yellow
        }
        
        git add .
        git commit -m "trigger: Tous les workflows - $Message

- Déclenchement CodeQL Analysis via push
- Déclenchement Security Scan via modification dépendances  
- Test complet de l'intégration CI/CD
- Vérification des systèmes de sécurité automatisés"
        git push
        
        Write-Host "✅ Tous les workflows déclenchés!" -ForegroundColor Green
    }
    
    default {
        Write-Host "❌ Type de workflow non reconnu: $WorkflowType" -ForegroundColor Red
        Write-Host ""
        Write-Host "Types disponibles:" -ForegroundColor Yellow
        Write-Host "  - codeql    : Déclencher CodeQL Analysis"
        Write-Host "  - security  : Déclencher Security Scan"
        Write-Host "  - dependabot: Informations Dependabot"
        Write-Host "  - all       : Déclencher tous les workflows"
        Write-Host ""
        Write-Host "Exemple: .\scripts\trigger-workflows.ps1 -WorkflowType 'codeql' -Message 'Test sécurité'"
        return
    }
}

Write-Host ""
Write-Host "🔗 Voir les résultats sur:" -ForegroundColor Cyan
Write-Host "https://github.com/Temmiiee/TemmiiePortfolio/actions"

Write-Host ""
Write-Host "⏱️ Temps d'attente estimé:" -ForegroundColor Yellow
Write-Host "  - CodeQL Analysis: ~5-10 minutes"
Write-Host "  - Security Scan: ~2-3 minutes"  
Write-Host "  - Dependabot: Vérification immédiate, PR selon disponibilité"