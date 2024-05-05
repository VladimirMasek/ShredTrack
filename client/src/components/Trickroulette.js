import React, { useState, useContext, useEffect } from "react";
import "./Trickroulette.css";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { TricklistContext } from "./TricklistContext";

const TrickRoulette = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedFeature, setSelectedFeature] = useState("All");
  const [filteredTricks, setFilteredTricks] = useState([]);
  const [generatedTrick, setGeneratedTrick] = useState(null);
  const [lastGeneratedTrick, setLastGeneratedTrick] = useState(null);
  const [hasChanged, setHasChanged] = useState(false); // Track if input has changed
  const { trickList } = useContext(TricklistContext);

  useEffect(() => {
    // Initialize filteredTricks with the entire trickList on component mount
    setFilteredTricks(trickList);
  }, [trickList]);

  const handleSubmit = async () => {
    try {
      let updatedFilteredTricks = [...trickList]; // Copy trickList

      if (selectedDifficulty !== "All") {
        updatedFilteredTricks = updatedFilteredTricks.filter(
          (trick) => trick.difficulty === parseInt(selectedDifficulty)
        );
      }
      if (selectedFeature !== "All") {
        updatedFilteredTricks = updatedFilteredTricks.filter(
          (trick) =>
            trick.feature.toLowerCase() === selectedFeature.toLowerCase()
        );
      }

      setFilteredTricks(updatedFilteredTricks);
      setHasChanged(false); // Reset hasChanged after submission
    } catch (error) {
      console.error("Error filtering tricks:", error);
    }
  };

  const handleGenerateTrick = () => {
    let randomTrick = getRandomTrick();

    // If no filtered tricks available or if the generated trick is the same as the last one
    if (!randomTrick) {
      // If no filtered tricks available, reset generated trick
      setGeneratedTrick(null);
    } else {
      // Set the generated trick
      setGeneratedTrick(randomTrick);
    }
  };

  const getRandomTrick = () => {
    if (filteredTricks.length === 0) return null;

    // If there's only one trick in the filtered list, return it
    if (filteredTricks.length === 1) return filteredTricks[0];

    let randomIndex = Math.floor(Math.random() * filteredTricks.length);
    let randomTrick = filteredTricks[randomIndex];

    // If the newly generated trick is the same as the last one and there's more than one trick available
    while (randomTrick === lastGeneratedTrick) {
      randomIndex = Math.floor(Math.random() * filteredTricks.length);
      randomTrick = filteredTricks[randomIndex];
    }

    // Set the last generated trick
    setLastGeneratedTrick(randomTrick);

    return randomTrick;
  };

  const handleClearSelection = () => {
    // Reset selected difficulty and feature to "All"
    setSelectedDifficulty("All");
    setSelectedFeature("All");
    // Clear filtered tricks and generated trick
    setFilteredTricks(trickList);
    setGeneratedTrick(null);
    setLastGeneratedTrick(null);
    setHasChanged(false); // Reset hasChanged

    // Check if both inputs were already "All" before clicking the clear button
    if (selectedDifficulty === "All" && selectedFeature === "All") {
      // If they were, don't change the variant of the submit button
      return;
    }

    // Otherwise, set hasChanged to true to change the submit button variant
    setHasChanged(true);
  };

  // Determine the variant for the submit button based on submission status
  const submitButtonVariant = hasChanged ? "outline-secondary" : "secondary";

  // Render a placeholder message when no trick is generated yet
  const generatedTrickContent = generatedTrick ? (
    <>
      <Card.Img
        variant="top"
        src={require(`../images/${generatedTrick.image}`)}
      />
      <Card.Body>
        <Card.Title>{generatedTrick.name}</Card.Title>
        <Card.Text>
          <div>
            <b style={{ marginRight: "10px" }}>Description:</b>
            {generatedTrick.description}
          </div>
          <div>
            <b style={{ marginRight: "10px" }}>Difficulty:</b>
            {generatedTrick.difficulty}
          </div>
        </Card.Text>
      </Card.Body>
    </>
  ) : (
    <Card.Body>
      <Card.Title>No trick generated yet</Card.Title>
    </Card.Body>
  );

  return (
    <div style={{ minHeight: "90vh" }}>
      <h1>Trick Roulette</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <div className="cardContainer" style={{ width: "90vw" }}>
          <Row xs={1} md={2} className="g-4" style={{ height: "100%" }}>
            <Col className="trickCol">
              <Card>
                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    <b>Random Trick</b>
                  </Card.Title>
                  <Card.Text>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignSelf: "center",
                        justifyItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "baseline",
                        }}
                      >
                        <h5 style={{ marginRight: "auto" }}>Difficulty:</h5>
                        <select
                          className="form-select form-select-lg mb-3"
                          aria-label=".form-select-lg example"
                          style={{ width: "25%" }}
                          value={selectedDifficulty}
                          onChange={(e) => {
                            setSelectedDifficulty(e.target.value);
                            setHasChanged(true); // Set hasChanged on input change
                          }}
                        >
                          <option value="All">All</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "baseline",
                        }}
                      >
                        <h5 style={{ marginRight: "auto" }}>Feature:</h5>

                        <select
                          className="form-select form-select-lg mb-3"
                          aria-label=".form-select-lg example"
                          style={{ width: "25%" }}
                          value={selectedFeature}
                          onChange={(e) => {
                            setSelectedFeature(e.target.value);
                            setHasChanged(true); // Set hasChanged on input change
                          }}
                        >
                          <option value="All">All</option>
                          <option value="jump">Jump</option>
                          <option value="rail">Rail</option>
                        </select>
                      </div>
                      <div className="buttons">
                        <Button
                          variant={submitButtonVariant} // Use dynamic variant
                          style={{ width: "25%" }}
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>{" "}
                        <Button
                          variant="secondary"
                          style={{ width: "25%" }}
                          onClick={handleClearSelection}
                        >
                          Clear
                        </Button>{" "}
                      </div>
                      <Button
                        variant="primary"
                        size="lg"
                        style={{
                          marginTop: "10%",
                          alignSelf: "center",
                          width: "50%",
                        }}
                        onClick={handleGenerateTrick}
                      >
                        Generate Trick
                      </Button>{" "}
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col
              key={generatedTrick ? generatedTrick.id : "no-trick"}
              className="trickCol"
            >
              <Card style={{ height: "100%" }}>{generatedTrickContent}</Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default TrickRoulette;
