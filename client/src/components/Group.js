import "./Group.css";

class User {
  constructor(id, name, surname, role, points) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.role = role;
    this.points = points;
  }
}

const users = [
  new User(1, "Mark", "McMorris", "Snowboarder", 150),
  new User(2, "Travis", "Rice", "Snowboarder", 120),
  new User(3, "Chloe", "Kim", "Snowboarder", 90),
  new User(4, "Shaun", "White", "Snowboarder", 80),
  new User(5, "Jamie", "Anderson", "Snowboarder", 110),
  new User(6, "Ayumu", "Hirano", "Snowboarder", 100),
  new User(7, "Kelly", "Clark", "Snowboarder", 70),
  new User(8, "Torstein", "Horgmo", "Snowboarder", 130),
  new User(9, "Elena", "Hight", "Snowboarder", 95),
  new User(10, "Sebastien", "Toutant", "Snowboarder", 85),
  new User(11, "Hannah", "Teter", "Snowboarder", 140),
  new User(12, "Ståle", "Sandbech", "Snowboarder", 75),
  new User(13, "Silje", "Norendal", "Snowboarder", 105),
  new User(14, "Kevin", "Pearce", "Snowboarder", 115),
  new User(15, "Scotty", "Lago", "Snowboarder", 125),
];

users.sort((a, b) => b.points - a.points);

const Group = () => {
  let rowIndex = 0;

  return (
    <div>
      <h1>Group name</h1>

      <div className="heading">
        <p className="group-heading-1">Position</p>
        <p className="group-heading-2">Name</p>
        <p className="group-heading-3">Points</p>
      </div>

      <div className="group-container">
        <div className="group-column-1">
          {users.map((user) => (
            <div
              key={user.id}
              className={`group-position second-${
                rowIndex++ % 2 === 0 ? 1 : 0
              }`}
            >
              <div className="group-userPosition">{rowIndex}</div>
            </div>
          ))}
        </div>

        <div className="group-column-2">
          {users.map((user) => (
            <div
              className={`group-name second-${rowIndex++ % 2 === 1 ? 1 : 0}`}
              key={user.id}
            >
              <div className="group-userName">
                {`${user.name} ${user.surname}`}
              </div>
            </div>
          ))}
        </div>

        <div className="group-column-3">
          {users.map((user) => (
            <div
              className={`group-points second-${rowIndex++ % 2 === 0 ? 1 : 0}`}
              key={user.id}
            >
              <div className="group-userPoints">{user.points}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Group;
