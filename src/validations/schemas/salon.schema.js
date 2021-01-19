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

     salonName: Yup.string("O nome do salão deve ser uma string!")
          .min(3, "Nome do salão está muito curto!")
          .max(50, "Nome do salão está muito longo!"),

     bannerInBase64: Yup.string("O banner do salão deve ser uma string em base64!")
          .required("O banner do salão é obrigatório!")
})