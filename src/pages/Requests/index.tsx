import { useHistory } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import { DataGrid } from '@material-ui/data-grid';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { useTable, RowRequest } from '../../hooks/useTable';

import './styles.scss'

export function Requests() {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const { columns, rowsRequest } = useTable({type: 'requests', search: searchQuery});
  const [rowsFiltered, setRowsFiltered] = useState<RowRequest[]>(rowsRequest);

  async function handleToNewRequest() {
    history.push('/new/request');
  }

  function handleToSearch(event: FormEvent) {
    event.preventDefault();
    
    setRowsFiltered([]);

    if(searchQuery.trim() === '') {
      setRowsFiltered(rowsRequest);
    }
    else {
      setRowsFiltered(rowsRequest.filter((request: RowRequest) => {
        if(request.requestCode){
         return request.requestCode.includes(searchQuery);
        }
        else return false;
      }));
    }
  }

  return(
    <div id="requests-page" >
      <Header title="Pedidos"/>
      
      <main>
        <div className="section">
          <Button onClick={handleToNewRequest} isOutlined>+<b>Novo Pedido</b></Button>
          <form onSubmit={handleToSearch}>
            <input 
              type="text" 
              placeholder="Pesquise um pedido pelo código..." 
              onChange={event => setSearchQuery(event.target.value)} value={searchQuery}
            />
            <Button type="submit">Pesquisar</Button>
          </form>
        </div>
        
        <div className="table">
          <DataGrid rows={rowsRequest} columns={columns} pageSize={9} checkboxSelection />
        </div>
      </main>
    </div>
  );
}