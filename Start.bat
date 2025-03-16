@echo off
pushd %~dp0
set NODE_ENV=production

:: Install SillyTavern dependencies (if not installed)
call npm install --no-audit --no-fund --loglevel=error --no-progress --omit=dev

:: Navigate to plugins directory and check/install dependencies
cd plugins\rag-memory
if not exist "node_modules\openai" (
    echo Installing missing dependencies for rag-memory plugin...
    call npm install --no-audit --no-fund --loglevel=error --no-progress
)

:: Go back to SillyTavern root
cd ../..

:: Install FastAPI and Uvicorn if missing
python -m pip show fastapi >nul 2>nul || python -m pip install fastapi uvicorn

:: Start FastAPI server for RAG plugin in the background
start /B python -m uvicorn plugins.rag_plugin:app --host 0.0.0.0 --port 8000 --reload

:: Start SillyTavern server
node server.js %*

pause
popd
