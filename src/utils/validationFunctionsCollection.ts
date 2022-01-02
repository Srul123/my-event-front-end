import * as yup from "yup";


export const userSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(10).required()
});

export async function isValidName(name: string) {
    debugger;

    let schema = yup.object().shape({
        name: yup.string().min(2).max(10).matches(/^([^0-9]*)$/).matches(/^[^*|\":<>[\]{}`\\()';@&$]+$/).required(),
    });
    let isValid: boolean;
    try {
        isValid = await schema.isValid({name: name});
    } catch (e) {
        isValid = false;
    }
    return isValid;
    // return false;
}