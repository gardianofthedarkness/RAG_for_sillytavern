import { useState } from "react";

export default function GeneralSettings() {
  const [showMiniPanel, setShowMiniPanel] = useState(false);
  const [showThoughts, setShowThoughts] = useState(false);

  return (
    <div className="space-y-6 text-gray-800 dark:text-white relative">
      {/* 小标题 + Delete */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Chat Completion Presets</h2>
        <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
          Delete
        </button>
      </div>

      {/* 按钮们 */}
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

      {/* 下拉选择 log */}
      <div>
        <label className="block text-sm font-medium mb-1">Select Saved Preset</label>
        <select className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white">
          <option disabled selected>Select one...</option>
          <option>Preset 1</option>
          <option>Preset 2</option>
          <option>Preset 3</option>
        </select>
      </div>


      {/* ✅ MiniPanel trigger */}
      <div className="relative">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          onClick={() => setShowMiniPanel(!showMiniPanel)}
        >
          Token Control
        </button>

        {/* ✅ MiniPanel dropdown (top-left of settings) */}
        {showMiniPanel && (
          <div className="absolute top-0 left-0 mt-12 w-64 p-4 border rounded bg-white dark:bg-gray-800 shadow-lg z-50 animate-slide-down">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold">Token Control Panel</h3>
              <button
                onClick={() => setShowMiniPanel(false)}
                className="text-gray-500 hover:text-black dark:text-white"
              >
                ✕
              </button>
            </div>

            <input
              type="number"
              placeholder="Max Tokens"
              className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            <input
              type="number"
              placeholder="Min Tokens"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
        )}
      </div>
      {/* ✅ Display Chain of Thought Toggle */}
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
    </div>
  );
}
