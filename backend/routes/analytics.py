from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from uuid import UUID
from datetime import datetime

from database import get_db
from models import Analytics
from schemas import (
    AnalyticsResponse,
    IncrementViewRequest
)

router = APIRouter(prefix="/api/analytics", tags=["analytics"])


@router.get("/{page_id}", response_model=AnalyticsResponse)
def get_analytics(
    page_id: UUID,
    db: Session = Depends(get_db)
):
    analytics = db.query(Analytics).filter(Analytics.page_id == page_id).first()
    if not analytics:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analytics not found"
        )
    return analytics


@router.post("/{page_id}/view", status_code=status.HTTP_200_OK)
def increment_view(
    page_id: UUID,
    request: IncrementViewRequest,
    db: Session = Depends(get_db)
):
    analytics = db.query(Analytics).filter(Analytics.page_id == page_id).first()
    if not analytics:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analytics not found"
        )

    analytics.views += 1
    analytics.last_viewed = datetime.utcnow()

    today = datetime.utcnow().date().isoformat()
    sources = analytics.sources or []

    source_found = False
    for source in sources:
        if source.get('date') == today and source.get('source') == request.source:
            source['count'] = source.get('count', 0) + 1
            source_found = True
            break

    if not source_found:
        sources.append({
            'date': today,
            'source': request.source,
            'count': 1
        })

    analytics.sources = sources

    db.commit()
    db.refresh(analytics)

    return {"status": "success", "views": analytics.views}
