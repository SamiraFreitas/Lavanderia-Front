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

  async function handleToRequests() {
    history.push('/requests');
  }

  async function handleToCosts() {
    history.push('/costs');
  }

  return(
    <div id="home" >
      <aside>
        <img src={logo} alt="Logo"/>
        <div className="list">
          <b onClick={handleToClients}>Clientes</b>
          <b onClick={handleToRequests}>Pedidos</b>
          <b onClick={handleToCosts}>Custos</b>
        </div>
      </aside>
      <main>
          {children}
      </main>
    </div>
  );
}