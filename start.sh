#!/usr/bin/env bash

# Make sure pwd is the directory of the script
cd "$(dirname "$0")"

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    read -p "npm is not installed. Do you want to install nodejs and npm? (y/n)" choice
    case "$choice" in
      y|Y )
        echo "Installing nvm..."
        export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
        source ~/.bashrc
        nvm install --lts
        nvm use --lts;;
      n|N )
        echo "Nodejs and npm will not be installed."
        exit;;
      * )
        echo "Invalid option. Nodejs and npm will not be installed."
        exit;;
    esac
fi

echo "Installing Node Modules..."
export NODE_ENV=production
npm i --no-audit --no-fund --loglevel=error --no-progress --omit=dev

# Check if FastAPI and Uvicorn are installed
if ! python3 -c "import fastapi" &> /dev/null; then
    echo "Installing FastAPI and dependencies..."
    pip3 install --upgrade fastapi uvicorn
fi

# Start FastAPI server for RAG plugin
echo "Starting RAG Plugin API..."
nohup uvicorn plugins.rag_plugin:app --host 0.0.0.0 --port 8000 --reload &

sleep 2  # Ensure FastAPI starts before SillyTavern

echo "Entering SillyTavern..."
node "server.js" "$@"
