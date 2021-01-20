import Yup from "yup"


export default Yup.object().shape({
     addressNumber: Yup.string("O número do local deve ser uma string!")
          .max(20, "Número do local muito longo!")
          .required("O número do local é obrigatório!"),

     salonDescription: Yup.string("A descrição do salão deve ser uma string!")
          .max(200, "Descrição muito longa!")
          .required("A descrição do salão é obigatória!"),

     contactPhone: Yup.string("O tel/cel deve ser uma string!")
          .matches("^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$",
               "O tel/cel não está no formato correto!"),

     name: Yup.string("O nome do salão deve ser uma string!")
          .min(3, "Nome do salão está muito curto!")
          .max(50, "Nome do salão está muito longo!")
          .required("O nome do salão é obrigatório!"),

     bannerImgInBase64: Yup.string("O banner do salão deve ser uma string em base64!")
          .matches("^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$", "O banner do salão deve estar em base64!")
          .required("O banner do salão é obrigatório!")
})