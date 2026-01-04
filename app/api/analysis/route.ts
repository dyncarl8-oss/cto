import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.credits <= 0 && user.subscriptionStatus === 'free') {
      return NextResponse.json({ error: 'Insufficient credits' }, { status: 403 });
    }

    const body = await req.json();
    const { symbol, timeframe } = body;

    if (!symbol || !timeframe) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Deduct credit if user is on free plan
    if (user.subscriptionStatus === 'free') {
      await prisma.user.update({
        where: { id: user.id },
        data: { credits: user.credits - 1 },
      });
    }

    // TODO: Implement actual analysis logic
    const analysisResult = {
      symbol,
      timeframe,
      analysis: 'Analysis in progress...',
      technicalSignals: '{}',
      sentiment: 'neutral',
      confidence: 0.5,
      prediction: 'Waiting for data...',
    };

    const analysis = await prisma.analysis.create({
      data: {
        userId: user.id,
        ...analysisResult,
      },
    });

    return NextResponse.json({ success: true, analysis });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        analyses: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ analyses: user.analyses });
  } catch (error) {
    console.error('Get analyses error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
