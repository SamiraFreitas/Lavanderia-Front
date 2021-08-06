import axios from "axios";
import baseURL from './URLconfig'


interface Usuario {
	nome: string;
	senha: string;
	telefone: string;
	cpf: string;
	cnpj_lavanderia: string;
}

class UsuarioAPI {
	getAllUsuarios = async () => {
		const response = await axios
			.get(baseURL + '/usuario')
			.then((res) => {
				console.log(res.data);
				return res.data as Usuario[];
			})
			.catch((err) => console.log(err));

		return response;
	};

}

export {}

export default UsuarioAPI;
