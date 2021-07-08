import { Button } from '../../components/Button';
import { Header } from '../../components/Header';

import './style.scss';

export function Status (){
    return (
        <div id="new-request-page" >
        <Header title="Verifique e edite o status do pedido"/>
        
        <main>
          <div className="board">
          <form >
              <div >
                <b> CPF</b>
                <input 
                  type="text" 
                  placeholder="Digite o seu cpf"
                  
                />
              </div>
            </form>
            <div className="section">
              <h3>Status</h3>
              <div className="results" >
                <div>
                  <label>Pedido Realizado</label>
                 
                </div>
                
                <div>
                  <label>Pagamento confirmado</label>
                  
                </div>
  
                <div className="status">
                  <label>Pedido sendo lavado</label>
                </div>
                <div className="status">
                  <label>Finalizado</label>
                  <Button >Enviar e-mail</Button>
                </div>
              </div>
            </div>
          </div>
          <Button onClick={() => console.log('Salvando...')}>Confirmar status</Button>
        </main>
      </div>
    );
}