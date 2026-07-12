import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import './ChatInput.css'
import dayjs from 'dayjs';

console.log(dayjs(dayjs().valueOf()).format('h:mma'));


export function ChatInput({ chatMessages, setChatMessages, isLoading, setIsLoading }) {
    const [inputText, setInputText] = useState('');

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    async function sendMessage() {
        if (inputText.trim() === '' || isLoading) {
            return;
        }

        const messageText = inputText;

        const newChatMessages = [
            ...chatMessages,
            {
                message: messageText,
                sender: 'user',
                id: crypto.randomUUID(),
                createdAt: dayjs().valueOf(),
            }
        ];

        setChatMessages(newChatMessages);
        setInputText('');
        setIsLoading(true);

        try {
            const response =
                await Chatbot.getResponseAsync(messageText);

            setChatMessages([
                ...newChatMessages,
                {
                    message: response,
                    sender: 'robot',
                    id: crypto.randomUUID(),
                    createdAt: dayjs().valueOf(),

                }
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }

        if (event.key === 'Escape') {
            setInputText('');
        }
    }

    const handleClearButton = () => {
        let confirmMessage = confirm("Are you sure, this process cannot be reverse?");
        if (confirmMessage)
            setChatMessages([]);
    }

    return (
        <div className="chat-input-container">
            <input
                className="chat-input"
                placeholder="Send a message to Chatbot"
                onChange={saveInputText}
                onKeyDown={handleKeyDown}
                value={inputText}
            />

            <button
                className="send-button"
                onClick={sendMessage}
                disabled={isLoading || inputText.trim() === ''}
            >
                {isLoading ? 'Sending...' : 'Send'}
            </button>
            <button
                className="clear-button"
                onClick={handleClearButton}
            >
                Clear
            </button>
        </div>
    );
}