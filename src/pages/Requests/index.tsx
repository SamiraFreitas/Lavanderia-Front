import { useHistory } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import { DataGrid } from '@material-ui/data-grid';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { useTable, Rows } from '../../hooks/useTable';

import './styles.scss'

export function Requests() {
  const history = useHistory();
  const { columns, rows } = useTable({type: 'requests'});
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsFiltered, setRowsFiltered] = useState<Rows[]>(rows);

  async function handleToNewRequest() {
    history.push('/new/request');
  }

  function handleToSearch(event: FormEvent) {
    event.preventDefault();
    
    setRowsFiltered([]);

    if(searchQuery.trim() === '') {
      setRowsFiltered(rows);
    }
    else {
      setRowsFiltered(rows.filter((request) => {
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
          <DataGrid rows={rowsFiltered} columns={columns} pageSize={9} checkboxSelection />
        </div>
      </main>
    </div>
  );
}