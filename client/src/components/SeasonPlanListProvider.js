import { useEffect, useState } from "react";
import { SeasonPlanListContext } from "./SeasonPlanListContext.js";

function SeasonPlanListProvider({ children }) {
  const [seasonPlanLoadObject, setSeasonPlanLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setSeasonPlanLoadObject((current) => ({
      ...current,
      state: "pending",
    }));
    const response = await fetch(`http://localhost:3001/seasonPlan/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      setSeasonPlanLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setSeasonPlanLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function getUserTrickList(userId) {
    const response = await fetch(
      `http://localhost:3001/seasonPlan/getUserTrickList?id=${userId}`,
      {
        method: "GET",
      }
    );
    const responseJson = await response.json();
    if (response.status < 400) {
      return responseJson;
    } else {
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleUpdateUserTrickStatus(userId, trickId, finished) {
    const dtoIn = { userId, trickId, finished };
    const response = await fetch(
      `http://localhost:3001/seasonPlan/updateUserTrickStatus`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dtoIn),
      }
    );
    const responseJson = await response.json();

    if (response.status < 400) {
      // Update the season plan list if necessary
      if (responseJson) {
        setSeasonPlanLoadObject((current) => {
          const seasonPlanIndex = current.data.findIndex(
            (e) => e.id === responseJson.id
          );
          current.data[seasonPlanIndex] = responseJson;
          return { state: "ready", data: current.data };
        });
      }
      return responseJson;
    } else {
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleUpdateAddOrRemoveTrick(userId, trickId, exists) {
    const dtoIn = { userId, trickId, exists };
    const response = await fetch(
      `http://localhost:3001/seasonPlan/updateAddOrRemoveTrick`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dtoIn),
      }
    );
    const responseJson = await response.json();

    if (response.status < 400) {
      // Update the season plan list if necessary
      if (responseJson) {
        setSeasonPlanLoadObject((current) => {
          const seasonPlanIndex = current.data.findIndex(
            (e) => e.id === responseJson.id
          );
          current.data[seasonPlanIndex] = responseJson;
          return { state: "ready", data: current.data };
        });
      }
      return responseJson;
    } else {
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleUpdateAddOrSubtractPoints(
    userId,
    points,
    addOrSubtract
  ) {
    const dtoIn = { userId, points, addOrSubtract };
    const response = await fetch(
      `http://localhost:3001/user/updateAddOrSubtractPoints`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dtoIn),
      }
    );
    const responseJson = await response.json();

    if (response.status < 400) {
      // Update the user if necessary
      if (responseJson) {
        setSeasonPlanLoadObject((current) => {
          const userIndex = current.data.findIndex(
            (e) => e.id === responseJson.id
          );
          current.data[userIndex] = responseJson;
          return { state: "ready", data: current.data };
        });
      }
      return responseJson;
    } else {
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: seasonPlanLoadObject.state,
    seasonPlanList: seasonPlanLoadObject.data || [],
    seasonPlanHandlerMap: {
      getUserTrickList,
      handleUpdateUserTrickStatus,
      handleUpdateAddOrRemoveTrick,
      handleUpdateAddOrSubtractPoints,
    },
  };

  return (
    <SeasonPlanListContext.Provider value={value}>
      {children}
    </SeasonPlanListContext.Provider>
  );
}

export default SeasonPlanListProvider;
