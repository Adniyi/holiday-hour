import httpx
from config import settings


class PaymentService:
    def __init__(self, secret_key: str):
        self.secret_key = secret_key
        self.base_url = "https://api.paystack.co"
        self.headers = {
            "Authorization": f"Bearer {self.secret_key}",
            "Content-Type": "application/json",
        }

    async def initialize_payment(self, email: str, amount: int, business_id: str, callback_url: str):
        # Paystack expects amount in kobo (lowest currency unit)
        amount_in_kobo = amount * 100
        payload = {
            "email": email,
            "amount": amount_in_kobo,
            "callback_url": callback_url,
            "metadata": {
                "business_id": business_id,
                "custom_fields": [
                    {"display_name": "Business ID", "variable_name": "business_id", "value": business_id}
                ]
            }
        }
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{self.base_url}/transaction/initialize", headers=self.headers, json=payload)
            response.raise_for_status()  # Will raise an exception for 4xx/5xx responses
            return response.json()['data']

    async def verify_payment(self, reference: str):
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{self.base_url}/transaction/verify/{reference}", headers=self.headers)
            response.raise_for_status()
            return response.json()['data']


# Instantiate the service with the key from settings
payment_service = PaymentService(secret_key=settings.paystack_secret_key)