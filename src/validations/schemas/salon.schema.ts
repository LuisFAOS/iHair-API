import * as Yup from 'yup';

const joined_schemas = Yup.object().shape({
     address_number: Yup.string()
          .min(1, 'O número do local é obrigatório!')
          .max(20, "Número do local muito longo!")
          .required("O número do local é obrigatório!"),

     salon_description: Yup.string()
          .max(200, "Descrição muito longa!")
          .required("A descrição do salão é obigatória!"),

     contact_phone: Yup.string()
          .matches(new RegExp("^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$"),
               "O tel/cel não está no formato correto!")
          .required("É necessário um tel/cel de contato!"),

     name: Yup.string()
          .min(3, "Nome do salão está muito curto!")
          .max(50, "Nome do salão está muito longo!")
          .required("O nome do salão é obrigatório!"),
})

const splitted_schemas = {
     address_number: Yup.object().shape({
          value: Yup.string()
               .min(1, 'O número do local é obrigatório!')
               .max(20, "Número do local muito longo!")
               .required("O número do local é obrigatório!"),
     }),
     salon_description: Yup.object().shape({
          value: Yup.string()
               .max(200, "Descrição muito longa!")
               .required("A descrição do salão é obigatória!"),
     }),
     contact_phone: Yup.object().shape({
          value: Yup.string()
               .matches(new RegExp("^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$"),
                    "O tel/cel não está no formato correto!")
               .required("É necessário um tel/cel de contato!"),
     }),
     name: Yup.object().shape({
          value: Yup.string()
               .min(3, "Nome do salão está muito curto!")
               .max(50, "Nome do salão está muito longo!")
               .required("O nome do salão é obrigatório!"),
     })
}

export {
     joined_schemas,
     splitted_schemas
}