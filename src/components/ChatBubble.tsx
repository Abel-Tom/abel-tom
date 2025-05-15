import { useEffect, useState } from 'react';
import './ChatBubble.css';

interface Props {
  name: string;
  content: string;
  sessionId?: string;
}

const ChatBubble = (props: Props) => {
  const [content, setContent] = useState<string>('');
    const className: string = props.name == "user"? "align-left": "align-right";
    const senter: string = props.name == "user"? "You": "Sentanario";
    const side: string = props.name == "user"? "left": "right";
    const chatBubble: string = side.concat(" ", "chat-bubble");
    // const sentanarioUrl: string = 'http://localhost:8000/';
    const sentanarioUrl: string = 'https://portfolio-dzsa.vercel.app/';

    useEffect(() => {
      const streamData = async (name: string, message: string, url: string) => {
        if (name !== 'ai') {
          setContent(message);
          return;
        }
        try {
          const response = await fetch(url, { // Fixed the string concatenation
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              "message": message,
              "sessionId": props.sessionId    
            })
          });
  
          if (!response.body) {
            throw new Error('No response body');
          }
  
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
  
          let done = false;
          while (!done) {
            const { value, done: readerDone } = await reader.read();
            if (value) {
              const chunk = decoder.decode(value, { stream: true });
                setContent(prevContent => prevContent + chunk);
            }
            done = readerDone;
          }
        } catch (error) {
          console.error('Streaming error:', error);
        }
      };
  
      streamData(props.name, props.content, sentanarioUrl.concat('reply')); // Use the correct URL here.
    }, []); // Trigger once on mount

  return (
    <div>
      <div className={className}>
          <div className={chatBubble}>
            {content}
          </div>
      </div>
      <div className={className}>
        <div className='ai'>
          {senter}
          </div>
      </div>
    </div>
  )
}

export default ChatBubble

