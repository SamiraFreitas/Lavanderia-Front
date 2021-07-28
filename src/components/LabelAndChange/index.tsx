import { ReactNode } from 'react';
import { InputHTMLAttributes, SelectHTMLAttributes } from 'react';
import './styles.scss';

type LabelInputProps = 
  InputHTMLAttributes<HTMLInputElement> &
  SelectHTMLAttributes<HTMLSelectElement> &
{
  name: string;
  input?: boolean;
  select?: boolean;
  span?: boolean;
  children?: ReactNode;
}

export function LabelAndChange({
  name, 
  input = false, 
  select = false, 
  span = false,
  children,
  ...props
}: LabelInputProps) {

  return(
    <div id="LabelAndChange" >
      {input ? (
        <div>
          <label>{name}</label>
          <input {...props} />
        </div>
      ) : false}
      {select ? (
        <div>
          <label>{name}</label>
          <select {...props} >
            {children}
          </select>
        </div>
      ) : false}
      {span ? (
        <div>
          <label>{name}</label>
          <span {...props} >
            {children}
          </span>
        </div>
      ) : false}
    </div>
  );
}