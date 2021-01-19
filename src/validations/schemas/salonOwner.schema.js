import Yup from "yup"

export default Yup.object().shape({
     completeName: Yup.string("O nome completo deve ser do tipo string!")
          .min(5, "Nome completo muito curto!")
          .max(100, "Nome completo muito longo!")
          .required("O nome completo é obrigatório!"),

     email: Yup.string("O email deve ser do tipo string!")
          .email("O formato do email não é válido!")
          .min(7, "Email muito curto")
          .max(150, "Email muito longo, tente outro!")
          .required("O email é obrigatório!"),

     password: Yup.string("A senha deve ser do tipo string!")
          .min(8, "Para sua segurança, a senha deve ter no mínimo 8 caracteres!")
          .max(150, "Senha muito longa, tente uma menor!")
          .required("A senha é obrigatória!"),

     phone: Yup.string("O tel/cel deve ser uma string!")
          .matches("^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$",
               "O tel/cel não está no formato correto!")
          .required("O tel/cel é obrigatório!"),

     profileImgInBase64: Yup.string("A imagem de perfil deve ser uma string em base64!")
          .matches("^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$", "A imagem do proprietário deve estar em base64!")
          .required("A imagem de perfil é obrigatória!"),

     certificateImgInBase64: Yup.string("A imagem do certificad deve ser uma string em base64")
          .matches("^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$", "A imagem do certificado deve estar em base64!")
})