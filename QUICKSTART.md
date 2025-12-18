# HolidyHours Quick Start Guide

Get your HolidyHours application up and running in 10 minutes!

## Quick Setup (Development)

### 1. Prerequisites Check

```bash
node --version  # Should be 18+
python --version  # Should be 3.11+
```

### 2. Database Setup (5 minutes)

1. **Create Supabase account**: Visit [supabase.com](https://supabase.com)
2. **Create new project**: Note your project URL and keys
3. **Database is ready!**: Migrations are already applied via the Supabase dashboard

### 3. Get API Keys (3 minutes)

**Paystack** (for payments):

- Sign up at [paystack.com](https://paystack.com)
- Get test keys from Dashboard → Settings → API Keys
- Copy: `pk_test_...` and `sk_test_...`

**Resend** (for emails):

- Sign up at [resend.com](https://resend.com)
- Get API key from dashboard
- Copy: `re_...`

### 4. Frontend Setup (2 minutes)

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your values
# Minimum required:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
# - NEXT_PUBLIC_API_URL=http://localhost:8000
# - NEXT_PUBLIC_APP_URL=http://localhost:3000

# Start development server
npm run dev
```

Frontend will be running at `http://localhost:3000`

### 5. Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Edit .env with your values
# Minimum required:
# - DATABASE_URL (from Supabase)
# - SUPABASE_URL
# - SUPABASE_KEY (service role key)
# - SECRET_KEY (any random 32+ char string)
# - PAYSTACK_SECRET_KEY
# - RESEND_API_KEY

# Start development server
uvicorn main:app --reload
```

Backend will be running at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

## Testing the Application

### 1. Create Your First Business

1. Visit `http://localhost:3000`
2. Click "Create Your Page"
3. Fill in business information
4. Select holidays
5. Configure hours

### 2. Test Payment (Test Mode)

Use Paystack test card:

- Card: `4084084084084081`
- CVV: `408`
- PIN: `0000`
- Expiry: Any future date

### 3. Check Your Email

- Magic link will be sent to your email
- Click link to access dashboard
- Make edits to test the flow

### 4. View Public Page

Visit: `http://localhost:3000/b/{your-business-id}`

## Common Issues

### Frontend won't start

- Check Node version: `node --version`
- Delete `node_modules` and `.next`, then `npm install` again

### Backend won't start

- Check Python version: `python --version`
- Activate virtual environment
- Install dependencies: `pip install -r requirements.txt`

### Database connection error

- Verify Supabase URL and keys
- Check project is not paused
- Test connection string

### Payment not working

- Verify you're using TEST keys
- Check Paystack dashboard for errors
- Ensure CORS is configured

### Emails not sending

- Verify Resend API key
- Check FROM_EMAIL is set
- Review Resend dashboard logs

## Next Steps

1. **Deploy to Production**: Follow `DEPLOYMENT.md`
2. **Customize**: Modify colors, copy, or features
3. **Add Features**: Check roadmap in README.md
4. **Get Support**: Email support@holidyhours.com

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:

- Frontend: Changes auto-reload in browser
- Backend: Changes auto-restart server (with `--reload`)

### Viewing Database

- Use Supabase dashboard Table Editor
- Or connect with a PostgreSQL client

### Testing API Endpoints

- Visit `http://localhost:8000/docs` for interactive API docs
- Use Postman or curl for testing

### Debugging

- Frontend: Check browser console
- Backend: Check terminal output
- Database: Check Supabase logs

## Environment Variables Quick Reference

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend (.env)

```env
DATABASE_URL=postgresql://postgres:[password]@db.xxx.supabase.co:5432/postgres
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyJ...(service_role)
SECRET_KEY=your-random-32-char-string
PAYSTACK_SECRET_KEY=sk_test_...
PAYSTACK_PUBLIC_KEY=pk_test_...
RESEND_API_KEY=re_...
FROM_EMAIL=noreply@holidyhours.com
APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000
```

---

## Ready to Launch?

Once development is working:

1. Read `DEPLOYMENT.md` for production deployment
2. Switch to live API keys (remove `test`)
3. Deploy frontend to Vercel
4. Deploy backend to Render
5. Configure domain names (optional)

Happy building! 🚀
