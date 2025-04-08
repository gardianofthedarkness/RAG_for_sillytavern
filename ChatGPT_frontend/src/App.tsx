import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import DefaultIdeas from "./components/DefaultIdea/DefaultIdeas";
import UserQuery from "./components/UserInput/UserQuery";
import GptIntro from "./components/Ui/TopMenu";
import TopMenuButton from "./components/Ui/TopMenuButton";
import { IonIcon, setupIonicReact } from "@ionic/react";
import { menuOutline, addOutline } from "ionicons/icons";
import Header from "./components/Header/Header";
import useChat, { chatsLength, useAuth, useTheme } from "./store/store";
import classNames from "classnames";
import Chats from "./components/Chat/Chats";
import Modal from "./components/modals/Modal";
import Apikey from "./components/modals/Apikey";
import Panel from "./components/Panels/Panel";
import GeneralSettings from "./components/Panels/General";

import Button from "./components/Ui/button";

setupIonicReact();
function App() {

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
  //     <Button style={{ backgroundColor: "#808080", color: "#111" }}>
  //       Test Inline
  //     </Button>
  //   </div>
  // )


  const [active, setActive] = useState(false);
  const isChatsVisible = useChat(chatsLength);
  const addNewChat = useChat((state) => state.addNewChat);
  const userHasApiKey = useAuth((state) => state.apikey);
  const [theme] = useTheme((state) => [state.theme]);
  // The state for all panel
  const [activePanel, setActivePanel] = useState<null | string>(null);
  // The state for mini panel
  const [activeMiniPanel, setActiveMiniPanel] = useState<null | string>(null);


  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="App  font-montserrat md:flex ">
      <Navbar active={active} setActive={setActive} />
      <div className="">
        <button
          type="button"
          className="shadow fixed p-2 h-8 w-8 text-sm top-4 left-4 border-2 hidden md:inline-flex dark:text-white text-gray-700 dark:border border-gray-400 rounded-md items-center justify-center"
          onClick={() => setActive(true)}
        >
          <i className="fa-regular fa-window-maximize rotate-90"></i>
        </button>
      </div>
      <div className="p-3 z-10 flex items-center justify-between bg-[#202123] dark:bg-[#343541] border-b sticky top-0  text-gray-300 md:hidden">
        <button onClick={() => setActive(true)} className=" text-2xl flex">
          <IonIcon icon={menuOutline} />
        </button>
        <h2>New chat</h2>
        <button className="text-2xl flex items-center" onClick={addNewChat}>
          <IonIcon icon={addOutline} />
        </button>
      </div>
      <main
        className={classNames(" w-full transition-all duration-500", {
          "md:ml-[0px]": active,
        })}
      >
        {/* Hold on, this is the header for the menu */}
        {isChatsVisible ? (
          <Header />
        ) : (
        <GptIntro>
          {/* General settings */}
          <TopMenuButton label="General Settings" onClick={() => setActivePanel("settings")} />
          <Panel
            visible={activePanel === "settings"}
            onClose={() => {
              setActivePanel(null);
              setActiveMiniPanel(null);
            }}
            onEmptyClick={() => {
              setActiveMiniPanel(null); // 👈 this will close the mini panel when empty space clicked
            }}
            title="General Settings"
          >
            <GeneralSettings
              activeMiniPanel={activeMiniPanel}
              setActiveMiniPanel={setActiveMiniPanel}
            />
          </Panel>

          









































          
          <TopMenuButton label="Character Management" onClick={() => setActivePanel("characters")} />
          <TopMenuButton label="Users Management" onClick={() => setActivePanel("users")} />
        </GptIntro>
        )}
        {isChatsVisible && <Chats />}
        <div
          className={classNames(
            "fixed left-0 px-2  right-0 transition-all duration-500 bottom-0 dark:shadow-lg py-1 shadow-md backdrop-blur-sm bg-white/10 dark:bg-dark-primary/10",
            {
              "dark:bg-dark-primary bg-white": isChatsVisible,
              "md:ml-[0px]": active,
            }
          )} 
        >
          <div className="max-w-2xl md:max-w-[calc(100% - 260px)] mx-auto">
            {!isChatsVisible && (
              <>
                <DefaultIdeas />
              </>
            )}

            <div className="dark:bg-inherit">
              <UserQuery />
            </div>
          </div>
        </div>
      </main>
      <Modal visible={!Boolean(userHasApiKey)}>
        <Apikey />
      </Modal>
    </div>
  );
}

export default App;
