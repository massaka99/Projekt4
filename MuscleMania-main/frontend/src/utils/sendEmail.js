import emailjs from 'emailjs-com';

const service_Id = 'service_l5u4dzd';
const template_Id = 'template_k76teyg';
const publicKey = 'iH8mVPL7nCR00QAU_';

const sendEmail = (userName, FromName, ToEmail, message) => {
    return new Promise((resolve, reject) => {
    //hvis username er null bruges Buddy osv.
    const finalUsername = userName ? userName : 'Buddy';
    const finalFromname = FromName ? FromName : 'MuscleMania';
    const finalToEmail = ToEmail ? ToEmail : 'musclemania.org@gmail.com';

    const templateParams = {
        to_name: finalUsername,
        from_name : finalFromname,
        to_email : finalToEmail,
        message : message,
    };

    emailjs.send(service_Id, template_Id, templateParams, publicKey)
        .then((response) => {
            console.log('SUCCESS! email sent', response.status, response.text);
            resolve(response);
        }, (error) => {
            console.log('FAILED... to send email', error);
            reject(error);
        });

    });
};

export default sendEmail;
