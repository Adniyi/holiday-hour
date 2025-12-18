# HolidyHours - Beautiful Holiday Hours Pages for Small Businesses

A complete MVP web application that allows small businesses to create beautiful, shareable holiday hours pages in minutes. Built for local retailers, restaurants, and service businesses to communicate special holiday hours and reduce customer confusion.

## Features

- **Fast Setup**: Create a holiday hours page in under 3 minutes
- **4-Step Wizard**: Business info → Holiday selection → Hours configuration → Preview & Payment
- **Shareable Pages**: Copy link, social media sharing, print, and download options
- **Magic Link Authentication**: Password-free editing with secure email links
- **Payment Integration**: One-time $9 seasonal payment via Paystack
- **Analytics Dashboard**: View page views, traffic sources, and trends
- **Mobile-First Design**: Responsive and accessible (WCAG 2.1 AA)
- **SEO Optimized**: Server-side rendering with Next.js 14

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (React, App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)
- **Deployment**: Vercel-ready

### Backend
- **Framework**: Python 3.11 + FastAPI
- **Database**: PostgreSQL (via Supabase)
- **ORM**: SQLAlchemy
- **Authentication**: Magic links with itsdangerous
- **Payments**: Paystack API
- **Email**: Resend
- **Deployment**: Docker-ready for Render/Heroku

## Project Structure

```
/
├── app/                          # Next.js app directory
│   ├── b/[id]/                   # Public business pages
│   ├── create/                   # Wizard form
│   ├── dashboard/[id]/           # Business dashboard
│   ├── payment/                  # Payment success/failure
│   ├── privacy/                  # Privacy policy
│   ├── terms/                    # Terms of service
│   └── layout.tsx                # Root layout
├── components/                   # React components
│   ├── wizard/                   # Wizard step components
│   ├── ui/                       # shadcn/ui components
│   └── share-buttons.tsx         # Share functionality
├── lib/                          # Utility functions
│   ├── api.ts                    # API client
│   ├── constants.ts              # App constants
│   └── utils-holidays.ts         # Holiday utilities
├── backend/                      # FastAPI backend
│   ├── routes/                   # API routes
│   │   ├── businesses.py
│   │   ├── pages.py
│   │   ├── analytics.py
│   │   ├── auth.py
│   │   └── payment.py
│   ├── services/                 # Business logic
│   │   ├── auth.py               # Magic link auth
│   │   ├── email.py              # Email sending
│   │   └── payment.py            # Paystack integration
│   ├── config.py                 # Configuration
│   ├── database.py               # Database connection
│   ├── models.py                 # SQLAlchemy models
│   ├── schemas.py                # Pydantic schemas
│   ├── main.py                   # FastAPI app
│   └── requirements.txt          # Python dependencies
└── supabase/                     # Supabase migrations
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- PostgreSQL database (Supabase recommended)
- Paystack account
- Resend account (or SendGrid)

### Frontend Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your values:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

   Frontend will be available at `http://localhost:3000`

4. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your values:
   ```env
   DATABASE_URL=postgresql://user:password@host:port/dbname
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_service_role_key
   SECRET_KEY=your-secret-key-min-32-chars
   PAYSTACK_SECRET_KEY=sk_test_your_secret_key
   PAYSTACK_PUBLIC_KEY=pk_test_your_public_key
   RESEND_API_KEY=re_your_api_key
   FROM_EMAIL=noreply@holidyhours.com
   APP_URL=http://localhost:3000
   FRONTEND_URL=http://localhost:3000
   ALLOWED_ORIGINS=http://localhost:3000
   ```

5. **Run development server**:
   ```bash
   uvicorn main:app --reload
   ```

   Backend will be available at `http://localhost:8000`
   API docs at `http://localhost:8000/docs`

### Database Setup

The database schema is already created via Supabase migrations. The tables are:

- `businesses`: Store business information
- `pages`: Store holiday hours and page data
- `analytics`: Track page views and traffic sources

All tables have Row Level Security (RLS) enabled with appropriate policies.

### Docker Deployment (Backend)

1. **Build Docker image**:
   ```bash
   cd backend
   docker build -t holidyhours-backend .
   ```

2. **Run container**:
   ```bash
   docker run -p 8000:8000 --env-file .env holidyhours-backend
   ```

## API Endpoints

### Businesses
- `POST /api/businesses` - Create business
- `GET /api/businesses/{id}` - Get business
- `PUT /api/businesses/{id}` - Update business

### Pages
- `POST /api/pages` - Create page
- `GET /api/pages/{id}` - Get page
- `GET /api/pages/business/{business_id}` - Get page by business
- `PUT /api/pages/{id}` - Update page

### Analytics
- `GET /api/analytics/{page_id}` - Get analytics
- `POST /api/analytics/{page_id}/view` - Increment view count

### Authentication
- `POST /api/auth/magic-link` - Request magic link
- `POST /api/auth/verify` - Verify token

### Payment
- `POST /api/payment/initialize` - Initialize payment
- `GET /api/payment/verify/{reference}` - Verify payment
- `POST /api/payment/webhook` - Paystack webhook

## Configuration

### Paystack Setup

1. Create account at [paystack.com](https://paystack.com)
2. Get API keys from Dashboard → Settings → API Keys & Webhooks
3. Set test keys in `.env` for development
4. Configure webhook URL: `{YOUR_API_URL}/api/payment/webhook`

### Resend Setup

1. Create account at [resend.com](https://resend.com)
2. Get API key from Dashboard
3. Verify sending domain
4. Update `FROM_EMAIL` in `.env`

### Supabase Setup

1. Create project at [supabase.com](https://supabase.com)
2. Get URL and keys from Settings → API
3. Database migrations are already applied
4. Use service role key for backend

## User Flow

1. **Landing Page** (`/`) → User clicks "Create Your Page"
2. **Wizard** (`/create`) → Complete 4 steps:
   - Step 1: Business info (name, email, phone, address)
   - Step 2: Select holidays (preset or custom)
   - Step 3: Configure hours (closed, special, or normal)
   - Step 4: Preview and payment ($9 via Paystack)
3. **Payment** → Redirect to Paystack → Complete payment
4. **Success** (`/payment/success`) → View page link + magic link email
5. **Public Page** (`/b/{id}`) → Shareable holiday hours page
6. **Dashboard** (`/dashboard/{id}?token=...`) → Edit via magic link

## Security Features

- Row Level Security (RLS) on all database tables
- Magic link authentication (24-hour expiry)
- Secure payment processing via Paystack
- CORS protection
- Environment variable protection
- No password storage

## Performance Targets

- Page load: < 2s
- Time to first page: < 60s
- Target uptime: 99.5%
- Supports: 10,000+ businesses
- Cost at 100 customers: < $10/month

## Testing

```bash
# Frontend
npm run build  # Should complete without errors
npm run typecheck  # TypeScript validation

# Backend
cd backend
python -m pytest  # Run tests (if added)
```

## Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Add environment variables
3. Deploy automatically on push

### Backend (Render/Heroku)
1. Create new web service
2. Connect repository
3. Add environment variables
4. Deploy with Docker or Python buildpack

## Support & Contact

- Email: support@holidyhours.com
- Documentation: See `/docs` on the API
- Issues: GitHub issues

## License

Proprietary - All rights reserved

## Roadmap

Future enhancements (post-MVP):
- Recurring annual subscriptions
- Custom domains
- Email/SMS notifications to customers
- Advanced analytics
- Multi-location support
- Custom branding/themes
- Integration with POS systems

---

Built with ❤️ for small businesses
