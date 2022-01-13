import * as Yup from "yup";


export async function isValidName(name: string): Promise<boolean> {

    let schema = Yup.object().shape({
        name: Yup.string().min(2).max(10).matches(/^([^0-9]*)$/).matches(/^[^*|\":<>[\]{}`\\()';@&$]+$/).required(),
    });
    let isValid: boolean;
    try {
        isValid = await schema.isValid({name: name});
    } catch (e) {
        isValid = false;
    }
    return isValid;
}

export async function isValidEmail(email: string): Promise<boolean> {
    let schema = Yup.object().shape({
        email: Yup.string().email().required()
    });
    let isValid: boolean;
    try {
        isValid = await schema.isValid({email: email});
    } catch (e) {
        isValid = false;
    }
    return isValid;
}

export async function isValidPassword(password: string): Promise<boolean> {
    let schema = Yup.object().shape({
        password: Yup.string().min(4).max(10).required()
    });
    let isValid: boolean;
    try {
        isValid = await schema.isValid({password: password});
    } catch (e) {
        isValid = false;
    }
    return isValid;
}

export function isValidPhoneNumberIsrael(phoneNumber: string): boolean {
    if (phoneNumber.length !== 10 || phoneNumber.charAt(0) !== "0" || phoneNumber.charAt(1) !== "5" || !/^\d+$/.test(phoneNumber)) {
        return false;
    }
    return true;
}

export function isValidDate(date: string): boolean {
    const eventDate = new Date(date);
    const currentDate =  new Date(Date.now());
    if (eventDate <= currentDate){
        return false;
    }
    return true;
}