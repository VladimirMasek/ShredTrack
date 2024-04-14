import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <button className="navcomp">Shredtrack</button>

      <div className="navbar-middle">
        <button className="navcomp">Group</button>
        <button className="navcomp">Roulette</button>
        <button className="navcomp">Tricklop</button>
      </div>

      <button className="navcomp">User Icon</button>
    </div>
  );
};

export default Navbar;
