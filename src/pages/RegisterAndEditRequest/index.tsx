import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LabelAndChange } from '../../components/LabelAndChange';
import { Toggle } from '../../components/Toggle';
import { Modal } from '../../components/Modal';

import { Request } from '../../service/models/Request';
import ClientController from '../../service/controllers/ClientController';
import RequestController from '../../service/controllers/RequestController';
import { CalculatePrice } from '../../service/shared/CalculatePrice';

import './styles.scss'

type RequestParams = {
  id: string;
}

export function RegisterAndEditRequest() {
  const history = useHistory();
  const params = useParams<RequestParams>();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [status, setStatus] = useState('queue');
  const [date, setDate] = useState('');
  const [type, setType] = useState('machine');
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [isPaid, setIsPaid] = useState(Boolean);
  const [isDelivery, setIsDelivery] = useState(Boolean);

  const [alertFullFields, setAlertFullFields] = useState(false);
  const [alertRegistered, setAlertRegistered] = useState(false);
  const [alertEdited, setAlertEdited] = useState(false);

  useEffect(() => {
    if(params.id){
      RequestController.show(params.id).then((dados) => {
        if (dados) {
          setId(dados.id);
          setName(dados.name);
          setCpf(dados.cpf);
          setStatus(dados.status);
          setDate(dados.date);
          setType(dados.type);
          setPrice(dados.price);
          setWeight(dados.weight);
          setIsPaid(dados.isPaid);
          setIsDelivery(dados.isDelivery);
        }
        else{
          history.push('/clients');
        }
      });
    }
    else {
      CalculatePrice({type, weight, isDelivery}).then((dados) => {setPrice(dados)});
    }
  }, [weight, type, isDelivery, params.id, history]);

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
        id: id === '' ? uuid() : id,
        name,
        cpf,
        weight,
        type,
        isDelivery,
        price,
        date: date === '' ? new Date(Date.now()).toLocaleDateString() : date,
        isPaid,
        status,
      }

      if(params.id) {
        RequestController.update(request).then((dados) => {
          setAlertEdited(true);
        });
      }
      else {
        RequestController.create(request).then((dados) => {
          setAlertRegistered(true);
        });
      }
    }
    else{
      setAlertFullFields(true);
    }
  }

  return(
    <div id="new-request-page" >
      <Header title={params.id ? "Editar Pedido" : "Novo Pedido"}/>
      
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
                  value={cpf !== '' ? cpf : undefined}
                  disabled={params.id !== undefined ? true : false}
                />

                <LabelAndChange
                  select
                  name="Tipo de Lavagem"
                  placeholder="Selecione o tipo de lavagem..."
                  onChange={event => setType(event.target.value)}
                  value={type || "machine"}
                  disabled={params.id !== undefined ? true : false}
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
                  placeholder="Digite o Peso do conjunto roupas..."
                  onChange={event => setWeight(parseFloat(event.target.value) || 0)}
                  value={weight !== 0 ? weight : undefined}
                  disabled={params.id !== undefined ? true : false}
                />

                {params.id ? (                
                  <LabelAndChange
                    select
                    name="Status de Lavagem"
                    placeholder="Selecione o status da lavagem..."
                    onChange={event => setStatus(event.target.value)}
                    value={status || "queue"}
                  >
                    <option value="queue">Na Fila</option>
                    <option value="washing">Lavando</option>
                    <option value="finished">Finalizado</option>
                    {isDelivery ? (<option value="deliver">Entregar</option>) : false}
                  </LabelAndChange>
                ) : false}

                <div className="toggles">
                  <Toggle 
                    title="Entregar"
                    checked={isDelivery}
                    onChange={event => setIsDelivery(event.target.checked)}
                    disabled={(params.id !== undefined && isDelivery === true) ? true : false}
                  />
                  <Toggle 
                    title="Pago" 
                    checked={isPaid}
                    onChange={event => setIsPaid(event.target.checked)}
                    disabled={(params.id !== undefined && isPaid === true) ? true : false}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <Button onClick={handleChangeRequest}>{params.id ? "Salvar Alterações" : "Cadastrar Pedido"}</Button>
      </main>
                  
      {alertFullFields ? 
        <Modal 
          alert 
          title="Alerta ao cadastrar pedido" 
          handleToCancel={() => {setAlertFullFields(false)}}
        >
          Preencha todos os campos!
        </Modal> 
      : false}

      {alertRegistered ? 
        <Modal 
          alert 
          title="Pedido Cadastrado"
          handleToCancel={() => {
            setAlertRegistered(false); 
            history.push('/requests');
          }}
        >
          {`Pedido ${name} cadastrado com sucesso!`}
        </Modal> 
      : false}

      {alertEdited ? 
        <Modal 
          alert 
          title="Pedido Editado"
          handleToCancel={() => {
            setAlertEdited(false);
            history.push('/requests');
          }}
        >
          {`Pedido ${name} editado com sucesso!!!`}
        </Modal> 
      : false}
    </div>
  );
}