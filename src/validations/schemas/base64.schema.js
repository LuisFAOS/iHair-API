import Yup from "yup"

export default Yup.object().shape({
        imgInBase64: Yup.string("Todas as imagens devem ser uma string base64!")
                .matches("^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$", 
                    "Todas as imagens devem estar em base64!")
                .required("Todas as imagens são obrigatório!")
})