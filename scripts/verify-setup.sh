#!/bin/bash

echo "🔍 Verifying AI Trading Assistant Setup..."
echo ""

# Check if node_modules exists
if [ -d "node_modules" ]; then
  echo "✅ Dependencies installed"
else
  echo "❌ Dependencies not installed. Run: npm install"
  exit 1
fi

# Check if .env.local exists
if [ -f ".env.local" ]; then
  echo "✅ Environment file exists"
else
  echo "⚠️  .env.local not found. Copy from .env.example and configure"
fi

# Check if Prisma client is generated
if [ -d "node_modules/@prisma/client" ]; then
  echo "✅ Prisma client generated"
else
  echo "❌ Prisma client not generated. Run: npm run db:generate"
  exit 1
fi

# Check if database exists
if [ -f "prisma/dev.db" ]; then
  echo "✅ Database created"
else
  echo "⚠️  Database not found. Run: npm run db:push"
fi

# Check directory structure
echo ""
echo "📁 Checking directory structure..."

DIRS=(
  "app/api/auth"
  "app/api/analysis"
  "app/api/credits"
  "app/api/subscription"
  "app/components/Terminal"
  "app/components/Chat"
  "app/components/Sidebar"
  "app/components/PredictionCard"
  "app/lib/technicalAnalysis"
  "app/lib/indicators"
  "app/lib/signalAggregator"
  "app/lib/websocket"
  "app/types"
  "lib"
  "prisma"
)

for dir in "${DIRS[@]}"; do
  if [ -d "$dir" ]; then
    echo "  ✅ $dir"
  else
    echo "  ❌ $dir missing"
  fi
done

echo ""
echo "✨ Setup verification complete!"
echo ""
echo "Next steps:"
echo "1. Configure .env.local with your API keys"
echo "2. Run: npm run db:push (if not done)"
echo "3. Run: npm run db:seed (to add trading pairs)"
echo "4. Run: npm run dev (to start the server)"
