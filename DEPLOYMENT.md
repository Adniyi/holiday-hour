# HolidyHours Deployment Guide

This guide covers deploying both the Next.js frontend and FastAPI backend for the HolidyHours application.

## Prerequisites

- Supabase account with project created
- Paystack account (API keys)
- Resend account (API key)
- Vercel account (for frontend)
- Render or Heroku account (for backend)

## Database Setup (Supabase)

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and keys

2. **Run Migrations**:
   - Migrations are already applied through Supabase dashboard
   - Verify tables: `businesses`, `pages`, `analytics`
   - Check that RLS policies are enabled

3. **Get Connection Strings**:
   - Go to Project Settings → Database
   - Copy the connection string (Pooler recommended)
   - Note: Use the direct connection for migrations, pooler for app

## Frontend Deployment (Vercel)

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Framework: Next.js (auto-detected)

3. **Configure Environment Variables**:
   Add these in Vercel dashboard:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.render.com
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxx
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Get deployment URL

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Backend Deployment (Render)

### Step 1: Prepare for Deployment

1. **Ensure all files are in backend/**:
   ```
   backend/
   ├── main.py
   ├── requirements.txt
   ├── Dockerfile
   ├── config.py
   ├── database.py
   ├── models.py
   ├── schemas.py
   ├── routes/
   └── services/
   ```

2. **Test locally**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

### Step 2: Deploy to Render

1. **Create Web Service**:
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**:
   - **Name**: holidyhours-api
   - **Environment**: Docker (or Python 3.11)
   - **Build Command**: (auto-detected from Dockerfile)
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Choose appropriate plan

3. **Environment Variables**:
   Add these in Render dashboard:
   ```
   DATABASE_URL=postgresql://...
   SUPABASE_URL=https://xxx.supabase.co
   SUPABASE_KEY=your_service_role_key
   SECRET_KEY=generate-secure-random-32-char-string
   PAYSTACK_SECRET_KEY=sk_live_xxx
   PAYSTACK_PUBLIC_KEY=pk_live_xxx
   RESEND_API_KEY=re_xxx
   FROM_EMAIL=noreply@yourdomain.com
   APP_URL=https://your-app.vercel.app
   FRONTEND_URL=https://your-app.vercel.app
   ALLOWED_ORIGINS=https://your-app.vercel.app
   ENVIRONMENT=production
   ```

4. **Deploy**:
   - Click "Create Web Service"
   - Render will build and deploy
   - Get deployment URL (e.g., https://holidyhours-api.onrender.com)

### Step 3: Update Frontend

Update frontend environment variable:
```
NEXT_PUBLIC_API_URL=https://holidyhours-api.onrender.com
```

## Alternative: Heroku Deployment

### Backend on Heroku

1. **Create Procfile** in `backend/`:
   ```
   web: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

2. **Create runtime.txt** in `backend/`:
   ```
   python-3.11.0
   ```

3. **Deploy**:
   ```bash
   heroku login
   heroku create holidyhours-api
   heroku config:set DATABASE_URL=...
   heroku config:set SUPABASE_URL=...
   # ... set all environment variables
   git subtree push --prefix backend heroku main
   ```

## Post-Deployment Setup

### 1. Configure Paystack Webhooks

1. Go to Paystack Dashboard → Settings → Webhooks
2. Add webhook URL: `https://your-api-url/api/payment/webhook`
3. Select events: `charge.success`

### 2. Configure Domain (Optional)

**Frontend**:
- Add custom domain in Vercel
- Update DNS records

**Backend**:
- Add custom domain in Render
- Update CORS origins

### 3. Email Domain Verification

1. Go to Resend dashboard
2. Add and verify your domain
3. Update `FROM_EMAIL` to use verified domain

### 4. Test the Application

1. **Create a test business**:
   - Visit your frontend URL
   - Go through wizard
   - Use test Paystack card: 4084084084084081

2. **Test magic link**:
   - Check email for magic link
   - Click to access dashboard
   - Verify editing works

3. **Test sharing**:
   - Share public page
   - Test on mobile
   - Verify analytics increment

### 5. Monitor and Scale

**Frontend (Vercel)**:
- Monitor in Vercel dashboard
- Check build logs
- Set up analytics

**Backend (Render)**:
- Monitor in Render dashboard
- Check logs for errors
- Scale plan if needed

**Database (Supabase)**:
- Monitor usage in Supabase dashboard
- Set up backups
- Monitor database size

## Production Checklist

- [ ] Database migrations applied
- [ ] All environment variables set
- [ ] CORS configured correctly
- [ ] Paystack webhook configured
- [ ] Email domain verified
- [ ] Test payment flow (use test keys first)
- [ ] Test magic link authentication
- [ ] Test on mobile devices
- [ ] Monitor error logs
- [ ] Set up domain (optional)
- [ ] Add monitoring/alerts
- [ ] Document any custom configurations

## Troubleshooting

### CORS Errors
- Check `ALLOWED_ORIGINS` includes frontend URL
- Verify no trailing slashes
- Check Vercel deployment URL

### Payment Failures
- Verify Paystack keys (test vs live)
- Check webhook is receiving events
- Review Paystack dashboard logs

### Email Not Sending
- Verify Resend API key
- Check domain verification
- Review Resend dashboard logs

### Database Connection Issues
- Verify connection string
- Check Supabase project is active
- Ensure IP is not blocked

### Build Failures
- Check all environment variables are set
- Verify dependencies in requirements.txt
- Review build logs

## Rollback Procedure

### Frontend
- Go to Vercel dashboard
- Select previous deployment
- Click "Promote to Production"

### Backend
- Go to Render dashboard
- Select previous deploy
- Click "Redeploy"

## Scaling Considerations

### When to Scale

- Frontend: Vercel auto-scales
- Backend: Monitor response times, upgrade Render plan
- Database: Monitor Supabase usage, upgrade tier

### Cost Optimization

- Use CDN for static assets (Vercel provides)
- Implement caching where appropriate
- Monitor database query performance
- Use connection pooling (Supabase Pooler)

---

## Support

For deployment issues:
- Check logs in respective platforms
- Review this guide
- Contact support@holidyhours.com
