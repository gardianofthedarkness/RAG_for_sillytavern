import { IonIcon } from "@ionic/react";
import classNames from "classnames";
import { sendOutline, send } from "ionicons/icons";
import { useRef, useState } from "react";
import useChat, { useSettings } from "../../store/store";
import { createMessage } from "../../utils/createMessage";

export default function UserQuery() {
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false); // dropdown state
  const formRef = useRef<null | HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const addChat = useChat((state) => state.addChat);
  const selectedModal = useSettings((state) => state.settings.selectedModal);

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLTextAreaElement;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (formRef.current) {
        formRef.current.requestSubmit();
        target.style.height = "30px";
      }
    }
  }

  function handleOnInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLTextAreaElement;
    setQuery(target.value);
    target.style.height = "0px";
    target.style.height = `${target.scrollHeight}px`;
  }

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (query) {
      addChat(createMessage("user", query, "text"));
      addChat(
        createMessage(
          "assistant",
          "",
          selectedModal.startsWith("dall-e") ? "image_url" : "text"
        )
      );
      setQuery("");
      if (textareaRef.current) textareaRef.current.style.height = "30px";
    }
  }

  return (
    <div className="relative w-full">
      {/* Dropdown Menu Button (left of input) */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="p-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          ☰
        </button>
        {/* On hold, dropdown menu for more functionalities */}
        {dropdownOpen && (
          <div className="absolute right-full bottom-0 translate-x-[-20px] translate-y-[5px] w-48 bg-white dark:bg-gray-800 border rounded shadow-lg z-50">
            <button
              onClick={() => {
                console.log("Upload Story clicked");
                setDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Upload Story
            </button>
            <button
              onClick={() => {
                console.log("Option 2 clicked");
                setDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Option 2
            </button>
          </div>
        )}
      </div>

      {/* Input + Send Button */}
      <form
        className="input pl-14 shadow-md dark:bg-[#40414f] bg-white dark:border-white border-gray-700 border-2 flex items-center rounded-md"
        onSubmit={handleOnSubmit}
        ref={formRef}
      >
        <div className="w-11/12 p-2">
          <textarea
            name="query"
            ref={textareaRef}
            className="h-6 px-2 w-full outline-none resize-none dark:bg-transparent dark:text-white placeholder:font-bold"
            placeholder="Send a message"
            onKeyDown={handleOnKeyDown}
            onChange={handleOnInputChange}
            value={query}
            autoFocus
          ></textarea>
        </div>
        <div className="w-1/12 text-center mx-2">
          <button
            type="submit"
            className={classNames(
              "text-center text-gray-600 dark:text-white transition inline-flex items-center justify-center py-2 px-2 rounded-md",
              { "bg-green-500 dark:text-gray-200 text-white": query }
            )}
          >
            <IonIcon icon={query ? send : sendOutline} />
          </button>
        </div>
      </form>
    </div>
  );
}
