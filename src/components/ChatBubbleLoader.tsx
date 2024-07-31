import './ChatBubble.css';
import './ChatBubbleLoader.css';

interface Props {
  visible: boolean
}


const ChatBubbleLoader = (props: Props) => {
    return (
        <div>
          <div className={"align-right"}>
            <div className={"right chat-bubble shifter"}>
                {props.visible ? (
                    <div className='loader'></div>
                ) : (
                    <div>
                    </div>
                )}
            </div>
          </div>
          <div className={"align-right"}>
            <div className='ai'>
              {"Sentanario"}
              </div>
          </div>
        </div>
      )
}

export default ChatBubbleLoader

