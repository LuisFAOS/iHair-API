import Yup from "yup"

export default Yup.object().shape({
     workPeriod: Yup.string("O periodo deve ser uma string!")
          .matches("[0-9]{2}:[0-9]{2} - [0-9]{2}:[0-9]{2}",
               "O formato do periodo está inválido!")
})