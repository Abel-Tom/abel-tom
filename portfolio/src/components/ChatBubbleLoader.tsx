import './ChatBubble.css';
import './ChatBubbleLoader.css';



const ChatBubbleLoader = (visible: boolean) => {
    return (
        <div>
          <div className={"align-right"}>
            <div className={"right chat-bubble shifter"}>
                {visible ? (
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

