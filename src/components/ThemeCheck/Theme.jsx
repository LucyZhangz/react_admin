import React from "react";
import './index.css'
function useAppearance() {
  const isAuto = (val) => !val || val === "auto";

  const getAppearance = (value) => {
    let appearance = value || window.localStorage.getItem("appearance");
    if (isAuto(appearance)) {
      return "light";
    }
    return value;
  };

  const [state, setState] = React.useState(getAppearance);
  const setStateWithLocalStorage = (value) => {
    if (value === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.localStorage.setItem("appearance", value);
    setState(getAppearance(value));
  };

  return [state, setStateWithLocalStorage];
}

export default useAppearance;
