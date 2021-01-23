import Yup from "yup"

export default Yup.object().shape({
	name: Yup.string("O nome tem que ser do tipo STRING!")
		.min(3, "Nome de usuário muito curto!")
		.max(40, "Nome de usuário  muito longo!")
		.required("O nome de usuário é obrigatório!"),

	password: Yup.string("A senha tem que ser do tipo STRING!")
		.min(6, "A senha tem que ter no mínimo 6 dígitos!")
		.max(40, "Senha muito longa!")
		.required("A senha é obrigatória!"),

	CEP: Yup.string("O CEP tem que ser do tipo STRING!")
		.required("O seu CEP é obrigatório!"),

	email: Yup.string("O email tem que ser do tipo STRING!")
		.email("O email está com o formato inválido!")
		.required("O email é obrigatório!")
})