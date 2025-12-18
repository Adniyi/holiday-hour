from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from database import get_db
from models import Page, Business, Analytics
from schemas import (
    CreatePageRequest,
    UpdatePageRequest,
    PageResponse
)

router = APIRouter(prefix="/api/pages", tags=["pages"])


@router.post("", response_model=PageResponse, status_code=status.HTTP_201_CREATED)
def create_page(
    request: CreatePageRequest,
    db: Session = Depends(get_db)
):
    business = db.query(Business).filter(Business.id == request.business_id).first()
    if not business:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business not found"
        )

    page = Page(
        id=request.business_id,
        business_id=request.business_id,
        holidays=[h.model_dump() for h in request.holidays],
        regular_hours=request.regular_hours or {}
    )
    db.add(page)

    analytics = Analytics(
        id=page.id,
        page_id=page.id,
        views=0,
        sources=[]
    )
    db.add(analytics)

    db.commit()
    db.refresh(page)
    return page


@router.get("/{page_id}", response_model=PageResponse)
def get_page(
    page_id: UUID,
    db: Session = Depends(get_db)
):
    page = db.query(Page).filter(Page.id == page_id).first()
    if not page:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Page not found"
        )
    return page


@router.get("/business/{business_id}", response_model=PageResponse)
def get_page_by_business(
    business_id: UUID,
    db: Session = Depends(get_db)
):
    page = db.query(Page).filter(Page.business_id == business_id).first()
    if not page:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Page not found"
        )
    return page


@router.put("/{page_id}", response_model=PageResponse)
def update_page(
    page_id: UUID,
    request: UpdatePageRequest,
    db: Session = Depends(get_db)
):
    page = db.query(Page).filter(Page.id == page_id).first()
    if not page:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Page not found"
        )

    if request.holidays is not None:
        page.holidays = [h.model_dump() for h in request.holidays]
    if request.regular_hours is not None:
        page.regular_hours = request.regular_hours
    if request.custom_css is not None:
        page.custom_css = request.custom_css

    db.commit()
    db.refresh(page)
    return page
