import { InputHTMLAttributes } from 'react';
import './styles.scss';

type ToggleProps = InputHTMLAttributes<HTMLInputElement> & {
  title: string;
}

export function Toggle({title, ...props}: ToggleProps) {
  return(
    <div id="toggle" >
      <label className="title">{title}</label>
      <label className="switch">
        <input type="checkbox" {...props}/>
        <span className="slider round"/>
      </label>
    </div>
  );
}