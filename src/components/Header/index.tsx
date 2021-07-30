import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Modal } from '../Modal';
import AdministratorController from '../../service/controllers/AdministratorController';

import './styles.scss';

type HeaderProps = {
  title: string;
}

export function Header({title}: HeaderProps) {
  const history = useHistory();

  const [confirmToBack, setConfirmToBack] = useState(false);

  function handleToBack() {
    setConfirmToBack(true);
  }

  return(
    <div id="Header" >
      <header>
        <div>
          <h1>Painel Administrativo</h1>
          <h2>{title}</h2>
        </div>
        <button onClick={handleToBack}>Sair</button>
      </header>
      <div className="separator" ></div>

      {confirmToBack ? 
        <Modal 
          confirm 
          title="Alerta ao fazer logout" 
          handleToCancel={() => {setConfirmToBack(false)}}
          handleToConfirm={() => {
            setConfirmToBack(false);
            AdministratorController.logout().then(result => {
              if(result) {
                history.push('/');
                window.location.reload();
              }
            });
          }}
        >
         Deseja realizar o logout e sair?
        </Modal> 
      : false}
    </div>
  );
}