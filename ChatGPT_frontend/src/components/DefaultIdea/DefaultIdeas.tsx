import DefaultIdea from "./DefaultIdea";

const defaultIdeas = [
  {
    idea: "Who is the main character?",
    moreContext: "Outputting all info of the main character",
  },
  // {
  //   idea: "Give me code snippet",
  //   moreContext:
  //     "Give me a code snippet to create a database schema for a social media app",
  // },
  { idea: "Tell me a joke about the main character", moreContext: "Tell me a joke about the main character" },
  // {
  //   idea: "Design redux store",
  //   moreContext: " Design a redux store for a social media app",
  // },
];

export default function DefaultIdeas({ visible = true }) {
  return (
    <div className={`row1 ${visible ? "block" : "hidden"}`}>
      {/* <DefaultIdea ideas={defaultIdeas.slice(0, 2)} /> */}
      <DefaultIdea
        ideas={defaultIdeas.slice(0, 2)}
        myclassNames="hidden md:visible"
      />
    </div>
  );
}
