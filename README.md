# SISA-1: Heuristic Security Data Intelligence Platform 🛡️🚀

**SISA-1** is a high-performance, enterprise-grade security workstation designed for the modern developer. It utilizes deterministic rule-based detection and advanced heuristic mapping to provide a unified threat-analysis experience.

---

## ✨ Key Features

- **🧠 Heuristic Mapping**: Built-in security intelligence for deep pattern analysis.
- **🔍 Advanced Log Analyzer**: Real-time ingest and classification of system logs, authentication failures, and internal error patterns.
- **🛡️ Sensitive Data Masking**: Automatically detects and redacts high-risk tokens (API keys, passwords, credentials) before visual display.
- **🖼️ Symmetric Dashboard UI**: A sleek, 4-panel workstation with high-fidelity "Security Scan" animations and minimalist enterprise typography.
- **📑 Export Protocol**: Download detailed security findings as structured JSON reports for audit readiness.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 15+, TypeScript, Vanilla CSS (Glassmorphism design system).
- **Backend**: FastAPI (Python 3.10+), Pydantic Models.
- **Security Engine**: Custom Deterministic Rule-Sets & Heuristic Risk Mapping.

---

## 🚀 Quick Start (Local Setup)

### 1. Backend Installation (Port 8005)
```bash
cd backend
python -m venv venv
./venv/Scripts/activate  # On Windows
pip install -r requirements.txt
python main.py
```

### 2. Frontend Installation (Port 3000)
```bash
cd frontend
npm install
npm run dev
```

### 3. Configuration
Rename `.env.example` to `.env` in the root and update your local paths if necessary.

---

## 🛡️ Demo Guide
A sample security dump is provided in **`app.log`**. Upload this file via the dashboard to see:
- Real-time "Security Mapping" animations.
- Highlighted vulnerability sightings (Auth failures, SQLi patterns).
- Heuristic-generated remediation insight summaries.

---

## ⚖️ Hackathon Notes
SISA-1 is designed for **privacy-first security analysis**. All processing happens entirely within the local environment, ensuring sensitive log data never leaves your infrastructure.

**Project Contributors: Your Team Name 🛡️✨**
