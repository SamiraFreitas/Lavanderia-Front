import { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/washing-machine.png'

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
          <span onClick={handleToClients}>Clientes</span>
          <span onClick={handleToRequests}>Pedidos</span>
          <span onClick={handleToCosts}>Custos</span>
        </div>
      </aside>
      <section>
        {children}
      </section>
    </div>
  );
}