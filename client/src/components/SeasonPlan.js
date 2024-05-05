import React, { useContext, useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import "./SeasonPlan.css";

import { UserContext } from "./UserContext";
import { SeasonPlanListContext } from "./SeasonPlanListContext";
import { TricklistContext } from "./TricklistContext.js";

import { getTrickFinished } from "./Utils.js";

const SeasonPlan = () => {
  const { loggedInUser } = useContext(UserContext);
  const { seasonPlanHandlerMap } = useContext(SeasonPlanListContext);
  const { trickList } = useContext(TricklistContext);
  const [userTrickList, setUserTrickList] = useState([]);

  const handleButtonClick = async (trick) => {
    try {
      if (userTrickList.length === 0) {
        return;
      }
      const finished = getTrickFinished(trick.id, userTrickList) ? 0 : 1;
      const points = trick.points;
      await seasonPlanHandlerMap.handleUpdateAddOrSubtractPoints(
        loggedInUser.id,
        points,
        finished
      );
      await seasonPlanHandlerMap.handleUpdateUserTrickStatus(
        loggedInUser.id,
        trick.id,
        finished
      );
      const updatedUserTrickList = userTrickList.map((item) =>
        item.id === trick.id ? { ...item, finished } : item
      );
      setUserTrickList(updatedUserTrickList);
    } catch (error) {
      console.error("Error updating user trick status:", error);
    }
  };

  useEffect(() => {
    const fetchUserTrickList = async () => {
      if (loggedInUser) {
        try {
          const fetchedUserTrickList =
            await seasonPlanHandlerMap.getUserTrickList(loggedInUser.id);
          setUserTrickList(fetchedUserTrickList);
        } catch (error) {
          console.error("Error fetching user trick list:", error);
          setUserTrickList([]);
        }
      } else {
        setUserTrickList([]);
      }
    };

    fetchUserTrickList();
  }, [loggedInUser, seasonPlanHandlerMap]);

  if (!loggedInUser) {
    return (
      <div style={{ minHeight: "88vh", textAlign: "center" }}>
        <h1>Season plan</h1>
        <p>Please log in to see your Season Plan.</p>
      </div>
    );
  }

  const filteredTrickList = trickList.filter((trick) =>
    userTrickList.find((item) => item.id === trick.id)
  );

  return (
    <div style={{ minHeight: "88vh" }}>
      <h1>Season plan</h1>

      <div className="listContainer">
        <ListGroup className="groupContainer">
          <ListGroup.Item>
            <ListGroup horizontal>
              <ListGroup.Item style={listItem(1, 50)}>
                <b>Name</b>
              </ListGroup.Item>
              <ListGroup.Item style={listItem(1, 28)}>
                <b>Done</b>
              </ListGroup.Item>
              <ListGroup.Item style={listItem(1, 22)}>
                <b>Difficulty</b>
              </ListGroup.Item>
            </ListGroup>
          </ListGroup.Item>

          <ListGroup.Item>
            {filteredTrickList.map((trick, index) => (
              <ListGroup horizontal key={index}>
                <ListGroup.Item
                  style={listItem(index, 50)}
                  key={`name ${trick.id}`}
                >
                  {trick.name}
                </ListGroup.Item>
                <ListGroup.Item
                  style={listItem(index, 28)}
                  key={`button ${trick.id}`}
                >
                  <Button
                    onClick={() => handleButtonClick(trick)}
                    variant={
                      getTrickFinished(trick.id, userTrickList)
                        ? "success"
                        : "secondary"
                    }
                    className="trickButton"
                  >
                    {getTrickFinished(trick.id, userTrickList)
                      ? "Done"
                      : "Not Done"}
                  </Button>{" "}
                </ListGroup.Item>
                <ListGroup.Item
                  style={listItem(index, 22)}
                  key={`difficulty ${trick.id}`}
                >
                  <div
                    className={`difficulty-circle difficulty-${trick.difficulty}`}
                  ></div>
                </ListGroup.Item>
              </ListGroup>
            ))}
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
};

function listItem(index, widthInput) {
  return {
    backgroundColor: index % 2 === 0 ? "lightgrey" : "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: `${widthInput}%`,
    textAlign: "center",
  };
}

export default SeasonPlan;
