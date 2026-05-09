import { useState } from "react";
import "./App.css";
import GenSelect from "./components/GenSelect";
import StateMachine from "./components/StateMachine";

/**
 * What is my vision?
 *
 * Basically a UI for spillsbey's roll for bey.
 * You just have to roll a bunch of dice and get results
 * 1. Choose gen - X or MF
 * 2. Split into wizards based on choice
 * 3. Wizard for X
 *    a. Roll for type (CX, BX, UX) for first bey and second bey
 *    b. Based on type, resolve each beyblade separately based on dice rolls
 *    c. Show both resulting beyblade parts
 *    Wizard for MF
 *    a. Roll for each part for each bey individually. Keep a list of incompatible parts like L-Drago
 *    c. Show both resulting beyblade parts
 * 4. Thats it for now
 *
 * Workflow
 * 1. Parse the CSV. This is just for me so i'm using my own dataset.
 * 2. Save the entire sheet in memory. Not many rows, 30-50 max.
 * 3. Based on gen choice, filter the sheet and generate part lists
 * 4. Dynamically create wizard based on gen choice
 * 5. Create randomizer util
 */

function App() {
  const [gen, setGen] = useState("");

  if (!gen) {
    return <GenSelect changeCurrentStep={setGen} />;
  }
  return (
    <div>
      <div>
        <StateMachine firstStep={gen} id={1} />
      </div>
      <div>
        <StateMachine firstStep={gen} id={2} />
      </div>
      <button onClick={() => setGen("")}>Restart</button>
    </div>
  );
}

export default App;
