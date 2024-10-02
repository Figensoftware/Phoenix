import * as yup from 'yup';


export const registerPageSchema = yup.object().shape({
    username: yup.string().required("Please enter your user name."),
    password: yup.string().required("Please enter your password.")
})






