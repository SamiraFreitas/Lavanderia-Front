import { useEffect, useState } from 'react';
import ClientController from '../service/controllers/ClientController';
import RequestController from '../service/controllers/RequestController';

type TableProps = {
  type: string;
  search: string;
}

type Column = {
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

export type Row = { 
  id: string;
  name?: string;

  cpf?: string;
  phone?: string; 
  email?: string;

  weight?: number;
  price?: number;
  isPaid?: boolean;
  status?: string;
}

export function useTable({type, search}: TableProps) {
  const [columns, setColumns] = useState<Column[]>([]);
  const [rows, setRows] = useState<Row[]>([]);

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
          setRows(clients);
        }
        else {
          setRows(clients.filter((client) => {
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
        { field: 'name', headerName: 'Nome', width: 240 },
        { field: 'weight', headerName: 'Peso (Kg)', width: 240 },
        { field: 'price', headerName: 'Preço (R$)', width: 240 },
        { field: 'isPaid', headerName: 'Pago', width: 240 },
        { field: 'status', headerName: 'Status', width: 240 },
      ]);
      
      RequestController.read().then((requests) => { if(requests){
        if(search.trim() === '') {
          setRows(requests);
        }
        else {
          setRows(requests.filter((request) => {
            if(request.name){
              return request.name.includes(search);
            }
            else return false;
          }));
        }
      }});
    }
  }, [type, search]);

  return {columns, rows};
}