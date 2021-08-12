import axios from "axios";
import baseURL from "./URLconfig";

interface Custos {
	despesa: number;
	custo_mao: number;
	custo_maquina: number;
	custo_seco: number;
	lucro_esperado: number;
	cnpj_lavanderia: string;
}

class CustosAPI {
	getCustos = async (cnpj: string) => {
		const response = await axios
			.get(baseURL + `/getcustos/${cnpj}`)
			.then((res) => {
				console.log(res.data);
				return res.data as Custos[];
			})
			.catch((err) => {
				console.log(err);
				return null;
			});

		return response;
	};

	insertCustos = async (body: Custos) => {
		const response = await axios
			.post(baseURL + `/custos`, body)
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

	updateCustos = async (body: Custos) => {
		const response = await axios
			.put(baseURL + "/custos/update", body)
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

	deleteCustos = async (cnpj: string) => {
		const response = await axios
			.delete(baseURL + `/custos/del=${cnpj}`)
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

export default CustosAPI