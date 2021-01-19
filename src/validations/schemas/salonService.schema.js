import Yup from "yup"


export default Yup.object().shape({
     name: Yup.string("O nome do serviço deve ser uma string!")
          .min(3, "Nome de serviço muito curto!")
          .max(50, "Nome de serviço muito longo!")
          .required("O nome de serviço é obrigatório!"),

     description: Yup.string("A descrição do serviço deve ser uma string!")
          .max(150, "Descrição do serviço muito longa!"),

     price: Yup.number("O preço do serviço deve ser um número!")
          .positive("Só é aceito número positivo para precificação!")
          .required("O preço do serviço é obrigatório!"),

     avgTime: Yup.number("O tempo médio de serviço deve ser uma string!")
          .positive("Só é aceito número positivo como medida de tempo!")
          .integer("Só e aceito número inteiro como medida de tempo!")
          .required("O tempo médio de serviço é obrigatório!")

})