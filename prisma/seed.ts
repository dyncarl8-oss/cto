import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tradingPairs = [
    { symbol: 'BTC', name: 'Bitcoin', description: 'The first and most well-known cryptocurrency' },
    { symbol: 'ETH', name: 'Ethereum', description: 'Smart contract platform and cryptocurrency' },
    { symbol: 'SOL', name: 'Solana', description: 'High-performance blockchain platform' },
    { symbol: 'ADA', name: 'Cardano', description: 'Proof-of-stake blockchain platform' },
    { symbol: 'DOT', name: 'Polkadot', description: 'Multi-chain blockchain protocol' },
    { symbol: 'MATIC', name: 'Polygon', description: 'Ethereum scaling solution' },
    { symbol: 'AVAX', name: 'Avalanche', description: 'Fast, low-cost blockchain platform' },
    { symbol: 'LINK', name: 'Chainlink', description: 'Decentralized oracle network' },
  ];

  console.log('Seeding trading pairs...');
  
  for (const pair of tradingPairs) {
    await prisma.analysisTemplate.upsert({
      where: { symbol: pair.symbol },
      update: {},
      create: pair,
    });
    console.log(`✓ Created/updated trading pair: ${pair.symbol} (${pair.name})`);
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
