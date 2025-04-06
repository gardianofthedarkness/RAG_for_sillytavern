import { IonIcon } from "@ionic/react"
import { sparkles } from "ionicons/icons"
import { useSettings } from "../../store/store"
import { useEffect, ReactNode } from "react"
import sillyLogo from "../../../public/imgs/SillyTavern.png"

export default function GptIntro({ children }: { children: ReactNode }) {
  const setModel = useSettings((state) => state.setModal)

  useEffect(() => {
    setModel("gpt-4")
  }, [setModel])

  return (
    <>
      <div className="flex justify-center gap-4 mt-5">
        {children} {/* <- insert custom buttons from parent */}
        <button
          title="GPT-4"
          className="uppercase rounded p-2 transition dark:text-white dark:bg-dark-primary border-2 dark:border-white border-gray-700 flex items-center justify-center gap-2"
          disabled
        >
          <IonIcon icon={sparkles} />
          {/* Hold up, this need dynamic change */}
          <span>Using: gpt-4</span>
        </button>
      </div>

      {/* Centered SillyTavern Title + Image */}
      <div className="h-96 flex flex-col items-center justify-start mt-5">
        <img
          src={sillyLogo}
          alt="SillyTavern Logo"
          className="mt-4 w-80 h-auto"
        />
      </div>
    </>
  )
}
