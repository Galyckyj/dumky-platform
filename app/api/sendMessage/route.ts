import { NextResponse } from 'next/server';

const messageStore = new Set<number>();
const TELEGRAM_BOT_TOKEN = '7642735816:AAHfYmVZBB6pF3Ln_GsjlerfJ2WTwnchGOI';
const CHANNEL_ID = '-1002461193137';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Sending message:', body);

    const sendResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHANNEL_ID,
          text: body.message,
          parse_mode: 'HTML',
          from: {
            is_bot: true,
            username: 'dumky2_bot'
          },
          reply_markup: {
            inline_keyboard: [[
              {
                text: '🤖 Bot Message',
                callback_data: 'bot_signature'
              }
            ]]
          }
        })
      }
    );

    const result = await sendResponse.json();
    console.log('Send result:', result);
    
    if (result.ok) {
      messageStore.add(result.result.message_id);
      // Register webhook for updates
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: `https://localhost:3000/api/webhook`,
            allowed_updates: ["message", "channel_post"]
          })
        }
      );
    }

    return NextResponse.json({ 
      success: true,
      messageId: result.result.message_id,
      sentByBot: true
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}