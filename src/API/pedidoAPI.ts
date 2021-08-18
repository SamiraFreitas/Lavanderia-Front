import axios from "axios";
import baseURL from "./URLconfig";

export interface Pedido {
	id: number;
	peso: number;
	tipo: number;
	status: string;
	preco: number;
	cpf_cliente: string;
}

export interface PedidoDTO {
	peso: number;
	tipo: number;
	status: string;
	preco: number;
	cpf_cliente: string;
}

class PedidoAPI {
	getAllPedidosByLavanderia = async (cnpj: string) => {
		const response = await axios
			.get(baseURL + `/lavanderia/pedido/${cnpj}`)
			.then((res) => {
				console.log(res.data);
				return res.data as Pedido[];
			})
			.catch((err) => {
				console.log(err);
				return null;
			});

		return response;
	};

	getAllPedidosByCliente = async (cpf: string) => {
		const response = await axios
			.get(baseURL + `/cliente/pedido/${cpf}`)
			.then((res) => {
				console.log(res.data);
				return res.data as Pedido[];
			})
			.catch((err) => {
				console.log(err);
				return null;
			});

		return response;
	};

	getAllPedidosByLavanderiaAndNotEntregue = async (cnpj: string) => {
		const response = await axios
			.get(baseURL + `/lavanderia/pedido/pendente/${cnpj}`)
			.then((res) => {
				console.log(res.data);
				return res.data as Pedido[];
			})
			.catch((err) => {
				console.log(err);
				return null;
			});

		return response;
	};

	getPedido = async (id: number) => {
		const response = await axios
			.get(baseURL + `/pedido/id=${id}`)
			.then((res) => {
				console.log(res.data);
				return res.data[0] as Pedido;
			})
			.catch((err) => {
				console.log(err);
				return {} as Pedido;
			});

		return response;
	};

	updatePedido = async (body: PedidoDTO, id: number) => {
		const response = await axios
			.put(baseURL + `/pedido/up=${id}`, body)
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

	deletePedido = async (id: number) => {
		const response = await axios
			.delete(baseURL + `/pedido/del=${id}`)
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

	createPedido = async (body: PedidoDTO) => {
		const response = await axios
			.post(baseURL + "/pedido", body)
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

export default PedidoAPI