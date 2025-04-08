import { useState } from "react";
import MiniPanel from "./MiniPanels/MiniPanel";
import Button from "../Ui/button"

interface GeneralSettingsProps {
  activeMiniPanel: string | null;
  setActiveMiniPanel: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function GeneralSettings({
  activeMiniPanel,
  setActiveMiniPanel,
}: GeneralSettingsProps) {
  const [showThoughts, setShowThoughts] = useState(false);
  const [contextSize, setContextSize] = useState(512);
  const [maxResponse, setMaxResponse] = useState(400);
  const [swipes, setSwipes] = useState(1);

// More LLM Settings
  const [temperature, setTemperature] = useState(1.00);
  const [frequency, setFrequency] = useState(0.00);
  const [presence, setPresence] = useState(0.00);
  const [topP, setTopP] = useState(0.50);
  
// Quick Prompts Edit
  const [mainPrompt, setMainPrompt] = useState("");
  const [auxPrompt, setAuxPrompt] = useState("");
  const [postHistory, setPostHistory] = useState("");


  return (
    <div className="space-y-6 text-gray-800 dark:text-white relative">
      {/* Title + Delete */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Chat Completion Presets</h2>
        <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
          Delete
        </button>
      </div>



      {/* CRUD buttons */}
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Import
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Save
        </button>
        <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          Update
        </button>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Export
        </button>
      </div>




      {/* Preset Selector */}
      <div>
        <label className="block text-sm font-medium mb-1">Select Saved Preset</label>
        <select className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white">
          <option disabled selected>Default</option>
          <option>Preset 1</option>
          <option>Preset 2</option>
          <option>Preset 3</option>
        </select>
      </div>




      {/* Token Control Button */}
      <div className="relative">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          onClick={() =>
            setActiveMiniPanel(activeMiniPanel === "token" ? null : "token")
          }
        >
          Token Control
        </button>

        <MiniPanel
          visible={activeMiniPanel === "token"}
          onClose={() => setActiveMiniPanel(null)}
        >
          <h3 className="text-xl font-semibold mb-2">Token Control Panel</h3>

          {/* Context Size (Token) */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Context Size (Tokens): {contextSize}
            </label>
            <input
              type="range"
              min={512}
              max={128000}
              step={512}
              value={contextSize}
              onChange={(e) => setContextSize(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Max Response */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">
              Max Response Length (tokens)
            </label>
            <input
              type="number"
              value={maxResponse}
              onChange={(e) => setMaxResponse(parseInt(e.target.value))}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="e.g. 400"
            />
          </div>

          {/* Swipes */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">
              Multiple Swipes per Generation
            </label>
            <input
              type="number"
              value={swipes}
              onChange={(e) => setSwipes(parseInt(e.target.value))}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="e.g. 2"
            />
          </div>
        </MiniPanel>
      </div>





      {/* Toggle Chain of Thought */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="chain"
          checked={showThoughts}
          onChange={(e) => setShowThoughts(e.target.checked)}
          className="accent-blue-600 w-4 h-4"
        />
        <label htmlFor="chain" className="text-sm">
          Displaying Chain of Thoughts
        </label>
      </div>





      {/* More LLM Settings Button */}
      <div className="relative">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          onClick={() =>
            setActiveMiniPanel(activeMiniPanel === "llm" ? null : "llm")
          }
        >
          More LLM Settings
        </button>

        <MiniPanel
          visible={activeMiniPanel === "llm"}
          onClose={() => setActiveMiniPanel(null)}
        >
          <h3 className="text-xl font-semibold mb-4">More LLM Settings</h3>

          {/* 🔥 Temperature */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Temperature: {temperature.toFixed(1)}
            </label>
            <input
              type="range"
              min={0}
              max={2}
              step={0.01}
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* 🧠 Frequency Penalty */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Frequency Penalty: {frequency.toFixed(1)}
            </label>
            <input
              type="range"
              min={-2}
              max={2}
              step={0.01}
              value={frequency}
              onChange={(e) => setFrequency(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* 👁 Presence Penalty */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Presence Penalty: {presence.toFixed(1)}
            </label>
            <input
              type="range"
              min={-2}
              max={2}
              step={0.01}
              value={presence}
              onChange={(e) => setPresence(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* 🎯 Top P */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Top P: {topP.toFixed(2)}
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={topP}
              onChange={(e) => setTopP(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </MiniPanel>
      </div>






      {/* Quick Prompt Panel Button */}
      <div className="relative">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          onClick={() =>
            setActiveMiniPanel(activeMiniPanel === "quick" ? null : "quick")
          }
        >
          Quick Prompt
        </button>

        <MiniPanel
          visible={activeMiniPanel === "quick"}
          onClose={() => setActiveMiniPanel(null)}
        >
          <h3 className="text-xl font-semibold mb-4">Quick Prompt</h3>

          {/* 🧾 Main Prompt */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Main</label>
            <textarea
              value={mainPrompt}
              onChange={(e) => setMainPrompt(e.target.value)}
              placeholder="Enter main prompt..."
              className="w-full h-[250px] p-2 border rounded-md resize-none dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-0"
            />
          </div>

          {/* 🧩 Auxiliary Prompt */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Auxiliary</label>
            <textarea
              value={auxPrompt}
              onChange={(e) => setAuxPrompt(e.target.value)}
              placeholder="Enter auxiliary prompt..."
              className="w-full h-[250px] p-2 border rounded-md resize-none dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-0"
            />
          </div>

          {/* 🧠 Post-History Instructions */}
          <div>
            <label className="block text-sm font-medium mb-1">Post-History Instructions</label>
            <textarea
              value={postHistory}
              onChange={(e) => setPostHistory(e.target.value)}
              placeholder="Enter post-history instructions..."
              className="w-full h-[250px] p-2 border rounded-md resize-none dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-0"
            />
          </div>
        </MiniPanel>
      </div>


    </div>
  );
}
