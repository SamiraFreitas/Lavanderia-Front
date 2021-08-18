import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LabelAndChange } from '../../components/LabelAndChange';
import { Modal } from '../../components/Modal';

import { CalculatePrice } from '../../service/shared/CalculatePrice';

import './styles.scss'
import PedidoAPI, { Pedido, PedidoDTO } from '../../API/pedidoAPI';
import ClienteAPI from '../../API/clienteAPI';

type RequestParams = {
  id: string;
}

export function RegisterAndEditRequest() {
  const history = useHistory();
  const params = useParams<RequestParams>();
  const [cpf, setCpf] = useState('');
  const [status, setStatus] = useState('NA FILA');
  const [type, setType] = useState(1);
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);

  const [alertFullFields, setAlertFullFields] = useState(false);
  const [alertRegistered, setAlertRegistered] = useState(false);
  const [alertEdited, setAlertEdited] = useState(false);
  const [alertInvalidCpf, setAlertInvalidCpf] = useState(false)

  const [pedidos, setPedidos] = useState(new PedidoAPI())
  const [clientes, setClientes] = useState(new ClienteAPI())

  useEffect(() => {
    if(params.id){
      pedidos.getPedido(+params.id).then((dados) => {
        if (dados) {
          setCpf(dados.cpf_cliente);
          setStatus(dados.status);
          setType(dados.tipo);
          setPrice(dados.preco);
          setWeight(dados.peso);
        }
        else{
          history.push('/clients');
        }
      });
    }
    else {
      CalculatePrice({type, weight}).then((dados) => {setPrice(dados)});
    }
  }, [weight, type, params.id, history, pedidos]);

  async function handleChangeRequest(){
    if(cpf !== '' && weight !== 0) {

      if (params.id) {
        
        const request: Pedido = {
					id: +params.id,
					cpf_cliente: cpf,
					peso: weight,
					tipo: type,
					preco: price,
					status: status,
				};

        pedidos.updatePedido(request, request.id).then((dados) => {
          setAlertEdited(true);
        });
      }
      else {

        const request: PedidoDTO = {
					cpf_cliente: cpf,
					peso: weight,
					tipo: type,
					preco: price,
					status: status,
        };
				const validCpf = await clientes.getCliente(request.cpf_cliente).then((el) => { return el })

        if (validCpf) {
          console.log(request)
          pedidos.createPedido(request).then((dados) => {
						setAlertRegistered(true);
					});
        } else {
          setAlertInvalidCpf(true)
        }
      }
    }
    else{
      setAlertFullFields(true);
    }
  }

  return (
		<div id='new-request-page'>
			<Header title={params.id ? "Editar Pedido" : "Novo Pedido"} />

			<main>
				<div className='board'>
					<form>
						<div className='requestInfos'>
							<div>
								<LabelAndChange
									input
									name='CPF'
									type='text'
									onChange={(event) => setCpf(event.target.value)}
									placeholder='Digite o CPF do cliente...'
                  value={cpf !== "" ? cpf : undefined}
									disabled={params.id !== undefined ? true : false}
								/>

								<LabelAndChange
									select
									name='Tipo de Lavagem'
									placeholder='Selecione o tipo de lavagem...'
									onChange={(event) => setType(+event.target.value)}
									value={type || 1}
									disabled={params.id !== undefined ? true : false}>
									<option value='1'>À máquina</option>
									<option value='2'>À mão</option>
									<option value='3'>À seco</option>
								</LabelAndChange>

								<LabelAndChange span name='Preço'>
									{price.toLocaleString("pt-BR", {
										style: "currency",
										currency: "BRL",
									})}
								</LabelAndChange>
							</div>

							<div>
								<LabelAndChange
									input
									name='Peso(kg)'
									type='text'
									placeholder='Digite o Peso do conjunto roupas...'
									onChange={(event) =>
										setWeight(parseFloat(event.target.value) || 0)
									}
									value={weight !== 0 ? weight : undefined}
									disabled={params.id !== undefined ? true : false}
								/>

								{params.id ? (
									<LabelAndChange
										select
										name='Status de Lavagem'
										placeholder='Selecione o status da lavagem...'
										onChange={(event) => setStatus(event.target.value)}
										value={status || "queue"}>
										<option value='NA FILA'>Na Fila</option>
										<option value='LAVANDO'>Lavando</option>
										<option value='FINALIZADO'>Finalizado</option>
										<option value='ENTREGUE'>Entregue</option>
									</LabelAndChange>
								) : (
									false
								)}

								{/* <div className="toggles">
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
                </div> */}
							</div>
						</div>
					</form>
				</div>
				<Button onClick={handleChangeRequest}>
					{params.id ? "Salvar Alterações" : "Cadastrar Pedido"}
				</Button>
			</main>

			{alertFullFields ? (
				<Modal
					alert
					title='Alerta ao cadastrar pedido'
					handleToCancel={() => {
						setAlertFullFields(false);
					}}>
					Preencha todos os campos!
				</Modal>
			) : (
				false
			)}

			{alertRegistered ? (
				<Modal
					alert
					title='Pedido Cadastrado'
					handleToCancel={() => {
						setAlertRegistered(false);
						history.push("/requests");
					}}>
					{`Pedido cadastrado com sucesso!`}
				</Modal>
			) : (
				false
			)}

			{alertEdited ? (
				<Modal
					alert
					title='Pedido Editado'
					handleToCancel={() => {
						setAlertEdited(false);
						history.push("/requests");
					}}>
					{`Pedido editado com sucesso!!!`}
				</Modal>
			) : (
				false
			)}

			{alertInvalidCpf ? (
				<Modal
					alert
					title='CPF inválido'
					handleToCancel={() => {
						setAlertInvalidCpf(false);
					}}>
					{`CPF inválido, favor digitar um valor correto...`}
				</Modal>
			) : (
				false
			)}
		</div>
	);
}