import { useEffect, useState } from 'react';
import ClientController from '../service/controllers/ClientController';

type TableProps = {
  type: string;
  search: string;
}

type Columns = {
  field: string;
  headerName?: string;
  description?: string;
  width?: number;
  flex?: number;
  hide?: boolean;
  sortable?: boolean;
  resizable?: boolean;
  editable?: boolean;
  hideSortIcons?: boolean;
  disableColumnMenu?: boolean;
  filterable?: boolean;
}

export type RowClient = { 
  id: string;
  cpf?: string;
  name?: string;
  phone?: string; 
  email?: string;
}

export type RowRequest = { 
  id: number;
  name?: string;
  requestCode?: string;
  status?: string;
}

export function useTable({type, search}: TableProps) {
  const [columns, setColumns] = useState<Columns[]>([]);
  const [rowsClient, setRowsClient] = useState<RowClient[]>([]);
  const [rowsRequest, setRowsRequest] = useState<RowRequest[]>([]);

  useEffect(() => {
    if(type === 'clients') {
      setColumns([
        { field: 'name', headerName: 'Nome', width: 300 },
        { field: 'cpf', headerName: 'CPF', width: 250 },
        { field: 'phone', headerName: 'Telefone', width: 250 },
        { field: 'email', headerName: 'Email', width: 300}
      ]);
      ClientController.read().then((clients) => { if(clients){
        if(search.trim() === '') {
          setRowsClient(clients);
        }
        else {
          setRowsClient(clients.filter((client) => {
            if(client.name){
              return client.name.includes(search);
            }
            else return false;
          }));
        }
      }});
    } 
    else if(type === 'requests') {
      setColumns([
        { field: 'requestCode', headerName: 'Código', width: 400 },
        { field: 'name', headerName: 'Nome', width: 400 },
        { field: 'status', headerName: 'Status', width: 400 },
      ]);
      
      setRowsRequest([
        { id: 1, requestCode: 'FGH2549', name: "Pedro de Assis", status: 'Lavando'},
        { id: 2, requestCode: 'FGH2549', name: "Pedro de Assis", status: 'Lavando'},
        { id: 3, requestCode: 'FGH2549', name: "Pedro de Assis", status: 'Lavando'},
        { id: 4, requestCode: 'FGH2549', name: "Pedro de Assis", status: 'Lavando'},
        { id: 5, requestCode: 'FGH2549', name: "Pedro de Assis", status: 'Lavando'},
        { id: 6, requestCode: 'FGH2549', name: "Pedro de Assis", status: 'Lavando'},
        { id: 7, requestCode: 'FGH2549', name: "Pedro de Assis", status: 'Lavando'},
        { id: 8, requestCode: 'FGH2549', name: "Pedro de Assis", status: 'Lavando'},
        { id: 9, requestCode: 'FGH2549', name: "Pedro de Assis", status: 'Lavando'},
      ]); 
    }
  }, [type, search]);

  return {columns, rowsClient, rowsRequest};
}