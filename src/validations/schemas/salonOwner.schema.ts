import * as Yup from 'yup';

const splited_schemas = {
     complete_name: Yup.object().shape({
          value: Yup.string()
                    .min(5, "Nome completo muito curto!")
                    .max(100, "Nome completo muito longo!")
                    .required("O nome completo é obrigatório!"),
     }),
     email: Yup.object().shape({
          value: Yup.string()
                    .email("O formato do email não é válido!")
                    .min(7, "Email muito curto")
                    .max(150, "Email muito longo, tente outro!")
                    .required("O email é obrigatório!"),
     }),
     password: Yup.object().shape({
          value: Yup.string()
                    .min(8, "Para sua segurança, a senha deve ter no mínimo 8 caracteres!")
                    .max(150, "Senha muito longa, tente uma menor!")
                    .required("A senha é obrigatória!"),
     }),
     phone: Yup.object().shape({
          value: Yup.string()
                    .matches(new RegExp("^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$"),
                         "O tel/cel não está no formato correto!")
                    .required("O tel/cel é obrigatório!"),
     })
}

const joined_schemas = Yup.object().shape({
          complete_name: Yup.string()
               .min(5, "Nome completo muito curto!")
               .max(100, "Nome completo muito longo!")
               .required("O nome completo é obrigatório!"),
     
          email: Yup.string()
               .email("O formato do email não é válido!")
               .min(7, "Email muito curto")
               .max(150, "Email muito longo, tente outro!")
               .required("O email é obrigatório!"),
     
          password: Yup.string()
               .min(8, "Para sua segurança, a senha deve ter no mínimo 8 caracteres!")
               .max(150, "Senha muito longa, tente uma menor!")
               .required("A senha é obrigatória!"),
     
          phone: Yup.string()
               .matches(new RegExp("^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$"),
                    "O tel/cel não está no formato correto!")
               .required("O tel/cel é obrigatório!"),
})

export {
     splited_schemas,
     joined_schemas
}