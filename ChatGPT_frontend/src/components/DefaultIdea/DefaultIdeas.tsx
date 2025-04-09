import DefaultIdea from "./DefaultIdea";

// hold up, this part allows user to select the exact tokens matching their question
const defaultIdeas = [
  {
    idea: "This part lets user select the closest tokens",
    moreContext: "This part lets user select the closest tokens",
  },
  // {
  //   idea: "Give me code snippet",
  //   moreContext:
  //     "Give me a code snippet to create a database schema for a social media app",
  // },
  { idea: "This part lets user select the closest tokens", 
    moreContext: "This part lets user select the closest tokens" },
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
