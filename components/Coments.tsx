import { useEffect, useState } from 'react';
import { Message } from '@/types/message';

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/getMessage');
        console.log('Fetch response:', response);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        
        if (data.messages) {
          setMessages(data.messages);
        } else {
          throw new Error('No messages in response');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading messages...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="p-4 bg-gray-100 rounded-lg my-5">
          <p>{message.text}</p>
          <small>{new Date(message.date * 1000).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}