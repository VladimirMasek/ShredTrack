import { useEffect, useState } from "react";
import { UserListContext } from "./UserListContext.js";

function UserListProvider({ children }) {
  const [userListLoadObject, setUserListLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  const [groupListLoadObject, setGroupListLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setGroupListLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:3001/group/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      setGroupListLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setGroupListLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleGetUserListByIds(members) {
    setUserListLoadObject((current) => ({ ...current, state: "pending" }));
    const dtoIn = { members: members };

    const response = await fetch(
      `http://localhost:3001/user/getUserListByIds`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dtoIn),
      }
    );
    const responseJson = await response.json();
    console.log(responseJson);
    if (response.status < 400) {
      return responseJson;
    } else {
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleUpdate(dtoIn) {
    setUserListLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:3001/user/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setUserListLoadObject((current) => {
        const userIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data[userIndex] = responseJson;
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setUserListLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleGetUsersGroups(userId) {
    setGroupListLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:3001/group/getUsersGroups?userId=${userId}`,
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

  const value = {
    state: groupListLoadObject.state,
    groupListList: groupListLoadObject.data || [],
    userHandlerMap: {
      handleUpdate,
      handleGetUsersGroups,
      handleGetUserListByIds,
    },
  };

  return (
    <UserListContext.Provider value={value}>
      {children}
    </UserListContext.Provider>
  );
}

export default UserListProvider;
