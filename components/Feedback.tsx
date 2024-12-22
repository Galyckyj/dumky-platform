import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react';

export function TextareaWithButton() {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<string | null>(null);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);
        
        if (!message.trim()) return;
    
        try {
            const response = await fetch('/api/sendMessage', {
                method: 'POST',
                
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message.trim() }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
    
            setStatus('Повідомлення успішно відправлено!');
            setMessage('');
        } catch (error) {
            console.error('Error:', error);
            setStatus('Помилка при відправці повідомлення');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid w-full gap-2">
            <h3 className="text-base font-medium p-2">Відправ повідомлення:</h3>
            <Textarea 
                placeholder="Напиши текст сюди." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit">Відправити</Button>
            {status && (
                <p className={`text-sm ${status.includes('успішно') ? 'text-green-500' : 'text-red-500'}`}>
                    {status}
                </p>
            )}
        </form>
    )
}