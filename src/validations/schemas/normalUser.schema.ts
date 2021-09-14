import * as Yup from 'yup';

export default Yup.object().shape({
	name: Yup.string()
		.min(3, "Nome de usuário muito curto!")
		.max(40, "Nome de usuário  muito longo!")
		.required("O nome de usuário é obrigatório!"),

	password: Yup.string()
		.min(6, "A senha tem que ter no mínimo 6 dígitos!")
		.max(40, "Senha muito longa!")
		.required("A senha é obrigatória!"),

	CEP: Yup.string()
		.required("O seu CEP é obrigatório!"),

	email: Yup.string()
		.email("O email está com o formato inválido!")
		.required("O email é obrigatório!")
})