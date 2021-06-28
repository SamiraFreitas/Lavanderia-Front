
import './styles.scss'

export function Costs() {

  return(
    <div id="costs-page" >
      <header>
        <h1>Painel Administrativo</h1>
        <h2>Custos <text>(por kg)</text></h2> 
      </header>

      <div className="separator" ></div>
      
      <main>
        <div className="board">
          <form onSubmit={() => console.log('teste')}>
            <div>
              <b>Água</b>
              <input type="text" placeholder="Digite o valor da água..."/>
              <b>Funcionário</b>
              <input type="text" placeholder="Digite o salário dos funcionários..."/>
            </div>
            
            <div>
              <b>Energia</b>
              <input type="text" placeholder="Digite o valor da água..."/>
              <b>Qtd Funcionários</b>
              <input type="text" placeholder="Digite a quantidade de funcionários..."/>
            </div>
          </form>
          
          <div className="section">
            <h3>Previsão</h3>
            <div className="results" >
              <div>
                <label>Custo médio mensal</label>
                <text>R$3.496,00</text>
              </div>
              
              <div>
                <label>Peso mínimo a ser lavado</label>
                <text>45Kg</text>
              </div>
            </div>
          </div>
        </div>
        <button type="submit">Salvar alterações</button>
      </main>
    </div>
  );
}