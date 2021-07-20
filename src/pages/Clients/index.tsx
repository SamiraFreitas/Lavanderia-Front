import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DataGrid, GridSelectionModelChangeParams } from '@material-ui/data-grid';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { useTable, RowClient } from '../../hooks/useTable';

import ClientController from '../../service/controllers/ClientController';

import './styles.scss'

export function Clients() {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const { columns, rowsClient } = useTable({type: 'clients', search: searchQuery});
  const [rowsSelected, setRowsSelected] = useState<RowClient[]>([]);

  async function handleToNewClient() {
    history.push('/new/client');
  }

  async function handleToSelectedClient(elements: GridSelectionModelChangeParams) {
    const selected = new Set(elements.selectionModel);
    setRowsSelected(rowsClient.filter((client: RowClient) => selected.has(client.id)));
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
        setSearchQuery(' ');
        setSearchQuery('');
      });
    }
  }

  return(
    <div id="clients-page" >
      <Header title="Clientes"/>

      <main>
        <div className="section">
          <div>
            <Button onClick={handleToNewClient} isOutlined>✛<b>Novo Cliente</b></Button>
            <Button onClick={handleToEditClient} isOutlined>✎<b>Editar Cliente</b></Button>
            <Button onClick={handleToRemoveClient} isOutlined>✕<b>Excluir Cliente</b></Button>
          </div>
          <form>
            <input 
              type="text" 
              placeholder="Pesquise um cliente pelo nome..." 
              onChange={event => setSearchQuery(event.target.value)} value={searchQuery}
            />
          </form>
        </div>
        
        <div className="table">
          <DataGrid rows={rowsClient} columns={columns} pageSize={8} checkboxSelection onSelectionModelChange={e => handleToSelectedClient(e)}/>
        </div>
      </main>
    </div>
  );
}