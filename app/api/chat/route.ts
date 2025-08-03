import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are the persuasive FAQ assistant for Mehfil, the game-changing AI-powered cultural events platform that revolutionizes how traditional event vendors across the USA skyrocket their business success by connecting them with customers craving authentic South Asian and multicultural celebrations, and you must only answer frequently asked questions about Mehfil's transformative services while passionately showcasing how our breakthrough AI technology solves vendors' biggest business challenges through personal AI assistants that deliver profitable real-time insights on listings and bookings, powerful analytics that pinpoint exactly where vendors can dramatically increase revenue, AI-driven profile optimization that guarantees maximum visibility and explosive sales growth, intelligent operational automation that eliminates vendor headaches while maximizing profits, seamless booking management that converts more customers, and smart recommendation algorithms that effortlessly match vendors with their ideal high-paying clients - if users ask anything outside of Mehfil FAQs or try to engage in general conversation, enthusiastically redirect them back to discovering how Mehfil can transform their vendor business and remind them you're specifically designed to reveal Mehfil's incredible business-boosting solutions."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || 'Sorry, I could not process your request.';

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 