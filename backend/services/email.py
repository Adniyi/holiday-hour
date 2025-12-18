import resend
from config import settings


resend.api_key = settings.resend_api_key


class EmailService:
    def __init__(self):
        self.from_email = settings.from_email

    def send_magic_link(self, to_email: str, magic_link: str, business_name: str):
        try:
            resend.Emails.send({
                "from": self.from_email,
                "to": to_email,
                "subject": f"Edit Your {business_name} Holiday Hours - HolidyHours",
                "html": f"""
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h1 style="color: #2563eb;">HolidyHours</h1>
                        <h2>Edit Your Holiday Hours</h2>
                        <p>Hello,</p>
                        <p>Click the link below to edit your holiday hours page for <strong>{business_name}</strong>:</p>
                        <p style="margin: 30px 0;">
                            <a href="{magic_link}"
                               style="background-color: #2563eb; color: white; padding: 12px 24px;
                                      text-decoration: none; border-radius: 6px; display: inline-block;">
                                Edit My Page
                            </a>
                        </p>
                        <p style="color: #666; font-size: 14px;">
                            This link will expire in 24 hours for security reasons.
                        </p>
                        <p style="color: #666; font-size: 14px;">
                            If you didn't request this link, you can safely ignore this email.
                        </p>
                        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                        <p style="color: #999; font-size: 12px;">
                            HolidyHours - Making holiday hours simple<br>
                            Questions? Reply to this email or contact support@holidyhours.com
                        </p>
                    </div>
                </body>
                </html>
                """
            })
        except Exception as e:
            print(f"Failed to send magic link email: {str(e)}")
            raise

    def send_payment_receipt(self, to_email: str, business_name: str, amount: float, reference: str, page_url: str):
        try:
            resend.Emails.send({
                "from": self.from_email,
                "to": to_email,
                "subject": "Payment Confirmed - Your Holiday Hours Page is Live!",
                "html": f"""
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h1 style="color: #2563eb;">HolidyHours</h1>
                        <h2>Payment Confirmed!</h2>
                        <p>Hello,</p>
                        <p>Thank you for your payment. Your holiday hours page for <strong>{business_name}</strong> is now live!</p>

                        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
                            <h3 style="margin-top: 0;">Payment Details</h3>
                            <p style="margin: 5px 0;"><strong>Amount:</strong> ${amount:.2f}</p>
                            <p style="margin: 5px 0;"><strong>Reference:</strong> {reference}</p>
                            <p style="margin: 5px 0;"><strong>Date:</strong> {datetime.now().strftime('%B %d, %Y')}</p>
                        </div>

                        <p style="margin: 30px 0;">
                            <a href="{page_url}"
                               style="background-color: #2563eb; color: white; padding: 12px 24px;
                                      text-decoration: none; border-radius: 6px; display: inline-block;">
                                View Your Page
                            </a>
                        </p>

                        <p>You can edit your page anytime using the magic link we'll send to your email.</p>

                        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                        <p style="color: #999; font-size: 12px;">
                            HolidyHours - Making holiday hours simple<br>
                            Questions? Reply to this email or contact support@holidyhours.com
                        </p>
                    </div>
                </body>
                </html>
                """
            })
        except Exception as e:
            print(f"Failed to send receipt email: {str(e)}")
            raise


from datetime import datetime

email_service = EmailService()
