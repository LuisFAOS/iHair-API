import * as Yup from 'yup';

export default Yup.object().shape({
     time: Yup.string()
          .matches(new RegExp("[0-2][0-9]:[0-5][0-9]"),
               "O formato do periodo está inválido!")
})