import './Flipper.css';

interface FlipperProps {
    strings: string[];
  }
  
  const Flipper: React.FC<FlipperProps> = ({ strings }) => {
    return (
        <div id="container">
            <div id="flip">
            {strings.map((item, index) => (
                <div key={index}><div key={index}>{item}</div></div>
              ))}
            </div>
        </div>
      );
  };
  
  export default Flipper;
  


