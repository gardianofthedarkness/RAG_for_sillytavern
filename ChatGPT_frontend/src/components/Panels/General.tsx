import { useState } from "react";
import MiniPanel from "./MiniPanels/MiniPanel";
import Button from "../Ui/button"
import SectionFrame from "../Ui/sectionframe";
import ChainOfThoughtList from "./DynamicList/List";

interface GeneralSettingsProps {
  activeMiniPanel: string | null;
  setActiveMiniPanel: React.Dispatch<React.SetStateAction<string | null>>;
  onEnterChain: () => void; // Important!
}



export default function GeneralSettings({
  activeMiniPanel,
  setActiveMiniPanel,
  onEnterChain,
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

// Name Behavior
  const [charNameBehavior, setCharNameBehavior] = useState("none");



  return (
    <div className="space-y-6 text-gray-800 dark:text-white relative">
      {/* Chat Completion Presets */}
      <SectionFrame title="Chat Completion Presets">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-medium text-gray-700 dark:text-white">
            Save / Load Presets
          </h2>
          <Button color="rose" className="text-sm">
            Delete
          </Button>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <Button color="sky">Import</Button>
          <Button color="emerald">Save</Button>
          <Button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"> Update</Button>
          <Button color="indigo">Export</Button>
        </div>
        <label className="block text-sm font-medium mb-1">Select Saved Preset</label>
        <select className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white focus:outline-none">
          <option disabled selected>Default</option>
          <option>Preset 1</option>
          <option>Preset 2</option>
          <option>Preset 3</option>
        </select>
      </SectionFrame>






      {/* Token Control Button */}

      <SectionFrame>
        <Button
          description="Control the number of tokens for LLM response"
          color="slate"
          onClick={() =>
            setActiveMiniPanel(activeMiniPanel === "token" ? null : "token")
          }
        >
          Token Control
        </Button>
        <MiniPanel
          visible={activeMiniPanel === "token"}
          onClose={() => setActiveMiniPanel(null)}
        >
          <h3 className="text-xl font-semibold mb-2">Token Control Panel</h3>
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
      </SectionFrame>





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
      <SectionFrame>
        <Button
          description="LLM Setting stuff"
          color="slate"
          onClick={() =>
            setActiveMiniPanel(activeMiniPanel === "llm" ? null : "llm")
          }
        >
          More LLM Settings
        </Button>
        <MiniPanel
          visible={activeMiniPanel === "llm"}
          onClose={() => setActiveMiniPanel(null)}
        >
          <h3 className="text-xl font-semibold mb-4">More LLM Settings</h3>
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
      </SectionFrame>








      {/* Quick Prompt Panel Button */}
      <SectionFrame>
        <Button
          description="Context snippets sent before user prompt"
          color="slate"
          onClick={() =>
            setActiveMiniPanel(activeMiniPanel === "quick" ? null : "quick")
          }
        >
          Quick Prompt
        </Button>
        <MiniPanel
          visible={activeMiniPanel === "quick"}
          onClose={() => setActiveMiniPanel(null)}
        >
          <h3 className="text-xl font-semibold mb-4">Quick Prompt Edit</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Main</label>
            <textarea
              value={mainPrompt}
              onChange={(e) => setMainPrompt(e.target.value)}
              placeholder="Enter main prompt..."
              className="w-full h-[250px] p-2 border rounded-md resize-none dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Auxiliary</label>
            <textarea
              value={auxPrompt}
              onChange={(e) => setAuxPrompt(e.target.value)}
              placeholder="Enter auxiliary prompt..."
              className="w-full h-[250px] p-2 border rounded-md resize-none dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Post-History Instructions</label>
            <textarea
              value={postHistory}
              onChange={(e) => setPostHistory(e.target.value)}
              placeholder="Enter post-history instructions..."
              className="w-full h-[250px] p-2 border rounded-md resize-none dark:bg-gray-700 dark:text-white"
            />
          </div>
        </MiniPanel>
      </SectionFrame>









      
      
      {/* Character Names Behavior Button */}
      <SectionFrame>
        <Button
          description="When does character name appear"
          color="slate"
          onClick={() =>
            setActiveMiniPanel(
              activeMiniPanel === "characterNames" ? null : "characterNames"
            )
          }
        >
          Character Names Behavior
        </Button>
        <MiniPanel
          visible={activeMiniPanel === "characterNames"}
          onClose={() => setActiveMiniPanel(null)}
        >
          <h3 className="text-xl font-semibold mb-4">Character Name Behavior</h3>

          {/* Choice: None */}
          <div className="mb-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="charName"
                value="none"
                checked={charNameBehavior === "none"}
                onChange={() => setCharNameBehavior("none")}
                className="mt-1 accent-blue-600"
              />
              <div>
                <span className="font-semibold">None</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Never add character name prefixes. May behave poorly in groups, choose with caution.
                </p>
              </div>
            </label>
          </div>

          {/* Choice: Default */}
          <div className="mb-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="charName"
                value="default"
                checked={charNameBehavior === "default"}
                onChange={() => setCharNameBehavior("default")}
                className="mt-1 accent-blue-600"
              />
              <div>
                <span className="font-semibold">Default</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Add prefixes for groups and past personas. Otherwise, make sure you provide names in the prompt.
                </p>
              </div>
            </label>
          </div>

          {/* Choice: Completion Object */}
          <div className="mb-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="charName"
                value="completion"
                checked={charNameBehavior === "completion"}
                onChange={() => setCharNameBehavior("completion")}
                className="mt-1 accent-blue-600"
              />
              <div>
                <span className="font-semibold">Completion Object</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Add character names to completion objects. Restrictions apply: only Latin alphanumerics and underscores.
                </p>
              </div>
            </label>
          </div>

          {/* Choice: Message Content */}
          <div>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="charName"
                value="message"
                checked={charNameBehavior === "message"}
                onChange={() => setCharNameBehavior("message")}
                className="mt-1 accent-blue-600"
              />
              <div>
                <span className="font-semibold">Message Content</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Prepend character names to message contents.
                </p>
              </div>
            </label>
          </div>
        </MiniPanel>
      </SectionFrame>











      {/* Logit Bias Section */}
      <SectionFrame title="Logit Bias (Banning Certain Token)">
        <div className="flex items-center">
          <div className="flex gap-2 pb-4">
            <Button color="emerald" className="text-sm">
              Import
            </Button>
            <Button color="indigo" className="text-sm">
              Export
            </Button>
            <Button color="rose" className="text-sm">
              Delete
            </Button>
            <Button  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm">
              Add New
            </Button>
          </div>
        </div>
        
        <select className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white focus:outline-none">
          <option disabled selected>Select Logit bias config</option>
          <option>Default</option>
          <option>Strict Ban v1</option>
          <option>Soft Filter - Creative</option>
          <option>Custom Rule Set 42</option>
        </select>
      </SectionFrame>











      {/* Custom Chain-Of-Thought */}
      <SectionFrame title="">
        <Button
          description="Custom user defined LLM behaviour"
          color="slate"
          onClick={onEnterChain} // ✅ triggers panel switch
        >
          Custom Chain-of-Thought
        </Button>


          

      </SectionFrame>







    </div>
  );
}
