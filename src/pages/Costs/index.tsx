import { FormEvent, useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { LabelAndChange } from '../../components/LabelAndChange';

import {Cost} from '../../service/models/Cost';
import { CalculateCosts } from '../../service/shared/CalculateCosts';
import CostController from '../../service/controllers/CostController';

import './styles.scss'
import { Modal } from '../../components/Modal';

export function Costs() {
  const [expenses, setExpenses] = useState(0);
  const [profit, setProfit] = useState(0);
  const [washingMachine, setWashingMachine] = useState(0);
  const [washingHand, setWashingHand] = useState(0);
  const [washingDry, setWashingDry] = useState(0);
  const [costMedium, setCostMedium] = useState(0);
  const [weightMinimum, setWeightMinimum] = useState(0);

  const [alertFullFields, setAlertFullFields] = useState(false);
  const [alertEdited, setAlertEdited] = useState(false);
  
  useEffect(() => {
    CostController.show().then((dados) => {
      if (dados) {
        setExpenses(dados.expenses);
        setProfit(dados.profit);
        setWashingMachine(dados.washingMachine);
        setWashingHand(dados.washingHand);
        setWashingDry(dados.washingDry);
        setCostMedium(dados.costMedium);
        setWeightMinimum(dados.weightMinimum);
      }
    });
  }, []);
  
  function handleCalculate(event: FormEvent) {
    event.preventDefault();

    if(expenses !== 0 && profit !== 0 && washingMachine !== 0 
      && washingHand !== 0 && washingDry !== 0) {
      
      let data: Cost = {
        expenses,
        profit,
        washingMachine,
        washingHand,
        washingDry,
        costMedium: 0,
        weightMinimum: 0,
      }
  
      const result = CalculateCosts(data);
  
      if(result){
        setProfit(result?.profit);
        setCostMedium(result?.costMedium);
        setWeightMinimum(result?.weightMinimum);
      }
    }
    else{
      setAlertFullFields(true);
    }
  }

  function handleSaveEditions() {
    if(expenses !== 0 && profit !== 0 && washingMachine !== 0 && washingHand !== 0 
      && washingDry !== 0 && costMedium !== 0 && weightMinimum !== 0) {
      
      let data: Cost = {
        expenses,
        profit,
        washingMachine,
        washingHand,
        washingDry,
        costMedium,
        weightMinimum
      }

      const cost = CalculateCosts(data);
  
      CostController.update(cost).then((dados) => {
        if (dados) {
          setAlertEdited(true);
        }
      });
    }
    else{
      setAlertFullFields(true);
    }
  }

  return(
    <div id="costs-page" >
      <Header title="Custos"/>
      
      <main>
        <div className="board">
          <form onSubmit={handleCalculate}>
            <div>
              <h3>Valores Estipulados</h3>
              <LabelAndChange
                input 
                name="Despesas"
                type="text" 
                placeholder="Digite o somatório das despesas..."
                onChange={event => setExpenses(parseFloat(event.target.value) || 0)}
                value={expenses !== 0 ? expenses : undefined}
              />

              <LabelAndChange
                input 
                name="Lucro Desejado"
                type="text" 
                placeholder="Digite o lucro desejado..."
                onChange={event => setProfit(parseFloat(event.target.value) || 0)}
                value={profit !== 0 ? profit : undefined}
              />
            </div>
            
            <div>
              <h3>Valores de Serviço  (por Kg)</h3>
              <LabelAndChange
                input 
                name="Maquina"
                type="text" 
                placeholder="Digite o valor da lavagem por Kg..."
                onChange={event => setWashingMachine(parseFloat(event.target.value) || 0)}
                value={washingMachine !== 0 ? washingMachine : undefined}
              />

              <LabelAndChange
                input 
                name="Mão"
                type="text" 
                placeholder="Digite o valor da lavagem por Kg..."
                onChange={event => setWashingHand(parseFloat(event.target.value) || 0)}
                value={washingHand !== 0 ? washingHand : undefined}
              />

              <LabelAndChange
                input 
                name="Seco"
                type="text" 
                placeholder="Digite o valor da lavagem por Kg..."
                onChange={event => setWashingDry(parseFloat(event.target.value) || 0)}
                value={washingDry !== 0 ? washingDry : undefined}
              />
            </div>

            <Button isOutlined type="submit">Calcular</Button>
          </form>
          
          <div className="section">
            <h3>Previsão</h3>
            <div className="results" >
              <div>
                <LabelAndChange span name="Custo médio mensal">{costMedium.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</LabelAndChange>
              </div>
              
              <div>
                <LabelAndChange span name="Peso mínimo a ser lavado">{weightMinimum} Kg</LabelAndChange>
              </div>

              <div>
                <LabelAndChange span name="Lucro Estimado">{profit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</LabelAndChange>
              </div>
            </div>
          </div>
        </div>
        <Button onClick={handleSaveEditions}>Salvar alterações</Button>
      </main>
    
      {alertFullFields ? 
        <Modal 
          alert 
          title="Alerta ao calcular custos" 
          handleToCancel={() => {setAlertFullFields(false)}}
        >
          Preencha todos os campos!
        </Modal> 
      : false}

      {alertEdited ? 
        <Modal 
          alert 
          title="Custo Editado"
          handleToCancel={() => {
            setAlertEdited(false);
          }}
        >
          {`Custos editado com sucesso!!!`}
        </Modal> 
      : false}
    </div>
  );
}