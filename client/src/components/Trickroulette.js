import React, { useState } from "react";
import "./Trickroulette.css";

class Trick {
  constructor(id, name, difficulty, feature, points, description, image, done) {
    this.id = id;
    this.name = name;
    this.difficulty = difficulty >= 1 && difficulty <= 3 ? difficulty : 1; // Ensuring difficulty is within the range 1-3
    this.feature = feature;
    this.points = points;
    this.description = description;
    this.image = image;
    this.done = done || false; // Defaulting done to false if not provided
  }
}

const tricks = [
  new Trick(
    1,
    "Frontside 180",
    2,
    "Jump",
    50,
    "A trick where the rider rotates 180 degrees in the frontside direction while in the air.",
    "frontside_180.jpg",
    false
  ),
  new Trick(
    2,
    "Backside Boardslide",
    3,
    "Rail",
    80,
    "A trick where the rider slides along a rail with the snowboard perpendicular to the direction of travel, facing backward.",
    "backside_boardslide.jpg",
    true
  ),
  new Trick(
    3,
    "Method Grab",
    2,
    "Jump",
    70,
    "A stylish trick where the rider grabs the heel edge of the snowboard with the rear hand while tweaking the body.",
    "method_grab.jpg",
    false
  ),
  new Trick(
    4,
    "50-50",
    1,
    "Rail",
    30,
    "A basic trick where the rider slides straight along a rail with both the board and body perpendicular to it.",
    "5050.jpg",
    true
  ),
  new Trick(
    5,
    "Switch Backside 360",
    3,
    "Jump",
    90,
    "A challenging trick where the rider rotates 360 degrees in the backside direction while riding switch.",
    "switch_backside_360.jpg",
    false
  ),
  new Trick(
    6,
    "Nosepress",
    2,
    "Rail",
    60,
    "A trick where the rider applies pressure to the nose of the snowboard while sliding along a rail.",
    "nosepress.jpg",
    false
  ),
  new Trick(
    7,
    "Indy Grab",
    2,
    "Jump",
    65,
    "A classic trick where the rider grabs the toe edge of the snowboard with the front hand while tweaking the body.",
    "indy_grab.jpg",
    false
  ),
  new Trick(
    8,
    "Tailslide",
    3,
    "Rail",
    75,
    "A trick where the rider slides along a rail with the tail of the snowboard and the body facing forward.",
    "tailslide.jpg",
    true
  ),
  new Trick(
    9,
    "Cab 540",
    3,
    "Jump",
    85,
    "A trick where the rider rotates 540 degrees in the backside direction while riding switch.",
    "cab_540.jpg",
    false
  ),
  new Trick(
    10,
    "Frontside Boardslide",
    2,
    "Rail",
    70,
    "A trick where the rider slides along a rail with the snowboard perpendicular to the direction of travel, facing forward.",
    "frontside_boardslide.jpg",
    true
  ),
  new Trick(
    11,
    "Method Air",
    3,
    "Jump",
    80,
    "A stylish trick where the rider grabs the heel edge of the snowboard with the rear hand while extending the legs.",
    "method_air.jpg",
    false
  ),
  new Trick(
    12,
    "Lipslide",
    3,
    "Rail",
    75,
    "A trick where the rider slides along a rail with the snowboard and the body facing forward.",
    "lipslide.jpg",
    true
  ),
  new Trick(
    13,
    "Misty Flip",
    3,
    "Jump",
    90,
    "A complex trick where the rider performs a backflip while rotating 540 degrees in the frontside direction.",
    "misty_flip.jpg",
    false
  ),
  new Trick(
    14,
    "Roastbeef Grab",
    2,
    "Jump",
    60,
    "A trick where the rider grabs the heel edge of the snowboard with the rear hand and passes the front leg through the grab.",
    "roastbeef_grab.jpg",
    false
  ),
  new Trick(
    15,
    "Bluntslide",
    3,
    "Rail",
    80,
    "A trick where the rider slides along a rail with the snowboard perpendicular to the direction of travel, with the tail pressed against the rail.",
    "bluntslide.jpg",
    true
  ),
];

const TrickRoulette = ({ tricks }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(1);
  const [selectedFeature, setSelectedFeature] = useState("Jump");
  const [generatedTrick, setGeneratedTrick] = useState(null);

  const handleGenerateTrick = () => {
    // Filter tricks based on selected difficulty and feature
    const filteredTricks = tricks.filter(
      (trick) =>
        trick.difficulty === selectedDifficulty &&
        trick.feature === selectedFeature
    );

    // Randomly select a trick from filteredTricks array
    const randomIndex = Math.floor(Math.random() * filteredTricks.length);
    const randomTrick = filteredTricks[randomIndex];

    // Set the generated trick
    setGeneratedTrick(randomTrick);
  };

  return (
    <div className="main-page">
      <h1>Trick Roulette</h1>

      <div className="roulette-container">
        <div className="selection">
          <label htmlFor="difficulty" className="option-tittle">
            Difficulty:
          </label>
          <select
            className="option-select"
            id="difficulty"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(parseInt(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>

        <div className="selection">
          <label htmlFor="feature" className="option-tittle">
            Feature:
          </label>
          <select
            className="option-select"
            id="feature"
            value={selectedFeature}
            onChange={(e) => setSelectedFeature(e.target.value)}
          >
            <option value="Jump">Jump</option>
            <option value="Rail">Rail</option>
          </select>
        </div>

        <div className="button">
          <button onClick={handleGenerateTrick} className="button-generate">
            Generate Trick
          </button>
        </div>

        <div className="generated-trick">
          <h2>Try this new trick:</h2>
          {generatedTrick ? (
            <div>
              <p className="generated-description">
                <b>Name:</b> {generatedTrick.name}
              </p>
              <p className="generated-description">
                <b>Difficulty:</b> {generatedTrick.difficulty}
              </p>
              <p className="generated-description">
                <b>Feature:</b> {generatedTrick.feature}
              </p>
              <p className="generated-description">
                <b>Description:</b> {generatedTrick.description}
              </p>
            </div>
          ) : (
            <p className="generated-description">
              No trick generated yet. Click the button to generate.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrickRoulette;
