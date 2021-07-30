import { useState } from 'react';
import { Row, useTable } from '../../hooks/useTable';

import DataTable, { RowRecord } from "react-data-table-component";
import { Button } from '../Button';

import './styles.scss';

type PageCRUDProps = {
  title: string;
  handleToNew: () => {};
  handleToEdit: () => {};
  handleToRemove: () => {};
  setRowsSelected: React.Dispatch<React.SetStateAction<Row[]>>
}

type SelectedRows = {
  allSelected: boolean; 
  selectedCount: number; 
  selectedRows: RowRecord[];
}

export function PageCRUD({title, handleToNew, handleToEdit, handleToRemove, setRowsSelected}: PageCRUDProps) {

  const [searchQuery, setSearchQuery] = useState('');
  const { columns, rows } = useTable({type: title, search: searchQuery});
  const customStyles = {
    headCells: {
      style: {
        fontSize: '1.2rem',
        fontWeight: 500,
        color: '#000000',
        minHeight: '4rem',
      }
    },
    rows: {
      style: {
        fontSize: '1rem',
        color: '#444444',
        backgroundColor:'#FFFFFF',
        minHeight: '3rem',
      },
      selectedHighlightStyle: {
        '&:nth-of-type(n)': {
          backgroundColor: '#D1D1D1',
        },
      },
    }
  }

  async function handleToSelected(elements: SelectedRows) {
    const selected = new Set(elements.selectedRows);
    setRowsSelected(rows.filter((element: Row) => selected.has(element)));
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
          <DataTable 
            columns={columns}
            data={rows}
            pagination
            highlightOnHover
            selectableRowsHighlight
            selectableRows
            onSelectedRowsChange={e => handleToSelected(e)}
            responsive
            customStyles={customStyles}
          />
        </div>
      </main>
    </div>
  );
}