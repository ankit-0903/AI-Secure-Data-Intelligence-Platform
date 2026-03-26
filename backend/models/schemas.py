from pydantic import BaseModel, Field
from typing import List, Optional

class AnalysisOptions(BaseModel):
    mask: bool = True
    block_high_risk: bool = True
    log_analysis: bool = True

class AnalysisRequest(BaseModel):
    input_type: str
    content: str
    options: Optional[AnalysisOptions] = Field(default_factory=AnalysisOptions)

class Finding(BaseModel):
    type: str
    value: Optional[str] = None
    risk: str
    line: int

class AnalysisResponse(BaseModel):
    summary: str
    content_type: str
    findings: List[Finding]
    risk_score: int
    risk_level: str
    action: str
    insights: List[str]
    content: Optional[str] = None
