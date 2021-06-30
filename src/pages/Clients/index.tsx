import { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { useTable, Rows } from '../../hooks/useTable';

import './styles.scss'

export function Clients() {
  const history = useHistory();
  const { columns, rows } = useTable({type: 'clients'});
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsFiltered, setRowsFiltered] = useState<Rows[]>(rows);

  async function handleToNewClient() {
    history.push('/new/client');
  }

  function handleToSearch(event: FormEvent) {
    event.preventDefault();
    
    setRowsFiltered([]);

    if(searchQuery.trim() === '') {
      setRowsFiltered(rows);
    }
    else {
      setRowsFiltered(rows.filter((client) => {
        if(client.name){
         return client.name.includes(searchQuery);
        }
        else return false;
      }));
    }
  }

  return(
    <div id="clients-page" >
      <Header title="Clientes"/>

      <main>
        <div className="section">
          <Button onClick={handleToNewClient} isOutlined>+<b>Novo Cliente</b></Button>
          <form onSubmit={handleToSearch}>
            <input 
              type="text" 
              placeholder="Pesquise um cliente pelo nome..." 
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