import { ReactNode } from 'react';
import { ButtonHTMLAttributes } from 'react';

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  isOutlined?: boolean;
};

export function Button({isOutlined = false, children, ...props}: ButtonProps) {
  return (
    <button 
      className={`button ${isOutlined ? 'outlined' : ''}`} 
      {...props} 
    >
      {children}
    </button>
  );
}