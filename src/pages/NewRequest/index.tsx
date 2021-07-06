import { Button } from '../../components/Button';
import { Header } from '../../components/Header';

import './styles.scss'

export function NewRequest() {
  return(
    <div id="new-request-page" >
      <Header title="Novo Pedido"/>
      
      <main>
        <div className="board">
        <form >
            <div >
              <b> CPF</b>
              <input 
                type="text" 
                placeholder="Digite o seu cpf"
                
              />
              <b>Kg</b>
              <input 
                type="text" 
                placeholder="Qtd roupa kg"
              />
            </div>
            
            <div>
              <b>Tipo de Lavagem</b>
              <select>
                        <option value="seco">A seco</option>
                        <option value="Agua">Agua</option>
              </select>
            </div>
          </form>
          <div className="section">
            <h3>Previsão</h3>
            <div className="results" >
              <div>
                <label>Custo médio mensal</label>
               
              </div>
              
              <div>
                <label>Peso mínimo a ser lavado</label>
                
              </div>

              <div>
                <label>Lucro</label>
              </div>
            </div>
          </div>
        </div>
        <Button onClick={() => console.log('Salvando...')}>Cadastrar Pedido</Button>
      </main>
    </div>
  );
}