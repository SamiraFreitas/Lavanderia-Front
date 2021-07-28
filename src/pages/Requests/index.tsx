import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Header } from '../../components/Header';
import { PageCRUD } from '../../components/PageCRUD';
import { Row } from '../../hooks/useTable';

import RequestController from '../../service/controllers/RequestController';

export function Requests() {
  const history = useHistory();
  const [rowsSelected, setRowsSelected] = useState<Row[]>([]);

  async function handleToNewRequest() {
    history.push('/new/request');
  }
  
  async function handleToEditRequest() {
    if(rowsSelected.length > 1){
      alert("Não é possível editar mais de um pedido por vez.");
      return
    }
    if(rowsSelected.length < 1){
      alert("Selecione um pedido para editar.");
      return
    }

    history.push(`/edit/request/${rowsSelected[0].id}`);
  }

  async function handleToRemoveRequest() {
    if(rowsSelected.length < 1){
      alert("Selecione um ou mais pedidos para excluir.");
      return
    }

    let ids = '';
    rowsSelected.forEach(e => {
      ids = ids + e.id + ', ';
    })

    if(window.confirm('Deseja excluir o(s) pedido(s) '+ ids + '?')) {
      RequestController.delete(rowsSelected).then(() => {
        alert("Pedidos excluídos com sucesso!!!");
      });
    }
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
    </div>
  );
}