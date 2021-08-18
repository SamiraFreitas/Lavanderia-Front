import { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component/dist/DataTable/types";
import ClientController from "../service/controllers/ClientController";
import RequestController from "../service/controllers/RequestController";

import ClienteAPI, { Cliente } from "../API/clienteAPI";
import PedidoAPI, { Pedido } from "../API/pedidoAPI";
import { UsuarioData } from "../pages/Login";

type TableProps = {
	type: string;
	search: string;
};



export function useTable({ type, search }: TableProps) {
	const [columns, setColumns] = useState<TableColumn[]>([]);
	const [rows, setRows] = useState<any[]>([]);

	useEffect(() => {
		const clientes = new ClienteAPI()
		const pedidos = new PedidoAPI()

		if (type === "clients") {
			setColumns([
				{
					selector: (row) => "name",
					name: "Nome",
					sortable: true,
					format: (row) => {
						return row.nome;
					},
				},
				{
					selector: (row) => "cpf",
					name: "CPF",
					sortable: true,
					format: (row) => {
						return row.cpf;
					},
				},
				{
					selector: (row) => "phone",
					name: "Telefone",
					sortable: true,
					format: (row) => {
						return row.telefone;
					},
				},
				{
					selector: (row) => "email",
					name: "Email",
					sortable: true,
					format: (row) => {
						return row.email;
					},
				},
			]);
			clientes
				.getAllClientesByLavanderia(UsuarioData.LogedUser.cnpj_lavanderia)
				.then((clients) => {
					if (clients) {
						if (search.trim() === "") {
							setRows(clients);
						} else {
							setRows(
								clients.filter((client) => {
									if (client.nome) {
										return client.nome.includes(search);
									} else return false;
								})
							);
						}
					}
				});
		} else if (type === "requests") {
			setColumns([
				{
					selector: (row) => "id",
					name: "ID",
					sortable: true,
					format: (row) => {
						return row.id_pedido;
					},
				},
				{
					selector: (row) => "cpf",
					name: "CPF",
					sortable: true,
					format: (row) => {
						return row.cpf_cliente;
					},
				},
				{
					selector: (row) => "weight",
					name: "Peso",
					sortable: true,
					format: (row) => {
						return `${row.peso} Kg`;
					},
				},
				{
					selector: (row) => "price",
					name: "Preço",
					sortable: true,
					format: (row) => {
						return `R$${row.preco}`;
					},
				},
				{
					selector: (row) => "status",
					name: "Status",
					sortable: true,
					format: (row) => {
						return row.status;
					},
				},
			]);

			pedidos.getAllPedidosByLavanderia(UsuarioData.LogedUser.cnpj_lavanderia).then((requests) => {
				if (requests) {
					if (search.trim() === "") {
						setRows(requests);
					} else {
						setRows(requests.filter((request) => {
						  if(request.cpf_cliente){
						    return request.cpf_cliente.includes(search);
						  }
						  else return false;
						}));
					}
				}
			});
		}
	}, [type, search]);

	return { columns, rows };
}
