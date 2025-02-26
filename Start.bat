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

:: Go back to SillyTavern root and start server
cd ../..
node server.js %*
pause
popd

