from pydantic_settings import BaseSettings
from typing import List
from dotenv import load_dotenv
import os

load_dotenv()


class Settings(BaseSettings):
    database_url: str = "postgresql://postgres.xwcrkjxpgirvbmtztocj:PPCrT4YWHdYezQ5Z@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"
    supabase_url: str = "https://xwcrkjxpgirvbmtztocj.supabase.coPPCrT4YWHdYezQ5Z"
    supabase_key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3Y3JranhwZ2lydmJtdHp0b2NqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTcxNzQ0MSwiZXhwIjoyMDgxMjkzNDQxfQ.xpZ6J5p2t0awAN8NJVm82z6E-zUvHBIGofm4OBy-Zss"
    secret_key: str = '6dfbb919ef50c94aed1e377faca2b08be2cc6b12728fea5e2ac5b287bd1c3322'
    magic_link_expiry: int = 86400
    paystack_secret_key: str = "sk_test_50d6682a1b9d5c31f9216386038e33e7474876a8"
    paystack_public_key: str = "pk_test_4c4dfa89a476ea9ea482a9c3296426b673f5444d"
    resend_api_key: str = "re_h5NV8CcK_2UAAJycTbgrXUTFGy6DiD9Pq"
    from_email: str = "onboarding@resend.dev"
    app_url: str = "http://localhost:3000"
    api_url: str = "http://localhost:8000"
    frontend_url: str = "http://localhost:3000"
    allowed_origins: str = "http://localhost:3000"
    environment: str = "development"

    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.allowed_origins.split(',')]

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
