import './ThreeDText.css';

interface Props {
  name: string;
  content: string;
}

const ThreeDText = (props: Props) => {

  return (
    <div className={props.name}>
      {props.content}
    </div>
  )
}

export default ThreeDText