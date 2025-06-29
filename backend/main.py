from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_methods=["*"],
  allow_headers=["*"]
)


@app.post("/ai-enhance") 
async def enhance_text(request: Request):
    data = await request.json()
    text = data.get("text","")

    enhanced = f"✨ Enhanced: {text.strip()}"

    return{"enhanced":enhanced}

@app.get("/")
def read_rood():
    return{"message":"Hellow, this is your AI Resume Enhancer backend!"}

@app.post("/save-resume")
async def save_resume(request:Request):
    data = await request.json()
    print("Received resume:",data)
    return {"status":"saved"}
