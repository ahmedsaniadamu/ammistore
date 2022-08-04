// sign up validation function.
export const validate = values => {
    const errors = {};
       //name validation
        if (!values.name)  errors.name = 'Error! your name is required'
        else if (values.name.length > 50) errors.name = 'Must be 50 characters or less'                                                    
        //email validation
        if (!values.email) errors.email = 'Error! your email address is required';
        else if (values.email.length > 150) errors.email = 'Must be 150 characters or less'
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        //contact number validation
        if (!values.number) errors.number = 'Error! your contact number is required'
        else if (values.number.toString().length > 15) {
            errors.number = 'Must be 15 characters or less';
        } 
        // password validation
        if (!values.password) errors.password = 'Error! your password is required'
        else if (values.password.length > 15) errors.password = 'Must be 15 characters or less';
        else if ( values.password.length < 8 ) errors.password = 'Error! password must not be less than 8 characters'
        //confirm password validation
        if (!values.confirmPassword) errors.confirmPassword = 'Error! your password is required';
        else if (values.password !== values.confirmPassword) errors.confirmPassword = 'Error! two passwords mismatch.'
        else if (values.confirmPassword.length > 15) errors.confirmPassword = 'Must be 15 characters or less'

    return errors;
}