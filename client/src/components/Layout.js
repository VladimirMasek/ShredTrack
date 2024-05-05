import { Outlet } from "react-router-dom";

import Navigation from "./Navigation";

const Layout = () => {
  return (
    <>
      <div className="card-header">
        <Navigation />
      </div>
      <div>
        <Outlet />
      </div>
      <div className="card-footer" style={footerStyle()}>
        © Vladimír Mašek
      </div>
    </>
  );
};

function footerStyle() {
  return {
    padding: "8px",
    textAlign: "center",
    backgroundColor: "##E0EDFA",
    minHeight: "5vh",
  };
}

export default Layout;
