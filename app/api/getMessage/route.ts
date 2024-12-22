import { NextResponse } from 'next/server';
import crypto from 'crypto';

const TELEGRAM_BOT_TOKEN = '7642735816:AAHfYmVZBB6pF3Ln_GsjlerfJ2WTwnchGOI';
const CHANNEL_ID = '-1002461193137'; // Використовуємо числовий ID каналу
const BOT_USERNAME = 'dumky2_bot';

function generateUniqueId(messageId: number, text: string): string {
  const hash = crypto.createHash('md5').update(`${messageId}_${text}`).digest('hex');
  return hash;
}

// Інтерфейси для Telegram API
interface TelegramChat {
    id: number;
    title?: string;
    username?: string;
    type: string;
  }
  
  interface TelegramMessage {
    message_id: number;
    text?: string;
    date: number;
    chat: TelegramChat;
    from?: {
      id: number;
      username?: string;
      is_bot?: boolean;
    };
    sender_chat?: {
      id: number;
      title: string;
      username?: string;
      type: string;
    };
  }
  
  interface TelegramUpdate {
    update_id: number;
    channel_post?: TelegramMessage;
    message?: TelegramMessage;
    edited_message?: TelegramMessage;
  }
  
  // Інтерфейс для відповіді API
  interface MessageResponse {
    id: string;         // Унікальний ідентифікатор повідомлення
    text: string;       // Текст повідомлення
    date: number;       // Дата відправки в Unix timestamp
    sender: string;     // Відправник (Bot, username або ID каналу)
  }
  
  // ...existing code...

  interface TelegramUpdate {
    channel_post?: TelegramMessage;
    message?: TelegramMessage;
    edited_message?: TelegramMessage;
    bot_message?: TelegramMessage;  // Додаємо тип для бот-повідомлень
  }

  interface TelegramMessage {
    message_id: number;
    text?: string;
    date: number;
    chat: {
      id: number;
      title?: string;
      username?: string;
      type: string;
    };
    from?: {
      id: number;
      username?: string;
      is_bot?: boolean;
    };
    sender_chat?: {
      id: number;
      title: string;
      username?: string;
      type: string;
    };
  }
  
  interface TelegramMessage {
    message_id: number;
    text?: string;
    date: number;
    chat: {
      id: number;
      title?: string;
      username?: string;
      type: string;
    };
    from?: {
      id: number;
      username?: string;
      is_bot?: boolean;
    };
    sender_chat?: {
      id: number;
      title: string;
      username?: string;
      type: string;
    };
  }
  
  interface TelegramMessage {
    message_id: number;
    text?: string;
    date: number;
    chat: {
      id: number;
      title?: string;
      username?: string;
      type: string;
    };
    from?: {
      id: number;
      username?: string;
      is_bot?: boolean;
    };
    sender_chat?: {
      id: number;
      title: string;
      username?: string;
      type: string;
    };
  }
  
  // Add storage for message IDs
  const messageStore = new Set<number>();

  export async function GET() {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates?offset=-100&limit=100`
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Updates response:', data);
  
      if (!data.ok || !Array.isArray(data.result)) {
        throw new Error('Invalid response format');
      }
  
    const messages: MessageResponse[] = data.result
      .filter((update: TelegramUpdate) => {
        const message: TelegramMessage | undefined = update.channel_post || update.message;
        console.log('Processing message:', {
        id: message?.message_id,
        chat: message?.chat,
        from: message?.from,
        text: message?.text
        });
        return message?.chat?.id.toString() === CHANNEL_ID;
      })
      .map((update: TelegramUpdate): MessageResponse => {
        const message: TelegramMessage | undefined = update.channel_post || update.message;
        const isBot: boolean = message?.from?.is_bot || 
                      message?.text?.includes('via @dumky2_bot') || false;
        
        if (isBot && message) {
        messageStore.add(message.message_id);
        }
  
        return {
        id: generateUniqueId(message?.message_id || 0, message?.text || ''),
        text: message?.text || '',
        date: message?.date || 0,
        sender: isBot ? 'Bot' : 
              message?.from?.username || 
              message?.sender_chat?.title || 
              'Unknown'
        };
      })
      .sort((a: MessageResponse, b: MessageResponse) => b.date - a.date);
  
      return NextResponse.json({ messages });
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }
  }