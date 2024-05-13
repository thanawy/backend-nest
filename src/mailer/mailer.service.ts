import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationEmail({ url, user }) {
    await this.mailerService.sendMail({
      to: user.email,
      from: 'abdulrahman.nour.eldeen@gmail.com',
      subject: `thanawy.ai: ${user.displayName}, Please verify your email address ✔`,
      template: 'confirmation.email.hbs',
      context: {
        confirmationUrl: url,
        username: user.displayName,
      },
    });
  }
}
