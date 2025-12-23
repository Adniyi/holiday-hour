import os
from typing import List

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    database_url: str = os.environ["DATABASE_URL"]
    # database_url: str = "postgresql://postgres.xwcrkjxpgirvbmtztocj:PPCrT4YWHdYezQ5Z@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"
    supabase_url: str = os.environ["SUPABASE_URL"]
    # supabase_url: str = https://xwcrkjxpgirvbmtztocj.supabase.coPPCrT4YWHdYezQ5Z"
    supabase_key: str = os.environ["SUPABASE_KEY"]
    # supabase_key: str =   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3Y3JranhwZ2lydmJtdHp0b2NqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTcxNzQ0MSwiZXhwIjoyMDgxMjkzNDQxfQ.xpZ6J5p2t0awAN8NJVm82z6E-zUvHBIGofm4OBy-Zss"
    secret_key: str = os.environ["SECRET_KEY"]
    magic_link_expiry: int = 86400
    paystack_secret_key: str = os.environ["PAYSTACK_SECRET_KEY"]
    # paystack_public_key: str =sk_test_50d6682a1b9d5c31f9216386038e33e7474876a8"
    paystack_public_key: str = os.environ["PAYSTACK_PUBLIC_KEY"]
    # paystack_public_key: str =pk_test_4c4dfa89a476ea9ea482a9c3296426b673f5444d"
    resend_api_key: str = os.environ["RESEND_API_KEY"]
    # resend_api_key: str = re_h5NV8CcK_2UAAJycTbgrXUTFGy6DiD9Pq"
    from_email: str = os.environ["FROM_EMAIL"]
    # from_email: str = onboarding@resend.dev"
    app_url: str = os.environ["APP_URL"]
    # app_url: str = http://localhost:3000"
    api_url: str = os.environ["API_URL"]
    # api_url: str = http://localhost:8000"
    frontend_url: str = os.environ["FRONTEND_URL"]
    # frontend_url: str = http://localhost:3000"
    allowed_origins: str = os.environ["ALLOWED_ORIGINS"]
    # allowed_origins: str = http://localhost:3000"
    environment: str = "development"

    smtp_host:str = "smtp.gmail.com"
    smtp_port:int = 465
    smtp_user:str
    smtp_password:str 


    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",")]

    class Config:
        env_file = ".env"
        case_sensitive = False



settings = Settings()

