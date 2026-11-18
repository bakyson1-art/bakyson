# Railway CLI Cheat Sheet (Current Version)
# Run these in PowerShell from C:\Users\User\Documents\Bakyson

# List all projects
railway project list

# Link to a project
railway link

# List variables
railway variable list

# Get a specific variable (if supported)
railway variable get DATABASE_URL

# Set a variable
railway variable set DATABASE_URL=postgresql://...
railway variable set REDIS_URL=redis://...
railway variable set NEXTAUTH_SECRET=your-secret
railway variable set NEXTAUTH_URL=https://bakyson.com
railway variable set RESEND_API_KEY=re_xxx
railway variable set ADMIN_EMAIL=support@bakyson.com
railway variable set SMTP_FROM=noreply@bakyson.com

# Deploy
railway up

# Open in browser
railway open

# Check status
railway status
