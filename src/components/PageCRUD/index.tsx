import { useState } from 'react';
import { Row, useTable } from '../../hooks/useTable';

import { DataGrid, GridSelectionModelChangeParams } from '@material-ui/data-grid';
import { Button } from '../Button';

import './styles.scss';

type PageCRUDProps = {
  title: string;
  handleToNew: () => {};
  handleToEdit: () => {};
  handleToRemove: () => {};
  setRowsSelected: React.Dispatch<React.SetStateAction<Row[]>>
}
export function PageCRUD({title, handleToNew, handleToEdit, handleToRemove, setRowsSelected}: PageCRUDProps) {

  const [searchQuery, setSearchQuery] = useState('');
  const { columns, rows } = useTable({type: title, search: searchQuery});

  async function handleToSelected(elements: GridSelectionModelChangeParams) {
    const selected = new Set(elements.selectionModel);
    setRowsSelected(rows.filter((element: Row) => selected.has(element.id)));
  }

  return(
    <div id="CRUD-Page" >
      <main>
        <div className="section">
          <div>
            <Button onClick={handleToNew} isOutlined >
              ✛<b>Novo {title === 'clients' ? 'Cliente' : 'Pedido'}</b>
            </Button>
            <Button onClick={handleToEdit} isOutlined >
              ✎<b>Editar {title === 'clients' ? 'Cliente' : 'Pedido'}</b>
            </Button>
            <Button onClick={handleToRemove} isOutlined >
              ✕<b>Excluir {title === 'clients' ? 'Cliente' : 'Pedido'}</b>
            </Button>
          </div>
          <input 
              type="text" 
              placeholder={`Pesquise um ${title === 'clients' ? 'cliente' : 'pedido'} pelo nome...`} 
              onChange={event => setSearchQuery(event.target.value)} value={searchQuery}
            />
        </div>
        
        <div className="table">
          <DataGrid rows={rows} columns={columns} pageSize={8} checkboxSelection onSelectionModelChange={e => handleToSelected(e)}/>
        </div>
      </main>
    </div>
  );
}