require('dotenv').config();
import Mailgun from 'mailgun-js';

const  mailGunClient = new Mailgun({
    apiKey : process.env.MAILGUN_API_KEY || "",
    domain : "sandbox0280cc5f004244ad89b8a0938a2b70c7.mailgun.org"
})

const sendEmail = (to:string, subject:string, html:string) =>{

    const emailData = {
        from : "soyou6358@gmail.com",
        to,
        subject,
        html
    }
    return mailGunClient.messages().send(emailData)
}

export const sendVerificationEmail = (fullName: string, key:string)=>{
    const to = "soyou6358@gmail.com"
    const emailSubject = `Hello! ${fullName}, please verify your email`;
    const emailBody = `Verify your email by clicking <a href="http://naver.com/verification/${key}">here</a>`;

    return sendEmail(to, emailSubject, emailBody);
}