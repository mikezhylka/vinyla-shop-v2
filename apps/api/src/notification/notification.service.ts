import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '@src/database/database.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly mailerService: MailerService,
    private databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {}

  async createVerificationCode(email: string) {
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    if (this.configService.get('IS_DEMO_MODE') === 'true') {
      await this.databaseService.registrationVerificationCode.create({
        data: {
          email,
          code: '000000',
          expiresAt,
        },
      });

      return {
        success: true,
        message: 'Demo mode: use code 000000 to verify.',
      };
    }

    let code = '';

    for (let i = 0; i < 6; i++) {
      const int = Math.floor(Math.random() * 10);

      code += int.toString();
    }

    const result =
      await this.databaseService.registrationVerificationCode.create({
        data: {
          email,
          code,
          expiresAt,
        },
      });

    return { success: true, code: result.code };
  }

  async sendSuccessfullAuthEmail(email: string, name: string) {
    const formattedDate = new Date().toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    await this.mailerService.sendMail({
      to: email,
      subject: 'Vinyla Shop - Successful Login',
      html: `
        <div style="background-color: #111111; padding: 40px 20px; font-family: 'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #fcfcfc; -webkit-font-smoothing: antialiased;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 30px; background-color: #201f1f; border-radius: 16px; border: 1px solid #474747; box-shadow: 0 8px 24px rgba(0,0,0,0.8);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Vinyla Shop</h1>
            </div>
            <p style="font-size: 18px; color: #c6c6c6; line-height: 1.6; margin-bottom: 24px;">Hello, <strong style="color: #ffffff;">${name}</strong>!</p>
            <p style="font-size: 16px; color: #c6c6c6; line-height: 1.6; margin-bottom: 32px;">
              We noticed a successful login to your account. If this was you, you can safely ignore this email.
            </p>
            <div style="background-color: #131313; border: 1px solid #353534; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
              <h2 style="margin-top: 0; font-size: 20px; color: #ffffff; margin-bottom: 16px;">Login Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #a5a5a5; font-size: 16px;">Time</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 16px; text-align: right; font-weight: 600;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #a5a5a5; font-size: 16px;">Account</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 16px; text-align: right; font-weight: 600;">${email}</td>
                </tr>
              </table>
            </div>
            <p style="font-size: 14px; color: #a5a5a5; line-height: 1.6; margin-bottom: 40px; text-align: center;">
              If you didn't authorize this login, please secure your account immediately or contact our support team.
            </p>
            <hr style="border: none; border-top: 1px solid #353534; margin-bottom: 24px;" />
            <div style="text-align: center;">
              <p style="font-size: 12px; color: #5f5f5f; margin: 0;">&copy; ${new Date().getFullYear()} Vinyla Shop. All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
    });
  }

  async sendVerificationEmail(email: string) {
    const existingCode =
      await this.databaseService.registrationVerificationCode.findFirst({
        where: {
          email: email,
        },
      });

    // clean previous
    if (existingCode) {
      await this.databaseService.registrationVerificationCode.delete({
        where: { email: email },
      });
    }

    const code = await this.createVerificationCode(email);

    await this.mailerService.sendMail({
      to: email,
      subject: `Vinyla Shop - Your Verification Code`,
      html: `
        <div style="background-color: #111111; padding: 40px 20px; font-family: 'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #fcfcfc; -webkit-font-smoothing: antialiased;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 30px; background-color: #201f1f; border-radius: 16px; border: 1px solid #474747; box-shadow: 0 8px 24px rgba(0,0,0,0.8);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Vinyla Shop</h1>
            </div>
            <p style="font-size: 18px; color: #c6c6c6; line-height: 1.6; margin-bottom: 24px;">Hello!</p>
            <p style="font-size: 16px; color: #c6c6c6; line-height: 1.6; margin-bottom: 32px;">
              Please use the verification code below to confirm your email address:
            </p>
            <div style="text-align: center; margin-bottom: 32px;">
              <div style="display: inline-block; background-color: #131313; border: 1px solid #353534; border-radius: 12px; padding: 16px 32px;">
                <span style="font-size: 40px; font-weight: 700; color: #ffffff; letter-spacing: 8px;">${code.code}</span>
              </div>
            </div>
            <p style="font-size: 14px; color: #a5a5a5; line-height: 1.6; margin-bottom: 40px; text-align: center;">
              This code will expire in <strong style="color: #ffffff;">15 minutes</strong>.<br/>
              If you didn't request this code, you can safely ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #353534; margin-bottom: 24px;" />
            <div style="text-align: center;">
              <p style="font-size: 12px; color: #5f5f5f; margin: 0;">&copy; ${new Date().getFullYear()} Vinyla Shop. All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
      context: { code },
    });

    return {
      success: true,
      message: code.message
        ? code.message
        : 'We have sent a 6-digit code to your email address. Please enter it below to continue.',
    };
  }
  async sendOrderConfirmationEmail(
    email: string,
    name: string,
    orderId: number,
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject: `Vinyla Shop - Order Confirmation #${orderId}`,
      html: `
        <div style="background-color: #111111; padding: 40px 20px; font-family: 'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #fcfcfc; -webkit-font-smoothing: antialiased;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 30px; background-color: #201f1f; border-radius: 16px; border: 1px solid #474747; box-shadow: 0 8px 24px rgba(0,0,0,0.8);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Vinyla Shop</h1>
            </div>
            <p style="font-size: 18px; color: #c6c6c6; line-height: 1.6; margin-bottom: 24px;">Hello, <strong style="color: #ffffff;">${name}</strong>!</p>
            <p style="font-size: 16px; color: #c6c6c6; line-height: 1.6; margin-bottom: 32px;">
              Thank you for your purchase! Your order has been successfully placed and is now being processed.
            </p>
            <div style="background-color: #131313; border: 1px solid #353534; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
              <h2 style="margin-top: 0; font-size: 20px; color: #ffffff; margin-bottom: 16px;">Order Summary</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #a5a5a5; font-size: 16px;">Order ID</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 16px; text-align: right; font-weight: 600;">#${orderId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #a5a5a5; font-size: 16px;">Status</td>
                  <td style="padding: 8px 0; color: #4ade80; font-size: 16px; text-align: right; font-weight: 600;">PAID</td>
                </tr>
              </table>
            </div>
            <p style="font-size: 14px; color: #a5a5a5; line-height: 1.6; margin-bottom: 40px; text-align: center;">
              You can track the status of your order in your personal account on our website.<br/>
              If you have any questions, feel free to reply to this email.
            </p>
            <hr style="border: none; border-top: 1px solid #353534; margin-bottom: 24px;" />
            <div style="text-align: center;">
              <p style="font-size: 12px; color: #5f5f5f; margin: 0;">&copy; ${new Date().getFullYear()} Vinyla Shop. All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
    });
  }
}
