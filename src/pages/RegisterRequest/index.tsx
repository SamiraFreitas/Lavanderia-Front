import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LabelAndChange } from '../../components/LabelAndChange';
import { Toggle } from '../../components/Toggle';

import { Request } from '../../service/models/Request';
import ClientController from '../../service/controllers/ClientController';
import RequestController from '../../service/controllers/RequestController';
import { CalculatePrice } from '../../service/shared/CalculatePrice';

import './styles.scss'

export function RegisterRequest() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [type, setType] = useState('machine');
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [isDelivery, setIsDelivery] = useState(false);

  useEffect(() => {
    setPrice(CalculatePrice({type, weight, isDelivery}));
  }, [weight, type, isDelivery]);

  function verifyCpf(handleCpf: string){
    if(handleCpf.length > 10 ){
      ClientController.show(handleCpf, 'cpf').then((dados) => { 
        if(dados){
          setCpf(dados?.cpf);
          setName(dados?.name);
        }
      });
    }
  }

  function handleChangeRequest(){
    if(name !== '' && cpf !== '' && weight !== 0) {
      
      const request: Request = {
        id: uuid(),
        name,
        cpf,
        weight,
        type,
        isDelivery,
        price,
        date: Date.now.toString(),
        isPaid,
        status: 'Na Fila',
      }
  
      RequestController.create(request).then((dados) => {
        alert("Pedido "+dados?.name+" cadastrado com sucesso!!!");
        history.push('/requests');
      });
    }
    else{
      alert("Preencha todos os campos");
    }
  }

  return(
    <div id="new-request-page" >
      <Header title="Novo Pedido"/>
      
      <main>
        <div className="board">
          <form>
            <div className="requestInfos">
              <div>
                <LabelAndChange
                  input
                  name="CPF"
                  type="text" 
                  onChange={event => verifyCpf(event.target.value)}
                  placeholder="Digite o CPF do cliente..."
                />

                <LabelAndChange
                  select
                  name="Tipo de Lavagem"
                  placeholder="Selecione o tipo de lavagem..."
                  onChange={event => setType(event.target.value)}
                >
                  <option value="machine">À máquina</option>
                  <option value="hand">À mão</option>
                  <option value="dry">À seco</option>
                </LabelAndChange>

                <LabelAndChange span name="Preço">{price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</LabelAndChange>
              </div>

              <div>
                <LabelAndChange
                  input 
                  name="Peso(kg)"
                  type="text" 
                  placeholder="Digite o Peso das roupas..."
                  onChange={event => setWeight(parseFloat(event.target.value))} 
                />
                <div className="toggles">
                  <Toggle title="Entregar" onChange={event => setIsDelivery(event.target.checked)}/>
                  <Toggle title="Pago" onChange={event => setIsPaid(event.target.checked)}/>
                </div>
              </div>
            </div>
          </form>
        </div>
        <Button onClick={handleChangeRequest}>Cadastrar Pedido</Button>
      </main>
    </div>
  );
}