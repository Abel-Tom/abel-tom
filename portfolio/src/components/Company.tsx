import './Company.css';
import CompanyProps from './interfaces';

const Company = (props: CompanyProps) => {

  return (
    <div className="company">
      <div className="company-div">
        <div style={{fontSize: '20px', fontWeight: 'bold' }}>{props.name}</div>
        <div style={{fontSize: '13px', fontWeight: 'bold' }}>{props.location}</div>
      </div>
      <div className="role-div">
        <div style={{fontSize: '18px' }}><strong>{props.role}</strong></div>
        <div style={{fontSize: '13px', fontWeight: 'bold' }}>{props.start} - {props.end}</div>
      </div>
    </div>
  )
}

export default Company