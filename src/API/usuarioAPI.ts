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
	getAllUsuarios = async () => {
		const response = await axios
			.get(baseURL + "/usuario")
			.then((res) => {
				console.log(res.data);
				return res.data as Usuario[];
			})
			.catch((err) => console.log(err));

		return response;
	};

	getUsuarioByCPF = async (cpf: string) => {
		const response = await axios
			.get(baseURL + `/getusuario/${cpf}`)
			.then((res) => {
				console.log(res.data);
				return res.data as Usuario;
			})
			.catch((err) => {
				console.log(err)
				return null
			});

		return response;
	};

	getAllUsuariosByCNPJ_LAVANDERIA = async (cnpj: string) => {
		const response = await axios
			.get(baseURL + `/${cnpj}`)
			.then((res) => {
				console.log(res.data);
				return res.data as Usuario[];
			})
			.catch((err) => {
				console.log(err)
				return null
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
				console.log(err)
				return null
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
				console.log(err)
				return null
			});

		return response;
	};

	updateUsuario = async (body: Usuario) => {
		const response = await axios
			.put(baseURL + `/usuario/up=${body.cpf}`, body)
			.then((res) => {
				console.log(res.data);
				return res.data as Usuario
			})
			.catch((err) => {
				console.log(err)
				return null
			})
		
		return response;
	}

	doLogin = async (cpf: string, password: string) => {
		
		const user = await this.getUsuarioByCPF(cpf)

		if (user !== null) {
			if (user.senha === password) {
				console.log('Login success')
				return [user, true]
			} else {
				return [null, false]
			}
		} else {
			return [null, false]
		}
	}
}

export default UsuarioAPI;
