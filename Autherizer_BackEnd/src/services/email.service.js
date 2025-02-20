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
            const mailOptions = {
                from: process.env.EMAIL, // Ensure this is correct
                to: body.to,
                subject: body.subject,
                html: body.htmlVal
            };
            const info = await this.auth.sendMail(mailOptions);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            throw new Error(`Failed to send email: ${error.message}`);
        }
    }
}

module.exports = new EmailService();
