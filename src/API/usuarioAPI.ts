import axios from "axios";
import baseURL from "./URLconfig";

interface Usuario {
	nome: string;
	senha: string;
	telefone: string;
	cpf: string;
	cnpj_lavanderia: string;
}

class UsuarioAPI {

	LogedUser!: Usuario;

	setLogedUser = (user: Usuario) => {
		this.LogedUser = user
	}

	getAllUsuarios = async () => {
		const response = await axios
			.get(baseURL + "/usuario")
			.then((res) => {
				console.log(res.data);
				return res.data as Usuario[];
			})
			.catch((err) => {
				console.log(err);
				return null;
			});

		return response;
	};

	getUsuarioByCPF = async (cpf: string) => {

		const response = await axios
			.get(baseURL + `/getusuario/${cpf}`)
			.then((res) => {
				return res.data[0];
			})
			.catch((err) => {
				console.log(err);
				return null;
			});
		
		const user: Usuario | null = response

		return user;
	};

	getAllUsuariosByCNPJ_LAVANDERIA = async (cnpj: string) => {
		const response = await axios
			.get(baseURL + `/${cnpj}`)
			.then((res) => {
				console.log(res.data);
				return res.data as Usuario[];
			})
			.catch((err) => {
				console.log(err);
				return null;
			});

		return response;
	};

	createUsuario = async (body: Usuario) => {
		const response = await axios
			.post(baseURL + "/usuario/create", body)
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

	deleteUsuario = async (cpf: string) => {
		const response = await axios
			.delete(baseURL + `/usuario/d=${cpf}`)
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

	updateUsuario = async (body: Usuario) => {
		const response = await axios
			.put(baseURL + `/usuario/up=${body.cpf}`, body)
			.then((res) => {
				console.log(res.data);
				return res.data as Usuario;
			})
			.catch((err) => {
				console.log(err);
				return null;
			});

		return response;
	};
}

export default UsuarioAPI;
