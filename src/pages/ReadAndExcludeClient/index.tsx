import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Header } from '../../components/Header';
import { PageCRUD } from '../../components/PageCRUD';
import { Row } from '../../hooks/useTable';
import { Modal } from '../../components/Modal';

import ClientController from '../../service/controllers/ClientController';

export function ReadAndExcludeClient() {
  const history = useHistory();
  const [rowsSelected, setRowsSelected] = useState<Row[]>([]);

  const [justOneClient, setJustOneClient] = useState(false);
  const [selectOneClient, setSelectOneClient] = useState(false);
  const [selectMoreClient, setSelectMoreClient] = useState(false);
  const [confirmExcludedClient, setConfirmExcludedClient] = useState(false);
  const [excludedClient, setExcludedClient] = useState(false);

  async function handleToNewClient() {
    history.push('/new/client');
  }
  
  async function handleToEditClient() {
    if(rowsSelected.length > 1){
      setJustOneClient(true);
      return
    }
    if(rowsSelected.length < 1){
      setSelectOneClient(true);
      return
    }
    history.push(`/edit/client/${rowsSelected[0].id}`);
  }

  async function handleToRemoveClient() {
    if(rowsSelected.length < 1){
      setSelectMoreClient(true);
      return
    }
    setConfirmExcludedClient(true);
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

      {justOneClient ? 
        <Modal 
          alert 
          title="Alerta ao editar cliente" 
          handleToCancel={() => {setJustOneClient(false)}}
        >
          Não é possível editar mais de um cliente por vez.
        </Modal> 
      : false}

      {selectOneClient ? 
        <Modal 
          alert 
          title="Alerta ao editar cliente" 
          handleToCancel={() => {setSelectOneClient(false)}}
        >
          Selecione um cliente para editar.
        </Modal> 
      : false}

      {selectMoreClient ? 
        <Modal 
          alert 
          title="Alerta ao excluir cliente" 
          handleToCancel={() => {setSelectMoreClient(false)}}
        >
          Selecione um ou mais clientes para excluir.
        </Modal> 
      : false}

      {confirmExcludedClient ? 
        <Modal 
          confirm 
          title="Alerta ao excluir cliente" 
          handleToCancel={() => {setConfirmExcludedClient(false)}}
          handleToConfirm={() => {
            setConfirmExcludedClient(false);
            ClientController.delete(rowsSelected).then(() => {
              setExcludedClient(true);
            });
          }}
        >
          {`Deseja excluir o(s) cliente(s) ${rowsSelected.map(e => ' '+e.name)} ?`}
        </Modal> 
      : false}

      {excludedClient ? 
        <Modal 
          alert 
          title="Alerta ao excluir cliente" 
          handleToCancel={() => {setExcludedClient(false)}}
        >
          Clientes excluídos com sucesso!
        </Modal> 
      : false}
    </div>
  );
}