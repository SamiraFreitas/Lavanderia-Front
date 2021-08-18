import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { Header } from '../../components/Header';
import { LabelAndChange } from '../../components/LabelAndChange';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';

import { Client } from '../../service/models/Client';
import ClientController from '../../service/controllers/ClientController';

import './styles.scss'
import ClienteAPI, { Cliente } from '../../API/clienteAPI';
import { UsuarioData } from '../Login';

type ClientParams = {
  id: string;
}

export function RegisterAndEditClient() {
  const history = useHistory();
  const params = useParams<ClientParams>();

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cnpj, setCnpj] = useState('');
  
  const [alertFullFields, setAlertFullFields] = useState(false);
  const [alertRegistered, setAlertRegistered] = useState(false);
  const [alertEdited, setAlertEdited] = useState(false);

  const [clientes, setClientes] = useState(new ClienteAPI())

  useEffect(() => {
    if(params.id){
      clientes.getCliente(params.id).then((dados) => {
        if (dados) {
          setName(dados.nome);
          setCpf(dados.cpf);
          setEmail(dados.email);
          setPhone(dados.telefone);
          setCnpj(dados.cnpj_lavanderia);
        }
        else{
          history.push('/clients');
        }
      });
    }
  },[params, history, clientes]);

  function handleChangeClient(){
    
    if(name !== '' && cpf !== '' && email !== '' && 
      phone !== '' && cpf.length === 11) {

      if (params.id) {
        
        const client: Cliente = {
					nome: name,
					cpf: cpf,
					email: email,
					telefone: phone,
					cnpj_lavanderia: cnpj,
				};

        clientes.updateCliente(client.cpf, client).then(() => {
          setAlertEdited(true);
        });
      }
      else {

        const client: Cliente = {
					nome: name,
					cpf: cpf,
					email: email,
					telefone: phone,
					cnpj_lavanderia: UsuarioData.LogedUser.cnpj_lavanderia,
				};

        clientes.createCliente(client).then(() => {
          setAlertRegistered(true);
        });
      }
    }
    else{
      setAlertFullFields(true);
    }
  }

  return(
    <div id="register-and-edit-client" >
      <Header title={params.id ? "Editar Cliente" : "Novo Cliente"}/>
      
      <main>
        <div className="board">
          <form>
            <div className="Infos">
              <div>
                <LabelAndChange
                  input 
                  name="Nome"
                  type="text" 
                  onChange={event => setName(event.target.value)}
                  placeholder="Digite o nome do cliente..."
                  value={name !== '' ? name : undefined}
                />

                <LabelAndChange
                  input 
                  name="E-mail"
                  type="text" 
                  onChange={event => setEmail(event.target.value)}
                  placeholder="Digite o email do cliente..."
                  value={email !== '' ? email : undefined}
                />
              </div>

              <div>
                <LabelAndChange
                  input
                  readOnly={params.id ? true : false}
                  name="CPF"
                  type="text" 
                  onChange={event => setCpf(event.target.value)}
                  placeholder="Digite o CPF do cliente..."
                  value={cpf !== '' ? cpf : undefined}
                />

                <LabelAndChange
                  input 
                  name="Telefone"
                  type="text" 
                  onChange={event => setPhone(event.target.value)}
                  placeholder="Digite o telefone do cliente..."
                  value={phone !== '' ? phone : undefined}
                />
              </div>
            </div>
          </form>
        </div>
        <Button onClick={handleChangeClient}>{params.id ? "Salvar Alterações" : "Cadastrar Cliente"}</Button>
      </main>

      {alertFullFields ? 
        <Modal 
          alert 
          title="Alerta ao cadastrar cliente" 
          handleToCancel={() => {setAlertFullFields(false)}}
        >
          Preencha todos os campos corretamente!
        </Modal> 
      : false}

      {alertRegistered ? 
        <Modal 
          alert 
          title="Cliente Cadastrado"
          handleToCancel={() => {
            setAlertRegistered(false); 
            history.push('/clients');
          }}
        >
          {`Cliente ${name} cadastrado com sucesso!`}
        </Modal> 
      : false}

      {alertEdited ? 
        <Modal 
          alert 
          title="Cliente Editado"
          handleToCancel={() => {
            setAlertEdited(false);
            history.push('/clients');
          }}
        >
          {`Cliente ${name} editado com sucesso!!!`}
        </Modal> 
      : false}
    </div>
  );
}
