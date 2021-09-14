import * as Yup from 'yup';

export default Yup.object().shape({
    general: Yup.number()
        .positive("Todas as avaliações devem ser um número positivo!")
        .max(5, "O nota máxima de todas as avaliações é 5.0!")
        .required("A avaliação geral é obrigatória!"),
    
    comment: Yup.string()
        .max(200, "Seu comentário excedeu o limite de 200 caracteres!"),

    numeric_ratings: Yup.number()
        .positive("Todas as avaliações devem ser um número positivo!")
        .max(5, "O nota máxima de todas as avaliações é 5.0!")
})