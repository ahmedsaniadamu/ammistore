
export const validate = values => {
    const errors =  {} ;
    if( !values.country ) errors.country = 'Error! country field cannot be empty'
    if( !values.state ) errors.state = 'Error! state field cannot be empty'
    if( !values.city ) errors.city = 'Error! city field cannot be empty'
    if( !values.postalCode ) errors.postalCode = 'Error! postal code field cannot be empty'
    if( !values.address ) errors.address = 'Error! address field cannot be empty'
    return errors ;
}