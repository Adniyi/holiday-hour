from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from config import settings
from datetime import datetime, timedelta


class AuthService:
    def __init__(self):
        self.serializer = URLSafeTimedSerializer(settings.secret_key)
        self.expiry = settings.magic_link_expiry

    def generate_magic_link_token(self, email: str, business_id: str) -> str:
        payload = {
            'email': email,
            'business_id': business_id,
            'exp': int((datetime.utcnow() + timedelta(seconds=self.expiry)).timestamp())
        }
        return self.serializer.dumps(payload, salt='magic-link')

    def verify_magic_link_token(self, token: str) -> dict:
        try:
            payload = self.serializer.loads(
                token,
                salt='magic-link',
                max_age=self.expiry
            )
            return payload
        except SignatureExpired:
            raise ValueError('Token has expired')
        except BadSignature:
            raise ValueError('Invalid token')

    def create_magic_link(self, email: str, business_id: str) -> str:
        token = self.generate_magic_link_token(email, business_id)
        return f"{settings.frontend_url}/dashboard/{business_id}?token={token}"


auth_service = AuthService()
