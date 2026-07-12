import { useEffect, useState } from 'react'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages';
import './App.css'
import { Chatbot } from 'supersimpledev';


function App() {
  const previousMessages = JSON.parse(localStorage.getItem('messages')) || null;
  const [chatMessages, setChatMessages] = useState(
    previousMessages
      ? previousMessages
      : [
        {
          message: 'hello chatbot',
          sender: 'user',
          id: 'id1',
          createdAt: 1783855075421,
        },
        {
          message: 'Hello! How can I help you?',
          sender: 'robot',
          id: 'id2',
          createdAt: 1783855076421,
        },
        {
          message: 'can you get me todays date?',
          sender: 'user',
          id: 'id3',
          createdAt: 1783855077121,
        },
        {
          message: 'Today is September 27',
          sender: 'robot',
          id: 'id4',
          createdAt: 1783855077021,
        }
      ]);

  useEffect(() => {
    //console.log("chatMessages has been changed", chatMessages);
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // console.log("runs once");
    Chatbot.addResponses({
      'whatup': 'everything is good man, what up?',
      'are you crazy': 'yeahh I\'m who the fuck are u?'
    })
  }, []);

  return (
    <div className="app-container">
      <ChatMessages
        chatMessages={chatMessages}
        isLoading={isLoading}
      />

      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

export default App
