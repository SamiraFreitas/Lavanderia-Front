type TableProps = {
  type: string;
}

type Columns = {
  field: string;
  headerName: string; 
  width: number
}

export type Rows = { 
  id: number;
  cpf?: string;
  name?: string;
  phone?: string; 
  email?: string;
  requestCode?: string;
  status?: string;
}

export function useTable({type}: TableProps) {
  let columns: Columns[] = [];
  let rows: Rows[] = [];

  if(type === 'clients') {
    columns = [
      { field: 'name', headerName: 'Nome', width: 300 },
      { field: 'cpf', headerName: 'CPF', width: 250 },
      { field: 'phone', headerName: 'Telefone', width: 250 },
      { field: 'email', headerName: 'Email', width: 300}
    ];
    
    // Realizar chamada no backend de clientes.
    rows = [
      { id: 1, cpf: '156.325.478-21', name: "Pedro de Assis", phone: '(31)985412369', email: "123DeOliveira4@email.com" },
      { id: 2, cpf: '156.325.478-22', name: "Pedro de Assis", phone: '(31)985412369', email: "123DeOliveira4@email.com" },
      { id: 3, cpf: '156.325.478-23', name: "Pedro de Assis", phone: '(31)985412369', email: "123DeOliveira4@email.com" },
      { id: 4, cpf: '156.325.478-24', name: "Pedro de Assis", phone: '(31)985412369', email: "123DeOliveira4@email.com" },
      { id: 5, cpf: '156.325.478-25', name: "Pedro de Assis", phone: '(31)985412369', email: "123DeOliveira4@email.com" },
      { id: 6, cpf: '156.325.478-26', name: "Pedro de Assis", phone: '(31)985412369', email: "123DeOliveira4@email.com" },
      { id: 7, cpf: '156.325.478-27', name: "Pedro de Assis", phone: '(31)985412369', email: "123DeOliveira4@email.com" },
      { id: 8, cpf: '156.325.478-28', name: "Pedro de Assis", phone: '(31)985412369', email: "123DeOliveira4@email.com" },
      { id: 9, cpf: '156.325.478-29', name: "Pedro de Assis", phone: '(31)985412369', email: "123DeOliveira4@email.com" },
    ];

  } else if(type === 'requests') {
    columns = [
      { field: 'requestCode', headerName: 'Código', width: 400 },
      { field: 'name', headerName: 'Nome', width: 400 },
      { field: 'status', headerName: 'Status', width: 400 },
    ];
    
    // Realizar chamada no backend de clientes.
    rows = [
      { id: 1, requestCode: 'FGH2549', name: "Pedro de Assis", status: 'Lavando'},
      { id: 2, requestCode: 'FGH2549', name: "Pedro de Assis", status: 'Lavando'},
      { id: 3, requestCode: 'FGH2549', name: "Pedro de Assis", status: 'Lavando'},
      { id: 4, requestCode: 'FGH2549', name: "Pedro de Assis", status: 'Lavando'},
      { id: 5, requestCode: 'FGH2549', name: "Pedro de Assis", status: 'Lavando'},
      { id: 6, requestCode: 'FGH2549', name: "Pedro de Assis", status: 'Lavando'},
      { id: 7, requestCode: 'FGH2549', name: "Pedro de Assis", status: 'Lavando'},
      { id: 8, requestCode: 'FGH2549', name: "Pedro de Assis", status: 'Lavando'},
      { id: 9, requestCode: 'FGH2549', name: "Pedro de Assis", status: 'Lavando'},
    ]; 
  }

  return {columns, rows};
}