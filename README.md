# Resume AI Editor (React + FastAPI)

A web-based Resume Editor where you can:
- Upload a resume (mocked file parser)
- Edit resume sections like name, summary, experience, education, skills
- Enhance text using a mock AI backend
- Save or download your final resume

## Required installations

 - npm install init
 - npm install tailwindcss/vite
 - npm install zustand

## Initiate Vite

navigate to frontend 
-> cd resume-editor
-> npm run dev

## Initiate Backend

navigate to backend folder -> cd backend

activate environment variable -> venv\Scripts\activate

start the backend -> uvicorn main:app--reload


## Folder Structure
 ```
resume-ai-editor/
│
├── backend/
│   ├── venv/
│   └── main.py
│
└── resume-editor/  (Frontend)
    ├── src/
    │   ├── components/
    │   ├── store/
    │   ├── Types/
    │   ├── utils/
    │   ├── App.tsx
    │   └── index.css
```
## Notes
 - Resume upload is mocked — no real file parsing.

 - AI enhancements use a dummy FastAPI endpoint to simulate output.

 - Resume can be saved to the backend or downloaded as .json.
