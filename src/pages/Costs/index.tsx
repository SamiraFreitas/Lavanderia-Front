import { FormEvent, useState } from 'react';
import { Button } from '../../components/Button';

import { Header } from '../../components/Header';
import {CalculateCosts} from '../../service/shared/CalculateCosts';

import './styles.scss'

export function Costs() {
  const [expenses, setExpenses] = useState(0);
  const [washValue, setWashValue] = useState(0);
  const [desiredProfit, setDesiredProfit] = useState(0);

  // Realizar chamada no backend de Custos.
  const data = {
    averageCost: 6000,
    minimumWeight: 60,
    profit: 1000,
  }
  const [averageCost, setAverageCost] = useState(data.averageCost);
  const [minimumWeight, setMinimumWeight] = useState(data.minimumWeight);
  const [profit, setProfit] = useState(data.profit);
  
  function handleCalculate(event: FormEvent) {
    event.preventDefault();
    
    let data = {
      expenses,
      washValue,
      desiredProfit,
    }

    const result = CalculateCosts(data);

    if(result){
      setAverageCost(result?.averageCost);
      setMinimumWeight(result?.minimumWeight);
      setProfit(result?.profit);
    }
  }

  function handleSaveEditions() {
    const cost = {
      expenses,
      washValue,
      desiredProfit,
      averageCost,
      minimumWeight,
      profit,
    }
    // Salvar cost no banco de dados
    console.log(cost);
  }

  return(
    <div id="costs-page" >
      <Header title="Custos"/>
      
      <main>
        <div className="board">
          <form onSubmit={handleCalculate}>
            <div>
              <b>Despesas (R$)</b>
              <input 
                type="text" 
                placeholder="Digite o somatório das despesas..."
                onChange={event => setExpenses(parseFloat(event.target.value))} 
              />
              <b>Lucro</b>
              <input 
                type="text" 
                placeholder="Digite o lucro desejado..."
                onChange={event => setDesiredProfit(parseFloat(event.target.value))} 
              />
            </div>
            
            <div>
              <b>Valor lavagem (por Kg)</b>
              <input 
                type="text" 
                placeholder="Digite o valor da lavagem por Kg..."
                onChange={event => setWashValue(parseFloat(event.target.value))} 
              />
              <Button isOutlined type="submit">Calcular</Button>
            </div>
          </form>
          
          <div className="section">
            <h3>Previsão</h3>
            <div className="results" >
              <div>
                <label>Custo médio mensal</label>
                <p>{averageCost.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
              </div>
              
              <div>
                <label>Peso mínimo a ser lavado</label>
                <p>{minimumWeight}Kg</p>
              </div>

              <div>
                <label>Lucro</label>
                <p>{profit.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
              </div>
            </div>
          </div>
        </div>
        <Button onClick={handleSaveEditions}>Salvar alterações</Button>
      </main>
    </div>
  );
}