import ThreeDText from "./components/ThreeDText";
import Flipper from "./components/Flipper";
import Company from "./components/Company";
import ChatBubble from "./components/ChatBubble";

import crmImg from "./assets/crm-1.webp";
import esignImg from "./assets/esign 1.webp"

import twitterImg from "./assets/twitter.png";
import linkedInImg from "./assets/linkedin.png";
import gitHubImg from "./assets/github.png";
import GmailImg from "./assets/gmail.png";
// import resume from "./assets/resume.pdf";

import './App.css';

import { ChangeEvent, MouseEvent, useEffect, useState, } from "react";

import axios, { AxiosError } from 'axios';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import ChatBubbleLoader from "./components/ChatBubbleLoader";


function App() {
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const Sentanario: string = `Hi, I am Sentanario, Abel's assistant. 
  If you have any questions related to Abel's expertise or availability for work
  you can ask me.`

  const about: string = `Leveraging Python's powerful frameworks for backend development and Angular for building engaging frontends. Back in 2017 I read an interesting book called
  Automate the Boring Stuff with Python and went down the mesmerizing rabbit hole of Python based software developement.`

  const aboutWork: string = `At TeamWave I built work management apps used by small businesses around the world. 
  I played a significant role in building three out of five products that we currently offer. 
  My work involves building REST APIs using Django and frontend user interfaces using Angular. `
  const stringList: string[] = ['Developer', 'Problem Solver', 'Designer'];
  // const baseUrl: string = 'http://localhost:8000/';
  const baseUrl: string = 'https://portfolio-dzsa.vercel.app/';
  // const utilUrl: string = 'http://localhost:8000/';
  const utilUrl: string = 'https://fastapi-utility-endpoints.onrender.com/';
  const [items, setItems] = useState([<ChatBubble name="ai" content={Sentanario} />]);
  const [inputValue, setInputValue] = useState('');

  const sendEmail = async (to_email: string = 'abelhevero@gmail.com', subject: string, body: string) => {
    const data = {
      to_email: to_email,
      subject: subject,
      body: body
    };
    try {
      await axios.post(utilUrl.concat('send-email'), data);
      // console.log('Email sent successfully:', response.data);
    } catch (error: unknown) {
      const typedError = error as AxiosError;
      console.error('Error sending email:', typedError.message);
    }
  }

  useEffect(() => {
    sendEmail(
      'abelhevero@gmail.com',
      'Portfolio Visitor Alert',
      'A visitor has arrived at your portfolio. Please check the analytics dashboard for more information.'
    );
  }, []);

  const addItem = (elem: JSX.Element, elem2?: JSX.Element) => {
    if (elem2) {
      setItems([...items, elem, elem2]);
    } else {
      setItems([...items, elem]);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event?.target.value)
  }

  const handleKeyDown = (event: { key: string; preventDefault: () => void; }) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendPostReq = async (url: string, message: string) => {
    const data = {
      message: message,
      refresh: refresh
    };

    setRefresh(false);
    url = baseUrl.concat(url);
    try {
      const response = await axios.post(url, data);
      return response.data.message;
    } catch (error: unknown) {
      const typedError = error as AxiosError;
      return typedError.code;
    }
  }

  const UserChat = async (human: string, ai: string) => {
    const chat = `human: ${human} \n
    ai: ${ai} \n`
    sendEmail(
      'abelhevero@gmail.com',
      'User Chat Alert',
      chat
    )

  }

  const sendMessage = async () => {
    if (!inputValue || inputValue.trim() === '' || loading) {
      console.log("Input is empty, contains only whitespace or Sentanario is busy");
      return;
    }
    const HumanBubble = (<ChatBubble name="user" content={inputValue} />)
    addItem(HumanBubble)
    setLoading(true)
    const resp = await sendPostReq('reply', inputValue);
    const AIBubble = <ChatBubble name="ai" content={resp} />
    addItem(HumanBubble, AIBubble)
    setInputValue('')
    setLoading(false)
    UserChat(inputValue, resp)
  }


  const toggleDiv = (event: MouseEvent<HTMLButtonElement>) => {
    const content = document.getElementsByClassName("content")[0] as HTMLElement;
    const clickedButton = event.currentTarget as HTMLButtonElement;
    const buttonDiv = clickedButton.childNodes[0] as HTMLDivElement;
    const iDiv = clickedButton.childNodes[1] as HTMLDivElement;
    if (content.style.maxHeight) {
      content.style.maxHeight = '';
      buttonDiv.innerHTML = "View More Projects";
      iDiv.className = "arrow2 down";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      buttonDiv.innerHTML = "View Less Projects";
      iDiv.className = "arrow2 up";
    }
  }
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('abelhevero@gmail.com');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false),
        2000); // Reset after 2 seconds
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  }

  return (

    <div className="body-div">
      <SpeedInsights />
      <Analytics />
      <div className="align-center-div ">
        <div className="spacer"></div>
        <a className="align-center-div" href="https://www.linkedin.com/in/abel-thomas-7b93a2212/">
          <img src={linkedInImg} className="icon" alt="LinkedIn Icon" />
        </a>
        <a className="align-center-div" href="https://github.com/Abel-Tom/">
          <img src={gitHubImg} className="icon" alt="GitHub Icon" />
        </a>
        <span className="align-center-div span-hover" onClick={handleCopy}>
          <img src={GmailImg} className="icon" alt="Gmail Icon" />
        </span>
        <a className="align-center-div" href="https://x.com/Abeltom6/">
          <img src={twitterImg} className="icon" alt="Twitter Icon" />
        </a>
        <div className="spacer"></div>
      </div>
      <div className="align-center-div margin-bottom">
        {isCopied ?
          <div className="info">email copied</div> :
          <div className="empty-info"></div>
        }

      </div>
      <div className="align-center-div">
        <ThreeDText name="hit-the-floor" content="ABEL THOMAS" />
      </div>
      <div className="align-center-div">
        <ThreeDText name="prof" content="SOFTWARE DEVELOPER" />
      </div>
      <Flipper strings={stringList} />
      <div className="text-center-div margin-bottom">
        {about}
      </div>
      <div className="align-center-div">
        <ThreeDText name="prof" content="WORK EXPERIENCE" />
      </div>
      <div className="work-exp card">
        <Company name="TeamWave Inc" location="remote" role="Software Developer" start="Oct 2021" end="March 2024" />
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
          <img className="image" src={crmImg} alt="There should be an image here" />
        </div>
        {/* <div className="collapsible-div">
      <a className="resume" href={resume} download={resume}>View Full Resume</a>
    </div> */}
        <div className="collapsible-div">
          <button id="collapsible-button" type="button" className="collapsible" onClick={toggleDiv}><div>View More Projects</div><i className="arrow2 down"></i></button>
        </div>
        <div className="content">
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
            <img className="image" src={esignImg} />
          </div>
        </div>
      </div>

      <div className="align-center-div">
        <ThreeDText name="prof" content="KNOW MORE" />
      </div>
      <div id="chatCard" className="chat card container" >
        <div className="top-div">
          {items.map((item, index) =>
            <div key={index}>{item}</div>)
          }
          {loading ? (
            <ChatBubbleLoader visible={loading} />
          ) : (
            <div>
            </div>
          )}
        </div>
        <div className="align-center-div">
          <input type="text" value={inputValue} placeholder="Type your message"
            onChange={handleInputChange} onKeyDown={handleKeyDown} />
          <button className="send-button" onClick={sendMessage}>
            send
            <svg viewBox="0 0 24 24">
              <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  )
}

export default App
