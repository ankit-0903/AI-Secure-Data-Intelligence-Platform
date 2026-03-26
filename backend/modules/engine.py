from .detectors import SecurityDetector
from .ai_engine import AIEngine

class AnalysisEngine:
    def __init__(self):
        self.detector = SecurityDetector()
        self.ai = AIEngine()

    def analyze(self, request_data):
        content = request_data.content
        input_type = request_data.input_type
        options = request_data.options
        
        # 1. Detection
        findings = self.detector.scan_content(content)
        
        # 2. Risk Calculation
        score, level = self.detector.calculate_score(findings)
        
        # 3. AI Insights
        summary, insights = self.ai.generate_analysis(findings, content, input_type)
        
        # 4. Action Determination & Masking
        action = "none"
        final_content = content
        
        if options.block_high_risk and level in ["high", "critical"]:
            action = "blocked"
            final_content = self.detector.mask_content(content, findings)
        elif options.mask:
            action = "masked"
            final_content = self.detector.mask_content(content, findings)
        else:
            action = "allowed"
            
        return {
            "summary": summary,
            "content_type": input_type,
            "findings": findings,
            "risk_score": score,
            "risk_level": level,
            "action": action,
            "insights": insights,
            "content": final_content
        }
