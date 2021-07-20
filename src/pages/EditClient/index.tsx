import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';

import { Client } from '../../service/models/Client';
import ClientController from '../../service/controllers/ClientController';

import './styles.scss'

type ClientParams = {
  id: string;
}

export function EditClient() {
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

  useEffect(() => {
    ClientController.show(params.id).then((dados) => {
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
  },[]);

  function handleEditClient(){
    
    if(name !== '' && cpf !== '' && email !== '' && 
      phone !== '' && cep !== '' && city !== '' && 
      state !== '' && street !== '' && number !== null && 
      district !== '' && complement !== '') {
        
      const client: Client = {
      id,
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

      ClientController.update(client).then((dados) => {
        alert("Cliente "+dados?.name+" Editado com sucesso!!!");
        history.push('/clients');
      });
    }
    else{
      alert("Preencha todos os campos");
    }
  }

  return(
    <div id="edit-client-page" >
      <Header title="Editar Cliente"/>
      
      <main>
        <div className="board">
          <form>
            <div className="clientInfos">
              <div>
                <b>Nome</b>
                <input 
                  type="text" 
                  onChange={event => setName(event.target.value)}
                  value={name}
                />
                <b>E-mail</b>
                <input 
                  type="text" 
                  onChange={event => setEmail(event.target.value)}
                  value={email}
                />
              </div>

              <div>
                <b>CPF</b>
                <input 
                  type="text" 
                  onChange={event => setCpf(event.target.value)} 
                  value={cpf}
                />
                <b>Telefone</b>
                <input 
                  type="text" 
                  onChange={event => setPhone(event.target.value)}
                  value={phone}
                />
              </div>
            </div>

            <h2>Endereço</h2>
            <div className="clientInfos">
              
              <div>
                <b>CEP</b>
                <input 
                  type="text" 
                  onChange={event => setCep(event.target.value)}
                  value={cep}
                />
                <b>Rua</b>
                <input 
                  type="text" 
                  onChange={event => setStreet(event.target.value)}
                  value={street}
                />
                <b>Complemento</b>
                <input 
                  type="text" 
                  onChange={event => setComplement(event.target.value)}
                  value={complement}
                />
              </div>

              <div>
                <b>Cidade</b>
                <input 
                  type="text" 
                  onChange={event => setCity(event.target.value)}
                  value={city}
                />
                <b>Número</b>
                <input 
                  type="text" 
                  onChange={event => setNumber(parseFloat(event.target.value))}
                  value={number}
                />
              </div>

              <div>
                <b>Estado</b>
                <input 
                  type="text" 
                  onChange={event => setState(event.target.value)}
                  value={state}
                />
                <b>Bairro</b>
                <input 
                  type="text" 
                  onChange={event => setDistrict(event.target.value)}
                  value={district}
                />
              </div>
            </div>
          </form>
        </div>
        <Button onClick={handleEditClient}>Salvar Alterações</Button>
      </main>
    
    </div>
  );
}