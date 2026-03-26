from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.schemas import AnalysisRequest, AnalysisResponse
from modules.engine import AnalysisEngine

app = FastAPI(title="AI Secure Data Intelligence Platform (AI-SDIP)")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = AnalysisEngine()

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_content(request: AnalysisRequest):
    try:
        result = engine.analyze(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8005)
