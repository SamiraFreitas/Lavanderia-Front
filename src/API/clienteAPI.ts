import axios from "axios";
import baseURL from "./URLconfig";

interface Cliente {
	nome: string;
	cpf: string;
	telefone: string;
	email: string;
	cnpj_lavanderia: string;
}

class ClienteAPI {
	getAllClientesByLavanderia = async (cnpj: string) => {
		const response = await axios
			.get(baseURL + `/clientes/${cnpj}`)
			.then((res) => {
				console.log(res.data);
				return res.data as Cliente[];
			})
			.catch((err) => {
				console.log(err);
				return null;
			});

		return response;
	};

	getCliente = async (cpf: string) => {
		const response = await axios
			.get(baseURL + `/cliente/${cpf}`)
			.then((res) => {
				console.log(res.data);
				return res.data as Cliente;
			})
			.catch((err) => {
				console.log(err);
				return null;
			});

		return response;
	};

	updateCliente = async (cpf: string, body: Cliente) => {
		const response = await axios
			.put(baseURL + `/cliente/up=${cpf}`, body)
			.then((res) => {
				console.log(res.data);
				return res.data as string;
			})
			.catch((err) => {
				console.log(err);
				return null;
			});

		return response;
	};

	deleteCliente = async (cpf: string) => {
		const response = await axios
			.delete(baseURL + `/cliente/del=${cpf}`)
			.then((res) => {
				console.log(res.data);
				return res.data as string;
			})
			.catch((err) => {
				console.log(err);
				return null;
			});

		return response;
	};

	createCliente = async (body: Cliente) => {
		const response = await axios
			.post(baseURL + `/cliente`, body)
			.then((res) => {
				console.log(res.data);
				return res.data as string;
			})
			.catch((err) => {
				console.log(err);
				return null;
			});

		return response;
	};
}

export default ClienteAPI;
