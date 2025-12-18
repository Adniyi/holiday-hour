from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models import Business
from schemas import (
    MagicLinkRequest,
    VerifyTokenRequest,
    TokenResponse
)
from services.auth import auth_service
from services.email import email_service

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/magic-link", status_code=status.HTTP_200_OK)
def request_magic_link(
    request: MagicLinkRequest,
    db: Session = Depends(get_db)
):
    business = db.query(Business).filter(Business.id == request.business_id).first()
    if not business:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business not found"
        )

    if business.email.lower() != request.email.lower():
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email does not match business owner"
        )

    magic_link = auth_service.create_magic_link(
        email=request.email,
        business_id=str(request.business_id)
    )

    try:
        email_service.send_magic_link(
            to_email=request.email,
            magic_link=magic_link,
            business_name=business.name
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send magic link: {str(e)}"
        )

    return {
        "status": "success",
        "message": "Magic link sent to your email"
    }


@router.post("/verify", response_model=TokenResponse)
def verify_token(request: VerifyTokenRequest):
    try:
        payload = auth_service.verify_magic_link_token(request.token)
        return TokenResponse(
            business_id=payload['business_id'],
            email=payload['email'],
            exp=payload['exp']
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )
