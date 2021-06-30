import { Button } from '../../components/Button';
import { Header } from '../../components/Header';

import './styles.scss'

export function NewClient() {
  return(
    <div id="new-client-page" >
      <Header title="Novo Cliente"/>
      <main>
        <div className="board">
        <form >
            <div >
              <b>Nome</b>
              <input 
                type="text" 
                placeholder="Digite o nome"
                
              />
              <b>Telefone</b>
              <input 
                type="text" 
                placeholder="Digite o numero de telefone"
              />
            </div>
            
            <div>
              <b>Email</b>
              <input 
                type="text" 
                placeholder="Digite o email"
              />
            </div>
          </form>

          <div className="section">
            <h3>Endereço</h3>
            <div className="results" >
              <div>
              <b>CEP</b>
              <input 
                type="text" 
                placeholder="Digite o cep"
              />
               <b>Cidade</b>
              <input 
                type="text" 
                placeholder="Digite o nome da cidade"
              />
               <b>Estado</b>
              <input 
                type="text" 
                placeholder="Digite o nome do estado"
              />
              </div>
              
              <div>
              <b>Rua</b>
              <input 
                type="text" 
                placeholder="Digite o nome da rua"
              />
               <b>Numero</b>
              <input 
                type="text" 
                placeholder="Digite o numero da casa"
              />
               <b>Bairro</b>
              <input 
                type="text" 
                placeholder="Digite o nome do bairro"
              />
              </div>
            </div>
          </div>

        </div>
        <Button onClick={() => console.log('Salvando...')}>Cadastrar Cliente</Button>
      </main>
    </div>
  );
}