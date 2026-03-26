import os
from typing import List, Optional

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    database_url: str = os.environ["DATABASE_URL"]
    supabase_url: str = os.environ["SUPABASE_URL"]
    supabase_key: str = os.environ["SUPABASE_KEY"]
    secret_key: str = os.environ["SECRET_KEY"]
    magic_link_expiry: int = 86400
    paystack_secret_key: str = os.environ["PAYSTACK_SECRET_KEY"]
    paystack_public_key: str = os.environ["PAYSTACK_PUBLIC_KEY"]
    resend_api_key: str = os.environ["RESEND_API_KEY"]
    from_email: str = os.environ["FROM_EMAIL"]
    app_url: str = os.environ["APP_URL"]
    api_url: str = os.environ["API_URL"]
    frontend_url: str = os.environ["FRONTEND_URL"]
    allowed_origins: str = os.environ["ALLOWED_ORIGINS"]
    environment: str = "development"

    smtp_host:str = "smtp.gmail.com"
    smtp_port:int = 465
    smtp_user:Optional[str] = None
    smtp_password:Optional[str] = None


    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",")]

    class Config:
        env_file = ".env"
        case_sensitive = False



settings = Settings()

