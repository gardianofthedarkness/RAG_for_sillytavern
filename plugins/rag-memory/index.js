const { exec } = require("child_process");

/**
 * API to check if Docker is installed
 */
async function isDockerInstalled() {
    return new Promise((resolve) => {
        exec("docker --version", (error, stdout) => {
            if (error) {
                console.error("❌ Docker is not installed.");
                return resolve(false);
            }
            console.log(`✅ Docker is installed: ${stdout}`);
            resolve(true);
        });
    });
}

/**
 * API to start Qdrant in Docker
 */
async function init(router) {
    console.log("🔹 RAG Memory Plugin Loaded");

    router.post("/init-database", async (req, res) => {
        // Check if Docker is installed
        const dockerInstalled = await isDockerInstalled();
        if (!dockerInstalled) {
            return res.status(500).json({ error: "Docker is not installed. Please install Docker first." });
        }

        console.log("🚀 Starting Qdrant via Docker...");

        exec("docker compose up -d", { cwd: "./plugins/rag-memory" }, (error, stdout, stderr) => {
            if (error) {
                console.error("❌ Error starting Docker:", error);
                return res.status(500).json({ error: "Failed to start Qdrant. Make sure Docker is running." });
            }
            console.log("✅ Qdrant initialized successfully!");
            res.json({ success: true, message: "Successful" });
        });
    });
}

/**
 * Plugin metadata
 */
const info = {
    id: "rag-memory",
    name: "RAG Memory Plugin",
    description: "Starts a Qdrant vector database in Docker for RAG integration.",
};

module.exports = { init, info };
