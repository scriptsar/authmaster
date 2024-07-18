
import { signInValidationSchema, signUpValidationSchema } from "./auth.validation.js";


// current working
export const signUpValidatorMiddleware = async (req, res, next) => {
    try {
        console.log('in signup middleware ', req.body)
        await signUpValidationSchema.validateAsync(req.body)
        next()
    } catch (error) {
        console.log('in signup middlware error');
        console.log(error)
        throw new Error(error)


        // next(error)  
    }
}

export const signInValidatorMiddleware = async (req, res, next) => {
    // console.log('the midlleware for sign field check')
    // console.log('in signin  middleware', req.body);
    console.log('email is', req.body.email)
    try {
        const validation = await signInValidationSchema.validateAsync(req.body)
        console.log('the validation is:', validation)
        next()
    } catch (error) {
        console.log('in joi middleware error', error)
        next(error)

    }

}
