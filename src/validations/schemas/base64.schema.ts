import * as Yup from 'yup';

export default Yup.object().shape({
        file_base64: Yup.string()
                .matches(new RegExp("^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$"), 
                    "Todas os arquivos devem estar em base64!")
                .required("Todas os arquivos são obrigatório!")
})