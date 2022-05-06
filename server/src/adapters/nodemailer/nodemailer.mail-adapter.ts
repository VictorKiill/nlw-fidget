import { MailAdapter, SendMailData } from "../mail.adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "05ee192cbe28e8",
        pass: "2dffcd8fa61986"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe eumesmo <soueu@feedback.com>',
            to: 'Victor Kiill <victorkiill69@gmail.com>',
            subject,
            html: body
        })
    }
}