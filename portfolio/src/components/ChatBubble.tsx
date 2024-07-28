import './ChatBubble.css';

interface Props {
  name: string;
  content: string;
}

const ChatBubble = (props: Props) => {
    const className: string = props.name == "user"? "align-left": "align-right";
    const senter: string = props.name == "user"? "You": "Sentanario";
    const side: string = props.name == "user"? "left": "right";
    const chatBubble: string = side.concat(" ", "chat-bubble");

  return (
    <div>
      <div className={className}>
          <div className={chatBubble}>
            {props.content}
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

