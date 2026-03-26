import json

class AIEngine:
    def __init__(self):
        pass

    def generate_analysis(self, findings, content, content_type):
        """
        Analyze the security findings using built-in heuristic patterns.
        """
        if not findings:
            return "Analyzed content. No immediate security risks detected via rule-based patterns.", ["System appears stable."]
            
        risk_counts = {}
        for f in findings:
            risk_counts[f["risk"]] = risk_counts.get(f["risk"], 0) + 1
            
        summary = f"Security Scan detected {len(findings)} potential issues ({', '.join([f'{c} {r}' for r, c in risk_counts.items()])})."
        
        insights = []
        if any(f["risk"] == "critical" for f in findings):
           insights.append("CRITICAL: Manual review of leaked credentials is required immediately.")
        if any(f["type"] == "stack_trace" for f in findings):
           insights.append("Ensure debug mode is disabled in production to prevent stack trace leaks.")
        if any(f["type"] == "sql_injection" for f in findings):
           insights.append("High risk of SQL Injection. Audit all database query parameters.")
        if any(f["type"] == "sensitive_env" for f in findings):
           insights.append("Environment variables detected. Rotate all secrets found in the logs.")
           
        return summary, insights

