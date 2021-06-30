import { Button } from '../../components/Button';
import { Header } from '../../components/Header';

import './styles.scss'

export function NewRequest() {
  return(
    <div id="new-request-page" >
      <Header title="Novo Pedido"/>
      
      <main>
        <div className="board">

        </div>
        <Button onClick={() => console.log('Salvando...')}>Cadastrar Pedido</Button>
      </main>
    </div>
  );
}