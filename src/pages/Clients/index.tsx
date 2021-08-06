import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Header } from '../../components/Header';
import { PageCRUD } from '../../components/PageCRUD';
import { Row } from '../../hooks/useTable';

import ClientController from '../../service/controllers/ClientController';

export function Clients() {
  const history = useHistory();
  const [rowsSelected, setRowsSelected] = useState<Row[]>([]);


  async function handleToNewClient() {
    history.push('/new/client');
  }
  
  async function handleToEditClient() {
    if(rowsSelected.length > 1){
      alert("Não é possível editar mais de um cliente por vez.");
      return
    }
    if(rowsSelected.length < 1){
      alert("Selecione um cliente para editar.");
      return
    }

    history.push(`/edit/client/${rowsSelected[0].id}`);
  }

  async function handleToRemoveClient() {
    if(rowsSelected.length < 1){
      alert("Selecione um ou mais clientes para excluir.");
      return
    }

    let names = '';
    rowsSelected.forEach(e => {
      names = names + e.name + ', ';
    })

    if(window.confirm('Deseja excluir o(s) cliente(s) '+ names + '?')) {
      ClientController.delete(rowsSelected).then(() => {
        alert("Clientes excluídos com sucesso!!!");
      });
    }
  }

  return(
    <div>
      <Header title="Clientes"/>

      <PageCRUD 
        title="clients"
        handleToNew={handleToNewClient}
        handleToEdit={handleToEditClient}
        handleToRemove={handleToRemoveClient}
        setRowsSelected={setRowsSelected}
      />
    </div>
  );
}