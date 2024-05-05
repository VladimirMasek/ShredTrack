import React, { useContext, useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Carousel from "react-bootstrap/Carousel";
import { UserContext } from "./UserContext";
import { UserListContext } from "./UserListContext.js";

const Group = () => {
  const { userHandlerMap } = useContext(UserListContext);
  const { loggedInUser } = useContext(UserContext);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (loggedInUser && !groups.length) {
      userHandlerMap
        .handleGetUsersGroups(loggedInUser.id)
        .then((groups) => {
          Promise.all(
            groups.map((group) =>
              userHandlerMap.handleGetUserListByIds(group.members)
            )
          ).then((userLists) => {
            const groupsWithUsers = groups.map((group, index) => ({
              ...group,
              users: userLists[index],
            }));
            setGroups(groupsWithUsers);
          });
        })
        .catch((error) => {
          console.error("Error fetching groups:", error);
        });
    }
  }, [loggedInUser, userHandlerMap, groups]);

  if (!loggedInUser) {
    return (
      <div style={{ minHeight: "88vh", textAlign: "center" }}>
        <h1>Group</h1>
        <p>Please log in to see your Groups.</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "88vh" }}>
      <h1>Groups</h1>
      <Carousel
        style={{ minHeight: "80vh", paddingBottom: "5%" }}
        variant="dark"
      >
        {groups.map((group, groupIndex) => (
          <Carousel.Item key={groupIndex}>
            <div
              className="carousel-caption-top"
              style={{ textAlign: "center" }}
            >
              <h4>{group.name}</h4>
            </div>
            <div className="listContainer">
              <ListGroup className="groupContainer">
                <ListGroup.Item>
                  <ListGroup horizontal>
                    <ListGroup.Item style={listItem(1, 25)}>
                      <b>Position</b>
                    </ListGroup.Item>
                    <ListGroup.Item style={listItem(1, 50)}>
                      <b>Name</b>
                    </ListGroup.Item>
                    <ListGroup.Item style={listItem(1, 25)}>
                      <b>Points</b>
                    </ListGroup.Item>
                  </ListGroup>
                </ListGroup.Item>
                <ListGroup.Item>
                  {group.users.map((user, userIndex) => (
                    <ListGroup horizontal key={`${groupIndex}-${userIndex}`}>
                      <ListGroup.Item style={listItem(userIndex, 25)}>
                        {userIndex + 1}
                      </ListGroup.Item>
                      <ListGroup.Item style={listItem(userIndex, 50)}>
                        {user.name} {user.surname}
                      </ListGroup.Item>
                      <ListGroup.Item style={listItem(userIndex, 25)}>
                        {user.points}
                      </ListGroup.Item>
                    </ListGroup>
                  ))}
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

const listItem = (index, widthInput) => {
  return {
    backgroundColor: index % 2 === 0 ? "lightgrey" : "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: `${widthInput}%`,
    textAlign: "center",
  };
};

export default Group;
