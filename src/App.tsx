import ThreeDText from "./components/ThreeDText";
import Flipper from "./components/Flipper";
import Company from "./components/Company";

import './App.css';



function App() {

    const about: string = `I discovered the world of coding through game development. 
  Unity game engine helped me get started.It didn't matter to me whether I did game development or web programming 
  I just wanted to do coding full time.`

  const aboutWork: string = `At TeamWave I built work management apps used by small businesses around the world. 
  I played a significant role in building three out of five products that we currently offer. 
  My work involves building REST APIs using Django or Flask and frontend user interfaces using AngularJS. `
  const stringList: string[] = ['Developer', 'Problem Solver', 'Designer'];

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
    </div>
  )
}

export default App

