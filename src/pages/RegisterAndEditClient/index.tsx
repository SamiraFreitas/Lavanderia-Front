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

type ClientParams = {
  id: string;
}

export function RegisterAndEditClient() {
  const history = useHistory();
  const params = useParams<ClientParams>();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState(0);
  const [district, setDistrict] = useState('');
  const [complement, setComplement] = useState('');
  
  const [alertFullFields, setAlertFullFields] = useState(false);
  const [alertRegistered, setAlertRegistered] = useState(false);
  const [alertEdited, setAlertEdited] = useState(false);

  useEffect(() => {
    if(params.id){
      ClientController.show(params.id, 'id').then((dados) => {
        if (dados) {
          setId(dados.id);
          setName(dados.name);
          setCpf(dados.cpf);
          setEmail(dados.email);
          setPhone(dados.phone);
          setCep(dados.cep);
          setCity(dados.city);
          setState(dados.state);
          setStreet(dados.street);
          setNumber(dados.number);
          setDistrict(dados.district);
          setComplement(dados.complement);
        }
        else{
          history.push('/clients');
        }
      });
    }
  },[params, history]);

  function handleChangeClient(){
    
    if(name !== '' && cpf !== '' && email !== '' && 
      phone !== '' && cep !== '' && city !== '' && 
      state !== '' && street !== '' && number !== null && 
      district !== '' && complement !== '') {
        
      const client: Client = {
        id: id === '' ? uuid() : id,
        name,
        cpf,
        email,
        phone,
        cep,
        city,
        state,
        street,
        number,
        district,
        complement
      }

      if(params.id) {
        ClientController.update(client).then(() => {
          setAlertEdited(true);
        });
      }
      else {
        ClientController.create(client).then(() => {
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

            <h2>Endereço</h2>
            <div className="Infos">
              <div>
                <LabelAndChange
                  input 
                  name="CEP"
                  type="text" 
                  onChange={event => setCep(event.target.value)}
                  placeholder="Digite o CEP do cliente..."
                  value={cep !== '' ? cep : undefined}
                />

                <LabelAndChange
                  input 
                  name="Rua"
                  type="text" 
                  onChange={event => setStreet(event.target.value)}
                  placeholder="Digite o rua do cliente..."
                  value={street !== '' ? street : undefined}
                />

                <LabelAndChange
                  input 
                  name="Complemento"
                  type="text" 
                  onChange={event => setComplement(event.target.value)}
                  placeholder="Digite o complemento do endereço..."
                  value={complement !== '' ? complement : undefined}
                />
              </div>

              <div>
                <LabelAndChange
                  input 
                  name="Cidade"
                  type="text" 
                  onChange={event => setCity(event.target.value)}
                  placeholder="Digite o cidade do cliente..."
                  value={city !== '' ? city : undefined}
                />

                <LabelAndChange
                  input 
                  name="Número"
                  type="text" 
                  onChange={event => setNumber(parseFloat(event.target.value) || 0)}
                  placeholder="Digite o número do cliente..."
                  value={number !== 0 ? number : undefined}
                />
              </div>

              <div>
                <LabelAndChange
                  input 
                  name="Estado"
                  type="text" 
                  onChange={event => setState(event.target.value)}
                  placeholder="Digite o estado do cliente..."
                  value={state !== '' ? state : undefined}
                />

                <LabelAndChange
                  input 
                  name="Bairro"
                  type="text" 
                  onChange={event => setDistrict(event.target.value)}
                  placeholder="Digite o bairro do cliente..."
                  value={district !== '' ? district : undefined}
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
          Preencha todos os campos!
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
