from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
import uvicorn

from routes import businesses, pages, analytics, auth, payment

app = FastAPI(
    title="HolidyHours API",
    description="API for creating and managing holiday hours pages for small businesses",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(businesses.router)
app.include_router(pages.router)
app.include_router(analytics.router)
app.include_router(auth.router)
app.include_router(payment.router)


@app.get("/")
def root():
    return {
        "message": "HolidyHours API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    return {"status": "ok","message":"healthy"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
