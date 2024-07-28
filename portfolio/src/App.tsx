import ThreeDText from "./components/ThreeDText";
import ChatBubble from "./components/ChatBubble";
import Flipper from "./components/Flipper";
import Company from "./components/Company";
import ChatBubbleLoader from "./components/ChatBubbleLoader";

import './App.css';
import  { useState, ChangeEvent  } from 'react';

import axios from 'axios';

function App() {
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const Sentanario: string = `Hi, I am Sentanario, Abel's assistant. 
    If you have any questions related to Abel's expertise or availability for work
    you can ask me.`
    const about: string = `I discovered the world of coding through game development. 
  Unity game engine helped me get started.It didn't matter to me whether I did game development or web programming 
  I just wanted to do coding full time.`

  const aboutWork: string = `At TeamWave I built work management apps used by small businesses around the world. 
  I played a significant role in building three out of five products that we currently offer. 
  My work involves building REST APIs using Django or Flask and frontend user interfaces using AngularJS. `
  const stringList: string[] = ['Developer', 'Problem Solver', 'Designer'];
  const baseUrl: string = 'http://localhost:8000/';
  const [items, setItems] = useState([<ChatBubble name="ai" content={Sentanario}/>]);

  
  const [inputValue, setInputValue] = useState('');

  const addItem = (elem: JSX.Element, elem2?: JSX.Element) => {
    if (elem2){
      setItems([...items, elem, elem2]); 
    }else{
      setItems([...items, elem]); 
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>)=>{
    setInputValue(event?.target.value)
  }

  const toggleDiv = (event)=>{
    const content = document.getElementsByClassName("content")[0] as HTMLElement;    
    if (content.style.maxHeight) {
      content.style.maxHeight = '';
      event.target.firstChild.textContent = "View More Projects";
      event.target.nextSibling.className = "arrow2 down"
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      event.target.firstChild.textContent = "View Less Projects";
      event.target.nextSibling.className = "arrow2 up"
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendPostReq = async (url: string, message: string) =>{
    const route_url: string = 'reply';
    const data = {
      message: message,
      refresh: refresh
    };
    setRefresh(false);
    url = baseUrl.concat(route_url);
    try{
      const response = await axios.post(url, data);
      return response.data.message;
    }catch(error: unknown) {
      return error.code;
    }
  }

  const sendMessage = async () => {
    if (!inputValue || inputValue.trim() === '' || loading) {
      console.log("Input is empty, contains only whitespace or Sentanario is busy");
      return;
    }
    const HumanBubble = (<ChatBubble name="user" content={inputValue}/>)
    addItem(HumanBubble)
    setLoading(true)
    const resp = await sendPostReq('', inputValue);
    const AIBubble = <ChatBubble name="ai" content={resp}/>
    addItem(HumanBubble, AIBubble)
    setInputValue('')
    setLoading(false)
  }
  
  return (
    <div className="body-div">
      <div className="align-center-div">
        <ThreeDText name="hit-the-floor" content="ABEL THOMAS"/>
      </div>
      <div className="align-center-div">
        <ThreeDText name="prof" content="SOFTWARE DEVELOPER"/>
      </div>
      <Flipper strings={stringList} />
      <div className="text-center-div margin-bottom">
        {about}
      </div>
      <div className="align-center-div">
        <ThreeDText name="prof" content="WORK EXPERIENCE"/>
      </div>
      <div className="work-exp card">
        <Company name="TeamWave Inc" location="remote" role="Full Stack Developer" start="Oct 2021" end="Present"/>
        <div className="text-center-div">
          {aboutWork}
        </div>
        <div className="exp-card">
      <div className="exp-text">
        <h3 className="exp-head">TeamWave CRM</h3>
        <div className="exp-line">
          Proficiently utilised Angular 17 for standalone component development.
        </div>
        <div className="exp-line">
          Implemented NgRx for effective state management within the application.
        </div>
        <div className="exp-line">
          Leveraged Nx mono repo for modular code organisation and management.
        </div>
      </div>
      <img  src="img/crm-1.webp"/>
    </div>
    <div className="collapsible-div">
      <a className="resume" href="resume.pdf" download="resume.pdf">View Full Resume</a>
    </div>
    <div className="collapsible-div">
      <button type="button" className="collapsible" onClick={toggleDiv}><div>View More Projects</div><i className="arrow2 down"></i></button>
    </div>
    <div className="content">
      <div className="exp-card">
        <div className="exp-text">
          <h3 className="exp-head">TeamWave User Console</h3>
          <div className="exp-line">
            User Console allows the super admin to manage user permissions across all TeamWave web apps.
          </div>
          <div className="exp-line">
            Using Django Rest Framework created REST APIs with permission handling and authentication to serve data to the frontend.
          </div>
          <div className="exp-line">
            Effectively utilised Django Middleware to track user activity.
          </div>
        </div>
        <img  src="img/user-management-1.webp"/>
      </div>
      <div className="exp-card">
        <div className="exp-text">
          <h3 className="exp-head">TeamWave Esignature</h3>
          <div className="exp-line">
            E‑Signature app lets the user electronically sign documents
          </div>
          <div className="exp-line">
            Incorporated PyPDF2 library to add signature to the pdf file.
          </div>
          <div className="exp-line">
            Employed Celery to create asynchronous tasks to send notifications, files and reminders.
          </div>
        </div>
        <img  src="img/esign 1.webp"/>
      </div>
    </div>
      </div>
       
      <div className="align-center-div">
        <ThreeDText name="prof" content="KNOW MORE"/>
      </div>
      <div id="chatCard" className="chat card container" >
        <div className="top-div">
          {items.map((item,index) => 
            <div key={index}>{item}</div>)
          }
          {loading ? (
              <ChatBubbleLoader visible={loading}/>
            ) : (
              <div>
              </div>
            )}
        </div>
        <div className="align-center-div">
          <input type="text" value={inputValue} placeholder="Type your message"
          onChange={handleInputChange} onKeyDown={handleKeyDown}/>
          <button className="send-button" onClick={sendMessage}>
            send
            <svg viewBox="0 0 24 24">
                <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"/>
            </svg>
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default App

