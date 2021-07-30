import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Modal } from '../../components/Modal';
import { PageCRUD } from '../../components/PageCRUD';
import { Row } from '../../hooks/useTable';

import RequestController from '../../service/controllers/RequestController';

export function ReadAndExcludeRequest() {
  const history = useHistory();
  const [rowsSelected, setRowsSelected] = useState<Row[]>([]);

  const [justOneRequest, setJustOneRequest] = useState(false);
  const [selectOneRequest, setSelectOneRequest] = useState(false);
  const [selectMoreRequest, setSelectMoreRequest] = useState(false);
  const [confirmExcludedRequest, setConfirmExcludedRequest] = useState(false);
  const [excludedRequest, setExcludedRequest] = useState(false);

  async function handleToNewRequest() {
    history.push('/new/request');
  }
  
  async function handleToEditRequest() {
    if(rowsSelected.length > 1){
      setJustOneRequest(true);
      return
    }
    if(rowsSelected.length < 1){
      setSelectOneRequest(true);
      return
    }
    history.push(`/edit/request/${rowsSelected[0].id}`);
  }

  async function handleToRemoveRequest() {
    if(rowsSelected.length < 1){
      setSelectMoreRequest(true);
      return
    }
    setConfirmExcludedRequest(true);
  }

  return(
    <div>
      <Header title="Pedidos"/>

      <PageCRUD
        title="requests"
        handleToNew={handleToNewRequest}
        handleToEdit={handleToEditRequest}
        handleToRemove={handleToRemoveRequest}
        setRowsSelected={setRowsSelected}
      />

      {justOneRequest ? 
        <Modal 
          alert 
          title="Alerta ao editar pedido" 
          handleToCancel={() => {setJustOneRequest(false)}}
        >
          Não é possível editar mais de um pedido por vez.
        </Modal> 
      : false}

      {selectOneRequest ? 
        <Modal 
          alert 
          title="Alerta ao editar pedido" 
          handleToCancel={() => {setSelectOneRequest(false)}}
        >
          Selecione um pedido para editar.
        </Modal> 
      : false}

      {selectMoreRequest ? 
        <Modal 
          alert 
          title="Alerta ao excluir pedido" 
          handleToCancel={() => {setSelectMoreRequest(false)}}
        >
          Selecione um ou mais pedidos para excluir.
        </Modal> 
      : false}

      {confirmExcludedRequest ? 
        <Modal 
          confirm 
          title="Alerta ao excluir pedido" 
          handleToCancel={() => {setConfirmExcludedRequest(false)}}
          handleToConfirm={() => {
            setConfirmExcludedRequest(false);
            RequestController.delete(rowsSelected).then(() => {
              setExcludedRequest(true);
            });
          }}
        >
          {`Deseja excluir o(s) pedido(s) ${rowsSelected.map(e => ' '+e.name)} ?`}
        </Modal> 
      : false}

      {excludedRequest ? 
        <Modal 
          alert 
          title="Alerta ao excluir pedido" 
          handleToCancel={() => {
            setExcludedRequest(false)
            window.location.reload();
          }}
        >
          Pedidos excluídos com sucesso!
        </Modal> 
      : false}
    </div>
  );
}