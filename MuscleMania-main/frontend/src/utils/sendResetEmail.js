import emailjs from 'emailjs-com';

const service_Id = 'service_l5u4dzd';
const template_Id = 'template_y9a72no';
const publicKey = 'iH8mVPL7nCR00QAU_';

const sendToken = (email, _Token) => {
    const templateParams = {
        to_email: email,
        token: _Token,
        from_name: "MuscleMania",
    };

    return emailjs.send(service_Id, template_Id, templateParams, publicKey)
        .then((response) => {
            console.log('SUCCESS! email sent', response.status, response.text);
            return response; 
        })
        .catch((error) => {
            console.log('FAILED... to send email', error);
            throw error; 
        });
};

export default sendToken;
