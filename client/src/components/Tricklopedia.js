import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { SeasonPlanListContext } from "./SeasonPlanListContext";
import { TricklistContext } from "./TricklistContext.js";

import { getTrickFinished } from "./Utils.js";

const Tricklopedia = () => {
  const { loggedInUser } = useContext(UserContext);
  const { trickList } = useContext(TricklistContext);
  const { seasonPlanHandlerMap } = useContext(SeasonPlanListContext);
  const [userTrickList, setUserTrickList] = useState([]);

  useEffect(() => {
    const fetchUserTrickList = async () => {
      if (loggedInUser) {
        try {
          const fetchedUserTrickList =
            await seasonPlanHandlerMap.getUserTrickList(loggedInUser.id);
          setUserTrickList(fetchedUserTrickList || []);
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

  const isTrickInSeasonPlan = (trickId) => {
    return (
      Array.isArray(userTrickList) &&
      (userTrickList.some((trick) => trick.id === trickId) ? 1 : 0)
    );
  };

  const handleUpdateAddOrRemoveTrick = async (trickId) => {
    try {
      const isInSeasonPlan = isTrickInSeasonPlan(trickId);
      await seasonPlanHandlerMap.handleUpdateAddOrRemoveTrick(
        loggedInUser.id,
        trickId,
        isInSeasonPlan
      );
      if (isInSeasonPlan) {
        const trick = trickList.find((trick) => trick.id === trickId);
        if (!trick) {
          console.error("Trick not found in the trickList");
          return;
        }
        if (getTrickFinished(trickId, userTrickList)) {
          await seasonPlanHandlerMap.handleUpdateAddOrSubtractPoints(
            loggedInUser.id,
            trick.points,
            0
          );
        }
      }
    } catch (error) {
      console.error("Error updating trick status:", error);
    }
  };

  return (
    <div
      style={{ minHeight: "88vh", paddingLeft: "10px", paddingRight: "10px" }}
    >
      <h1>Tricklopedia</h1>
      <Row xs={1} md={2} className="g-4">
        {trickList.map((trick) => (
          <Col key={trick.id}>
            <Card>
              <Card.Img
                style={{ objectFit: "cover" }}
                variant="top"
                src={require(`../images/${trick.image}`)}
              />
              <Card.Body>
                <Card.Title>{trick.name}</Card.Title>
                <Card.Text style={{ minHeight: "15vh" }}>
                  <div>
                    <b style={{ marginRight: "10px" }}>Description:</b>
                    {trick.description}
                  </div>
                  <div>
                    <b style={{ marginRight: "10px" }}>Difficulty:</b>
                    {trick.difficulty}
                  </div>
                  {loggedInUser && (
                    <Button
                      style={{ marginTop: "10px" }}
                      variant={
                        isTrickInSeasonPlan(trick.id) ? "danger" : "success"
                      }
                      onClick={() => handleUpdateAddOrRemoveTrick(trick.id)}
                      disabled={!loggedInUser}
                    >
                      {isTrickInSeasonPlan(trick.id)
                        ? "Remove from season plan"
                        : "Add to season plan"}
                    </Button>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Tricklopedia;
