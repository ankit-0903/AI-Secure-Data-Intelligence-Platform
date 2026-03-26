import re

class SecurityDetector:
    def __init__(self):
        self.patterns = {
            "email": r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+",
            "phone": r"\b\+?\d{10,15}\b",
            "api_key": r"(?:sk-|AIza|key-|ghp_|glpat-)[a-zA-Z0-9\-_]{16,}",
            "password_leak": r"(?i)(?:password|passwd|pwd|secret|auth_token|credentials|access_key)\s*[:=]\s*([^\s,;]+)",
            "stack_trace": r"(?i)(?:Traceback \(most recent call last\)|Exception in thread|at [\w\.]+\([\w\.]+\.java:\d+\)|at [\w\.]+\.[\w]+\([\w\.]+:\d+:\d+\))",
            "sql_injection": r"(?i)(?:SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER)\s+(?:FROM|INTO|SET|TABLE|DATABASE)",
            "auth_failure": r"(?i)(?:failed login|authentication failure|invalid password|unauthorized access|401 Unauthorized)",
            "sensitive_env": r"(?i)(?:DB_PASSWORD|DATABASE_URL|AWS_SECRET|STRIPE_KEY|ENV_VAR)\s*=",
            "http_error": r"\b(?:400|401|403|404|500|502|503|504)\b",
            "internal_path": r"/(?:etc|var|usr|home|root)/[a-zA-Z0-9\-_/]+"
        }
        self.risk_levels = {
            "api_key": "high",
            "password_leak": "critical",
            "email": "low",
            "phone": "low",
            "stack_trace": "medium",
            "sql_injection": "high",
            "auth_failure": "medium",
            "sensitive_env": "high",
            "http_error": "low",
            "internal_path": "medium"
        }

    def scan_content(self, content):
        findings = []
        lines = content.splitlines()
        
        for line_num, line in enumerate(lines, 1):
            for type_name, pattern in self.patterns.items():
                matches = re.finditer(pattern, line)
                for match in matches:
                    findings.append({
                        "type": type_name,
                        "value": match.group(0) if type_name != "password_leak" else match.group(1),
                        "risk": self.risk_levels.get(type_name, "low"),
                        "line": line_num
                    })
        return findings

    def calculate_score(self, findings):
        score_map = {"critical": 10, "high": 5, "medium": 3, "low": 1}
        total_score = sum(score_map.get(f["risk"], 0) for f in findings)
        
        risk_level = "low"
        if total_score > 15:
            risk_level = "critical"
        elif total_score > 8:
            risk_level = "high"
        elif total_score > 3:
            risk_level = "medium"
            
        return total_score, risk_level

    def mask_content(self, content, findings):
        masked_content = content
        # Sort findings by length of value descending to avoid partial replacements
        sorted_findings = sorted(findings, key=lambda x: len(str(x.get("value", ""))), reverse=True)
        
        for finding in sorted_findings:
            val = finding.get("value")
            if val and finding["risk"] in ["high", "critical"]:
                masked_content = masked_content.replace(val, "*" * len(val))
        return masked_content
