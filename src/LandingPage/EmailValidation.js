const EmailValidation = (email)=>{
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email);
}
export default EmailValidation