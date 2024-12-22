import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function Feedback() {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const lastSubmitTime = useRef(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Prevent rapid submissions
        const now = Date.now();
        if (now - lastSubmitTime.current < 1000 || !message.trim() || isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        lastSubmitTime.current = now;

        try {
            const response = await fetch('/api/sendMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }
    
            setStatus('Повідомлення успішно відправлено!');
            setMessage('');
        } catch (error) {
            console.error('Error:', error);
            setStatus('Помилка при відправці повідомлення');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid w-full gap-2">
            <h3 className="text-base font-medium p-2">Відправ повідомлення:</h3>
            <Textarea 
                placeholder="Напиши текст сюди." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSubmitting}
            />
            <Button 
                type="submit"
                disabled={!message.trim() || isSubmitting}
                className={!message.trim() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
            >
                {isSubmitting ? 'Відправляється...' : 'Відправити'}
            </Button>
            {status && (
                <p className={`text-sm ${status.includes('успішно') ? 'text-green-500' : 'text-red-500'}`}>
                    {status}
                </p>
            )}
        </form>
    );
}