from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models import Business
from schemas import (
    PaymentInitializeRequest,
    PaymentInitializeResponse,
    PaymentVerifyResponse
)
from services.payment import payment_service
from services.email import email_service
from config import settings

router = APIRouter(prefix="/api/payment", tags=["payment"])


@router.post("/initialize", response_model=PaymentInitializeResponse)
async def initialize_payment(
    request: PaymentInitializeRequest,
    db: Session = Depends(get_db)
):
    business = db.query(Business).filter(Business.id == request.business_id).first()
    if not business:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business not found"
        )

    try:
        result = await payment_service.initialize_payment(
            email=request.email,
            amount=14000,
            business_id=str(request.business_id),
            callback_url=f"{settings.frontend_url}/payment/success"
        )

        return PaymentInitializeResponse(
            authorization_url=result['authorization_url'],
            access_code=result['access_code'],
            reference=result['reference']
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Payment initialization failed: {str(e)}"
        )


@router.get("/verify/{reference}", response_model=PaymentVerifyResponse)
async def verify_payment(
    reference: str,
    db: Session = Depends(get_db)
):
    try:
        result = await payment_service.verify_payment(reference)

        if result['status'] == 'success':
            business_id = result['metadata'].get('business_id')
            if business_id:
                business = db.query(Business).filter(
                    Business.id == business_id
                ).first()

                if business:
                    business.payment_status = 'paid'
                    business.paystack_customer_id = result.get('customer', {}).get('customer_code')
                    db.commit()

                    page_url = f"{settings.frontend_url}/b/{business_id}"
                    try:
                        email_service.send_payment_receipt(
                            to_email=business.email,
                            business_name=business.name,
                            amount=result['amount'] / 100,
                            reference=reference,
                            page_url=page_url
                        )
                    except Exception as e:
                        print(f"Failed to send receipt: {str(e)}")

            return PaymentVerifyResponse(
                status=result['status'],
                amount=result['amount'],
                reference=reference,
                business_id=business_id,
                email=result.get('customer', {}).get('email', '')
            )
        else:
            business_id = result['metadata'].get('business_id')
            if business_id:
                business = db.query(Business).filter(
                    Business.id == business_id
                ).first()
                if business:
                    business.payment_status = 'failed'
                    db.commit()

            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Payment was not successful"
            )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Payment verification failed: {str(e)}"
        )


@router.post("/webhook")
async def payment_webhook(
    payload: dict,
    db: Session = Depends(get_db)
):
    event = payload.get('event')

    if event == 'charge.success':
        data = payload.get('data', {})
        business_id = data.get('metadata', {}).get('business_id')

        if business_id:
            business = db.query(Business).filter(
                Business.id == business_id
            ).first()

            if business:
                business.payment_status = 'paid'
                business.paystack_customer_id = data.get('customer', {}).get('customer_code')
                db.commit()

    return {"status": "success"}
