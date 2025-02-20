const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailService {
    constructor() {
        this.auth = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSKEY
            }
        });
    }

    async sendEmail(body) {
        try {
            console.log(body);
            
            const mailOptions = {
                from: process.env.EMAIL, // Ensure this is correct
                to: body.to,
                subject: body.subject,
                html: body.htmlVal
            };
            const info = await this.auth.sendMail(mailOptions);
            console.log(`Email sent: ${info.messageId}`);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error(`Error sending email: ${error.message}`);
            throw new Error(`Failed to send email: ${error.message}`);
        }
    }
}

// ✅ Export an instance of EmailService, so no need to instantiate it elsewhere
module.exports = new EmailService();
