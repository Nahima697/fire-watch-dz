import { NextResponse } from 'next/server';
import { FireAnalysisResult } from '@/lib/types';

export async function POST(request: Request) {
  let body: any;
  
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Body JSON invalide' }, { status: 400 });
  }

  if (!body.image || typeof body.image !== 'string' || body.image.trim() === '') {
    return NextResponse.json({ error: 'Image manquante' }, { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    return NextResponse.json({ error: 'Clé API manquante' }, { status: 500 });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-001',
        messages: [{
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyse cette image et détermine s\'il y a un feu. Réponds UNIQUEMENT avec un JSON valide (sans markdown, sans backticks) au format exact : {"is_fire":boolean,"confidence":number,"detected_elements":string[],"summary":string}'
            },
            {
              type: 'image_url',
              image_url: {
                url: body.image
              }
            }
          ]
        }]
      })
    });

    if (!response.ok) {
      const fallbackResult: FireAnalysisResult = {
        is_fire: false,
        confidence: 0,
        detected_elements: [],
        summary: 'Analyse indisponible'
      };
      return NextResponse.json(fallbackResult, { status: 200 });
    }

    const responseData = await response.json();

    if (!responseData.choices || !Array.isArray(responseData.choices) || responseData.choices.length === 0) {
      const fallbackResult: FireAnalysisResult = {
        is_fire: false,
        confidence: 0,
        detected_elements: [],
        summary: 'Analyse indisponible'
      };
      return NextResponse.json(fallbackResult, { status: 200 });
    }

    const content = responseData.choices[0].message.content;

    try {
      const result = JSON.parse(content) as FireAnalysisResult;
      return NextResponse.json(result, { status: 200 });
    } catch {
      const fallbackResult: FireAnalysisResult = {
        is_fire: false,
        confidence: 0,
        detected_elements: [],
        summary: 'Analyse indisponible'
      };
      return NextResponse.json(fallbackResult, { status: 200 });
    }
  } catch {
    const fallbackResult: FireAnalysisResult = {
      is_fire: false,
      confidence: 0,
      detected_elements: [],
      summary: 'Analyse indisponible'
    };
    return NextResponse.json(fallbackResult, { status: 200 });
  }
}
