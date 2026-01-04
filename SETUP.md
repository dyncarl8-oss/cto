# AI Trading Assistant - Setup Guide

This document provides detailed setup instructions for the AI Trading Assistant project.

## Prerequisites

Before you begin, ensure you have the following:

1. **Node.js 18+** and npm installed
2. **API Keys**:
   - Google OAuth credentials (Client ID & Secret)
   - CryptoCompare API key (free tier available)
   - Google Gemini Pro API key (from Google AI Studio)
   - Polar.sh account credentials (for monetization)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 16 (React framework)
- Prisma (Database ORM)
- NextAuth (Authentication)
- Recharts (Data visualization)
- Lucide React (Icons)
- WebSocket support (ws)
- And more...

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your credentials:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# CryptoCompare API
CRYPTOCOMPARE_API_KEY="your-cryptocompare-api-key"

# Google Gemini Pro API
GOOGLE_GEMINI_API_KEY="your-gemini-api-key"

# Polar.sh
POLAR_ACCESS_TOKEN="your-polar-access-token"
POLAR_WEBHOOK_SECRET="your-polar-webhook-secret"
POLAR_ORGANIZATION_ID="your-polar-organization-id"
```

#### Getting API Keys

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

**CryptoCompare:**
1. Sign up at [CryptoCompare](https://www.cryptocompare.com/)
2. Navigate to API section
3. Generate a free API key

**Google Gemini Pro:**
1. Visit [Google AI Studio](https://makersuite.google.com/)
2. Get your API key from the dashboard

**Polar.sh:**
1. Sign up at [Polar.sh](https://polar.sh/)
2. Create an organization
3. Get your access token and webhook secret from settings

**NextAuth Secret:**
Generate a random secret:
```bash
openssl rand -base64 32
```

### 3. Initialize Database

Generate the Prisma client:

```bash
npm run db:generate
```

Push the schema to create the database:

```bash
npm run db:push
```

Seed the database with trading pairs:

```bash
npm run db:seed
```

This will create the following trading pairs:
- BTC (Bitcoin)
- ETH (Ethereum)
- SOL (Solana)
- ADA (Cardano)
- DOT (Polkadot)
- MATIC (Polygon)
- AVAX (Avalanche)
- LINK (Chainlink)

### 4. Verify Setup

Run the verification script:

```bash
bash scripts/verify-setup.sh
```

This will check:
- Dependencies installation
- Environment configuration
- Prisma client generation
- Database creation
- Directory structure

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Create and run migrations
npm run db:migrate

# Open Prisma Studio (GUI)
npm run db:studio

# Seed database with initial data
npm run db:seed
```

## Project Structure

```
ai-trading-assistant/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth authentication
│   │   ├── analysis/     # Trading analysis endpoints
│   │   ├── credits/      # User credits management
│   │   └── subscription/ # Subscription handling
│   ├── components/       # React components
│   │   ├── Terminal/     # Terminal-style interface
│   │   ├── Chat/         # Chat interface
│   │   ├── Sidebar/      # Navigation sidebar
│   │   └── PredictionCard/ # Prediction display
│   ├── lib/              # Utility libraries
│   │   ├── technicalAnalysis/ # Technical analysis logic
│   │   ├── indicators/   # Trading indicators (RSI, SMA, EMA)
│   │   ├── signalAggregator/ # Signal aggregation
│   │   └── websocket/    # WebSocket client
│   └── types/            # TypeScript type definitions
├── lib/
│   ├── prisma.ts        # Prisma client instance
│   └── auth.ts          # NextAuth configuration
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Database seeding script
├── scripts/
│   └── verify-setup.sh  # Setup verification script
├── middleware.ts        # Next.js middleware for auth
└── package.json         # Dependencies and scripts
```

## Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Wouter** - Lightweight routing
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Tailwind CSS** - Styling

### Backend
- **Prisma** - Type-safe ORM
- **SQLite** - Database (development)
- **NextAuth** - Authentication
- **Google OAuth** - Social login

### APIs & Services
- **CryptoCompare** - Market data
- **Google Gemini Pro** - AI analysis
- **Polar.sh** - Subscription management
- **WebSocket (ws)** - Real-time updates

## Troubleshooting

### Database Issues

If you encounter database errors:

```bash
# Reset the database
rm prisma/dev.db
npm run db:push
npm run db:seed
```

### TypeScript Errors

Run type checking:

```bash
npx tsc --noEmit
```

### Dependency Conflicts

Clear cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Environment Variable Issues

Ensure all required environment variables are set in `.env.local`. The application will fail to start if critical variables are missing.

## Next Steps

After setup is complete:

1. **Configure Authentication**: Test Google OAuth login
2. **Test API Endpoints**: Use tools like Postman or curl
3. **Implement Components**: Start building the UI components
4. **Add Trading Logic**: Implement the technical analysis algorithms
5. **Integrate AI**: Connect Google Gemini Pro for analysis
6. **Setup Monetization**: Configure Polar.sh webhooks

## Production Deployment

For production deployment:

1. **Upgrade Database**: Switch from SQLite to PostgreSQL
   - Update `DATABASE_URL` in environment
   - Change provider in `prisma/schema.prisma` to `postgresql`

2. **Secure Environment Variables**: Use platform-specific secrets management

3. **Configure Domain**: Update `NEXTAUTH_URL` to your production domain

4. **Enable HTTPS**: Ensure all API calls use HTTPS

5. **Deploy**: Deploy to Vercel, Netlify, or any Node.js hosting platform

## Support

For issues or questions:
- Check the [README.md](./README.md) for general information
- Review component-specific READMEs in `app/components/`
- Open an issue on GitHub

## License

MIT
