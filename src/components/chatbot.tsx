import { useState } from 'react';

interface Message {
  text: string;
  isUser: boolean;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setTimeout(() => {
        setMessages(prev => [...prev, { text: '¡Gracias por contactarnos! Te responderemos pronto por email o WhatsApp.', isUser: false }]);
      }, 1000);
      setInput('');
    }
  };

  return (
    <div className="chatbot">
      <div className="chat-header">
        <h3>Soporte LutristaBox</h3>
      </div>
      <div className="chat-messages">
        <div className="message bot">¡Hola! ¿En qué podemos ayudarte hoy?</div>
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Escribe tu mensaje..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
}
