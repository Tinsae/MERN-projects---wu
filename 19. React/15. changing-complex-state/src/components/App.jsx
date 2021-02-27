import React, { useState } from "react";
function App() {
  let [fullName, setFullName] = useState({
    fName: "",
    lName: ""
  });

  function handleChange(event) {
    // let newValue = event.target.value;
    // let inputName = event.target.name;

    // it is important to access event outside state
    // otherwise you will get Syntetic event warning
    let { value, name } = event.target;
    setFullName((prevValue) => {
      if (name === "fName") {
        return {
          fName: value,
          lName: prevValue.lName
        };
      } else {
        return {
          fName: prevValue.fName,
          lName: value
        };
      }
    });

    // other way
    // if (inputName === "fName") {
    //   setFullName({ fName: newValue, lName: fullName.lName });
    // } else {
    //   setFullName({ fName: fullName.fName, lName: newValue });
    // }
  }

  return (
    <div className="container">
      <h1>{`Hello ${fullName.fName} ${fullName.lName}`}</h1>
      <form>
        <input
          onChange={handleChange}
          name="fName"
          placeholder="First Name"
          value={fullName.fName}
        />
        <input
          onChange={handleChange}
          name="lName"
          placeholder="Last Name"
          value={fullName.lName}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
