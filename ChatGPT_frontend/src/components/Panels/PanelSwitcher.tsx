import { useState, useEffect } from "react";
import Panel from "./Panel";
import GeneralSettings from "../Panels/General";
import ChainOfThoughtPanel from "./ChainOfThoughtPanel";

interface PanelSwitcherProps {
  visible: boolean;
  onClose: () => void;
  activeMiniPanel: string | null;
  setActiveMiniPanel: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function PanelSwitcher({
  visible,
  onClose,
  activeMiniPanel,
  setActiveMiniPanel,
}: PanelSwitcherProps) {
  const [panelLayer, setPanelLayer] = useState<"general" | "cot">("general");
  const [animate, setAnimate] = useState(false);
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
  
    if (visible) {
      setShouldRender(true);
      timeout = setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      timeout = setTimeout(() => {
        setShouldRender(false);
        setPanelLayer("general"); // 🔁 Reset to default view
      }, 500); // Match your animation duration
    }
  
    return () => clearTimeout(timeout);
  }, [visible]);
  

    useEffect(() => {
        if (!visible) {
          setActiveMiniPanel(null);
        }
    }, [visible, setActiveMiniPanel]);
      

  if (!shouldRender) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-500 z-40 ${
          animate ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
        {/* General Settings Panel */}
        <Panel
            visible={panelLayer === "general"}
            title="General Settings"
            // When user clicks outside or the ❌, we do two things:
            //   1) Trigger parent onClose (which sets activePanel = null)
            //   2) Also setActiveMiniPanel(null)
            onClose={() => {
                onClose();
                setActiveMiniPanel(null);
            }}
            // If user clicks “empty space” within the panel’s content area:
            onEmptyClick={() => setActiveMiniPanel(null)}
            className={`absolute top-0 right-0 transition-transform duration-500 pointer-events-auto ${
                animate ? "translate-x-0" : "translate-x-full"
            }`}
            >
            <GeneralSettings
                activeMiniPanel={activeMiniPanel}
                setActiveMiniPanel={setActiveMiniPanel}
                // If we jump to the COT panel, also close any open mini-panel
                onEnterChain={() => {
                setPanelLayer("cot");
                setActiveMiniPanel(null);
                }}
            />
            </Panel>

            <Panel
            visible={panelLayer === "cot"}
            title="Custom Chain-of-Thought"
            // Switch back to 'general' on close
            onClose={() => {
                setPanelLayer("general");
                setActiveMiniPanel(null);
            }}
            // Same approach: clicking empty space
            onEmptyClick={() => setActiveMiniPanel(null)}
            className={`absolute top-0 right-0 transition-transform duration-500 pointer-events-auto ${
                animate ? "translate-x-0" : "translate-x-full"
            }`}
            >
            <ChainOfThoughtPanel />
            </Panel>
      </div>
    </>
  );
}
