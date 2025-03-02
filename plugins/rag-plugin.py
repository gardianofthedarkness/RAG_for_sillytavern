from fastapi import FastAPI, Request, HTTPException
import json
import subprocess
import os

app = FastAPI()

# Store backstory in-memory (can later be moved to a database)
backstory_store = {}

@app.post("/process_request")
async def process_request(request: Request):
    """
    Handles two types of POST requests:
    1. Stores user backstory if location = "home/backstory".
    2. Runs QdrantRAG script if request headers contain a special location.
    """
    
    # Parse JSON body
    data = await request.json()
    action = data.get("action")
    location = data.get("location")
    user_input = data.get("input", "")

    if not action or not location:
        raise HTTPException(status_code=400, detail="Missing 'action' or 'location' in request.")

    # 🔹 Case 1: Store backstory if location = "home/backstory"

    # Fucking backstory as parameter, a string

    if action.lower() == "post" and location == "home/backstory":
        user_id = data.get("user_id", "default_user")  # Optional user ID
        if user_id not in backstory_store:
            backstory_store[user_id] = []
        
        backstory_store[user_id].append(user_input)  # Append new backstory entry

        return {"message": "Backstory saved successfully!", "total_entries": len(backstory_store[user_id])}

    # 🔹 Case 2: Run the QdrantRAG Python script

    # Fucking prompt as parameter, a string

    elif action.lower() == "post" and "Content-Type" in request.headers:
        try:
            script_path = os.path.join(os.path.dirname(__file__), "qdrantrag.ipynb")
            
            if not os.path.exists(script_path):
                raise HTTPException(status_code=404, detail="Python script not found.")

            # Run the Jupyter notebook script using Papermill (or nbconvert)
            result = subprocess.run(
                ["papermill", script_path, "-"],
                input=json.dumps({"user_input": user_input}),
                text=True,
                capture_output=True
            )

            if result.returncode != 0:
                raise HTTPException(status_code=500, detail=f"Script execution failed: {result.stderr}")

            output_text = result.stdout.strip()
            return {"response": output_text}

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    else:
        raise HTTPException(status_code=400, detail="Invalid request parameters.")
