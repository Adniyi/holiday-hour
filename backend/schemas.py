from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional, List, Literal
from datetime import datetime
from uuid import UUID


class HolidaySchema(BaseModel):
    name: str
    date: str
    status: Literal['closed', 'special', 'normal']
    open_time: Optional[str] = None
    close_time: Optional[str] = None
    notes: Optional[str] = None


class RegularHoursDay(BaseModel):
    open: str
    close: str


class CreateBusinessRequest(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    address: Optional[str] = None
    type: Optional[str] = None


class UpdateBusinessRequest(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    type: Optional[str] = None


class BusinessResponse(BaseModel):
    id: UUID
    name: str
    email: str
    phone: Optional[str]
    address: Optional[str]
    type: Optional[str]
    paystack_customer_id: Optional[str]
    payment_status: str
    created_at: datetime
    last_edited: datetime

    class Config:
        from_attributes = True


class CreatePageRequest(BaseModel):
    business_id: UUID
    holidays: List[HolidaySchema]
    regular_hours: Optional[dict] = {}


class UpdatePageRequest(BaseModel):
    holidays: Optional[List[HolidaySchema]] = None
    regular_hours: Optional[dict] = None
    custom_css: Optional[str] = None


class PageResponse(BaseModel):
    id: UUID
    business_id: UUID
    holidays: List[dict]
    regular_hours: dict
    custom_css: Optional[str]
    updated_at: datetime

    class Config:
        from_attributes = True


class AnalyticsResponse(BaseModel):
    id: UUID
    page_id: UUID
    views: int
    last_viewed: Optional[datetime]
    sources: List[dict]

    class Config:
        from_attributes = True


class IncrementViewRequest(BaseModel):
    source: str = 'direct'


class MagicLinkRequest(BaseModel):
    email: EmailStr
    business_id: UUID


class VerifyTokenRequest(BaseModel):
    token: str


class TokenResponse(BaseModel):
    business_id: str
    email: str
    exp: int


class PaymentInitializeRequest(BaseModel):
    business_id: UUID
    email: EmailStr


class PaymentInitializeResponse(BaseModel):
    authorization_url: str
    access_code: str
    reference: str


class PaymentVerifyResponse(BaseModel):
    status: str
    amount: int
    reference: str
    business_id: str
    email: str
