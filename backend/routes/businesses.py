from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from database import get_db
from models import Business
from schemas import (
    CreateBusinessRequest,
    UpdateBusinessRequest,
    BusinessResponse
)
from services.auth import auth_service

router = APIRouter(prefix="/api/businesses", tags=["businesses"])


@router.post("", response_model=BusinessResponse, status_code=status.HTTP_201_CREATED)
def create_business(
    request: CreateBusinessRequest,
    db: Session = Depends(get_db)
):
    business = Business(
        name=request.name,
        email=request.email,
        phone=request.phone,
        address=request.address,
        type=request.type,
        payment_status='pending'
    )
    db.add(business)
    db.commit()
    db.refresh(business)
    print(business)
    return business


@router.get("/{business_id}", response_model=BusinessResponse)
def get_business(
    business_id: UUID,
    db: Session = Depends(get_db)
):
    business = db.query(Business).filter(Business.id == business_id).first()
    if not business:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business not found"
        )
    return business


@router.put("/{business_id}", response_model=BusinessResponse)
def update_business(
    business_id: UUID,
    request: UpdateBusinessRequest,
    db: Session = Depends(get_db)
):
    business = db.query(Business).filter(Business.id == business_id).first()
    if not business:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business not found"
        )

    update_data = request.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(business, key, value)

    db.commit()
    db.refresh(business)
    return business
