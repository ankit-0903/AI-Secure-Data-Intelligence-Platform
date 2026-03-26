import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from modules.detectors import SecurityDetector

def test_detectors():
    detector = SecurityDetector()
    
    # Test Email
    findings = detector.scan_content("Send to admin@company.com")
    assert any(f["type"] == "email" for f in findings)
    
    # Test API Key
    findings = detector.scan_content("My key is sk-prod-1234567890abcdef12345")
    assert any(f["type"] == "api_key" for f in findings)
    
    # Test Password
    findings = detector.scan_content("password=secret123")
    assert any(f["type"] == "password_leak" for f in findings)
    
    # Test Http Error (Log Pattern)
    findings = detector.scan_content("2026-03-10 ERR 404 Not Found")
    assert any(f["type"] == "http_error" for f in findings)

    # Test Masking
    sample_content = "api_key=sk-prod-1234567890abcdef12345"
    fnd = detector.scan_content(sample_content)
    masked = detector.mask_content(sample_content, fnd)
    assert "sk-prod-" not in masked
    assert "*" * 10 in masked
    
    print("All backend tests passed!")

if __name__ == "__main__":
    test_detectors()
