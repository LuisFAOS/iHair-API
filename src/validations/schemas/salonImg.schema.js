import Yup from "yup"


export default Yup.object().shape({
     salonImg: Yup.string("A imagem da faixada deve ser uma string em base64!")
          .matches("^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$", "Imagem da faixada deve estar em base64!")
          .required("É obrigatório ter pelo menos 3 imagens da faixada do salão!")

})