import { useEffect, useState } from 'react';
import { TableColumn } from 'react-data-table-component/dist/DataTable/types';
import ClientController from '../service/controllers/ClientController';
import RequestController from '../service/controllers/RequestController';

type TableProps = {
  type: string;
  search: string;
}

export type Row = { 
  id: string;
  name?: string;

  cpf?: string;
  phone?: string; 
  email?: string;

  weight?: number;
  price?: number;
  isPaid?: boolean | string;
  status?: string;
}

export function useTable({type, search}: TableProps) {
  const [columns, setColumns] = useState<TableColumn[]>([]);
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    if(type === 'clients') {
      setColumns([
        { selector: row => 'name', name: 'Nome', sortable: true, format: row => {return row.name.toString()}},
        { selector: row => 'cpf', name: 'CPF', sortable: true, format: row => {return row.cpf.toString()}},
        { selector: row => 'phone', name: 'Telefone', sortable: true, format: row => {return row.phone.toString()}},
        { selector: row => 'email', name: 'Email', sortable: true, format: row => {return row.email.toString()}}
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
        { selector: row => 'date', name: 'Data', sortable: true, format: row => {return row.date.toString()}},
        { selector: row => 'name', name: 'Nome', sortable: true, format: row => {return row.name.toString()}},
        { selector: row => 'weight', name: 'Peso', sortable: true, format: row => {return row.weight.toString().concat(' Kg')}},
        { selector: row => 'price', name: 'Preço', sortable: true, format: row => {return row.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}},
        { selector: row => 'isPaid', name: 'Pago', sortable: true, format: row => {return row.isPaid ? 'Sim' : 'Não'}},
        { selector: row => 'status', name: 'Status', sortable: true, format: row => {
          switch (row.status) {
            case 'queue':
              return 'Na Fila';
            case 'washing':
              return 'Lavando';
            case 'finished':
              return 'Finalizado';
          }
        }}
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