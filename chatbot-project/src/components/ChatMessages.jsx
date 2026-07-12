import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import './ChatMessages.css'

function ChatMessages({ chatMessages, isLoading }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElement = chatMessagesRef.current;

    if (containerElement) {
      containerElement.scrollTop =
        containerElement.scrollHeight;
    }
  }, [chatMessages, isLoading]);

  return (
    <div
      ref={chatMessagesRef}
      className="chat-messages-container"
    >
      {chatMessages.map((chatMessage) => (
        <ChatMessage
          message={chatMessage.message}
          sender={chatMessage.sender}
          key={chatMessage.id}
          createdAt={chatMessage.createdAt}
        />
      ))}

      {isLoading && (
        <ChatMessage
          message="Loading..."
          sender="robot"
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default ChatMessages;