import logging
from database import Base, engine

# ==============================================================================
# IMPORTANT: Import all your SQLAlchemy models here!
# ==============================================================================
from models import Business, Page, Analytics
# ==============================================================================

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info("Creating database tables...")
Base.metadata.create_all(bind=engine)
logger.info("Database tables created successfully.")