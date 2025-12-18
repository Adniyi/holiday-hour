from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
from database import Base


class Business(Base):
    __tablename__ = "businesses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(Text, nullable=False)
    email = Column(Text, nullable=False)
    phone = Column(Text, nullable=True)
    address = Column(Text, nullable=True)
    type = Column(Text, nullable=True)
    paystack_customer_id = Column(Text, nullable=True)
    payment_status = Column(
        Text,
        nullable=False,
        default='pending',
        server_default='pending'
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    last_edited = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    page = relationship("Page", back_populates="business", uselist=False, cascade="all, delete-orphan")

    __table_args__ = (
        CheckConstraint(
            "payment_status IN ('pending', 'paid', 'failed')",
            name='check_payment_status'
        ),
    )


class Page(Base):
    __tablename__ = "pages"

    id = Column(UUID(as_uuid=True), primary_key=True)
    business_id = Column(UUID(as_uuid=True), ForeignKey('businesses.id', ondelete='CASCADE'), nullable=False)
    holidays = Column(JSONB, nullable=False, default=list, server_default='[]')
    regular_hours = Column(JSONB, nullable=False, default=dict, server_default='{}')
    custom_css = Column(Text, nullable=True)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    business = relationship("Business", back_populates="page")
    analytics = relationship("Analytics", back_populates="page", uselist=False, cascade="all, delete-orphan")


class Analytics(Base):
    __tablename__ = "analytics"

    id = Column(UUID(as_uuid=True), primary_key=True)
    page_id = Column(UUID(as_uuid=True), ForeignKey('pages.id', ondelete='CASCADE'), nullable=False)
    views = Column(Integer, nullable=False, default=0, server_default='0')
    last_viewed = Column(DateTime(timezone=True), nullable=True)
    sources = Column(JSONB, nullable=False, default=list, server_default='[]')

    page = relationship("Page", back_populates="analytics")
