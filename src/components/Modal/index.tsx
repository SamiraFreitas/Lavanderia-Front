import { ReactNode } from 'react';
import { Button } from '../Button';
import './styles.scss';

type ModalProps = {
  title?: string;
  alert?: boolean;
  confirm?: boolean;
  handleToConfirm?: () => {},
  custom?: boolean,
  children?: ReactNode;
}

export function Modal({
  title,
  alert = false,
  confirm = false,
  handleToConfirm,
  custom = false,
  children
}: ModalProps) {
  return(
    <div id="Modal" >
      <div className="header">
        <h1>{title}</h1>
        <div className="separator" ></div>
      </div>
      
      <div className="body">
        {alert ? (
          <div className="alert">
            <div>
              <label>{children}</label>
            </div>
            <Button>Fechar</Button>
          </div>
        ) : false}
        {confirm ? (
          <div className="confirm">
            <div className="text">
              <label>{children}</label>
            </div>
            <div className="buttons">
              <Button onClick={handleToConfirm} >Confirmar</Button>
              <Button isOutlined >Cancelar</Button>
            </div>
          </div>
        ) : false}
        {custom ? (
          <div className="custom">
            {children}
          </div>
        ) : false}
      </div>
    </div>
  );
}