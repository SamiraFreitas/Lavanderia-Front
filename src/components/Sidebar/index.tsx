import { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/logo.png'


import './styles.scss';

type SidebarProps = {
  children?: ReactNode;
}

export function Sidebar({children}: SidebarProps) {
  const history = useHistory();

  async function handleToClients() {
    history.push('/clients');
  }
  async function handleToCosts (){
    history.push('/costs');
  }

  async function handleToRequests() {
    history.push('/requests');
  }

  return(
    <div id="home" >
      <aside>
        <img src={logo} alt="Logo"/>
        <ul>
          <button onClick={handleToClients}>Clientes</button>
          <button onClick={handleToRequests}>Pedidos</button>
          <button onClick={handleToCosts}>Custos</button>
        </ul>
      </aside>
      <main>
        <div className="main-content" >
          {children}
        </div>
      </main>
    </div>
  );
}