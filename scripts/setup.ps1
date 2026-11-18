# Bakyson Railway Setup Script
# Run this in PowerShell after provisioning Railway services.
# 
# Prerequisites:
#   1. Railway CLI installed: npm install -g @railway/cli
#   2. Logged in: railway login
#   3. PostgreSQL and Redis services added to your Railway project
#
# Usage: .\scripts\setup.ps1

$ErrorActionPreference = "Stop"

Write-Host "🚀 Bakyson Railway Setup" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check Railway CLI
Write-Host "[1/6] Checking Railway CLI..." -ForegroundColor Yellow
$railwayCli = Get-Command "railway" -ErrorAction SilentlyContinue
if (-not $railwayCli) {
    Write-Host "❌ Railway CLI not found. Install it first:" -ForegroundColor Red
    Write-Host "   npm install -g @railway/cli" -ForegroundColor White
    Write-Host "   railway login" -ForegroundColor White
    exit 1
}
Write-Host "✅ Railway CLI found" -ForegroundColor Green

# Step 2: Check if linked to a project
Write-Host "[2/6] Checking Railway project link..." -ForegroundColor Yellow
$linkStatus = railway status 2>$null
if (-not $linkStatus) {
    Write-Host "⚠️  Not linked to a Railway project. Run:" -ForegroundColor Yellow
    Write-Host "   railway init" -ForegroundColor White
    Write-Host "   Then select your Bakyson project." -ForegroundColor White
    exit 1
}
Write-Host "✅ Linked to Railway project" -ForegroundColor Green

# Step 3: Check PostgreSQL service
Write-Host "[3/6] Checking PostgreSQL service..." -ForegroundColor Yellow
$dbUrl = railway variables get DATABASE_URL 2>$null
if (-not $dbUrl) {
    Write-Host "⚠️  DATABASE_URL not found. Add PostgreSQL to your project:" -ForegroundColor Yellow
    Write-Host "   railway add postgresql" -ForegroundColor White
    exit 1
}
Write-Host "✅ DATABASE_URL configured" -ForegroundColor Green

# Step 4: Check Redis service
Write-Host "[4/6] Checking Redis service..." -ForegroundColor Yellow
$redisUrl = railway variables get REDIS_URL 2>$null
if (-not $redisUrl) {
    Write-Host "⚠️  REDIS_URL not found. Add Redis to your project:" -ForegroundColor Yellow
    Write-Host "   railway add redis" -ForegroundColor White
    exit 1
}
Write-Host "✅ REDIS_URL configured" -ForegroundColor Green

# Step 5: Run database migration
Write-Host "[5/6] Running database migration..." -ForegroundColor Yellow
$env:DATABASE_URL = $dbUrl
try {
    npx tsx scripts/migrate.ts
    Write-Host "✅ Migration completed" -ForegroundColor Green
} catch {
    Write-Host "❌ Migration failed" -ForegroundColor Red
    exit 1
}

# Step 6: Seed demo data (optional)
Write-Host "[6/6] Seeding demo data..." -ForegroundColor Yellow
try {
    npx tsx scripts/seed.ts
    Write-Host "✅ Demo data seeded" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Seeding skipped (optional)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Cyan
Write-Host "====================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "   1. Set NEXTAUTH_SECRET: railway variables set NEXTAUTH_SECRET='$(New-Guid)'" -ForegroundColor White
Write-Host "   2. Set RESEND_API_KEY: railway variables set RESEND_API_KEY='your-key'" -ForegroundColor White
Write-Host "   3. Deploy: railway up" -ForegroundColor White
Write-Host "   4. Visit your Railway deployment URL" -ForegroundColor White
Write-Host ""
