import { useEffect, useState } from "react";
import { TricklistContext } from "./TricklistContext.js";

function TricklistProvider({ children }) {
  const [tricklistLoadObject, setTricklistLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setTricklistLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:3001/trick/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      setTricklistLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setTricklistLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: tricklistLoadObject.state,
    trickList: tricklistLoadObject.data || [],
    handlerMap: {},
  };

  return (
    <TricklistContext.Provider value={value}>
      {children}
    </TricklistContext.Provider>
  );
}

export default TricklistProvider;
