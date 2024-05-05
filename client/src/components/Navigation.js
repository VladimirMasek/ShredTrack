import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "./UserContext";

import Icon from "@mdi/react";
import { mdiLogout } from "@mdi/js";

function Navigation() {
  const { userList, loggedInUser, handlerMap } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          ShredTrack
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/seasonplan">
              SeasonPlan
            </Nav.Link>
            <Nav.Link as={Link} to="/group">
              Groups
            </Nav.Link>
            <Nav.Link as={Link} to="/trickroulette">
              TrickRoulette
            </Nav.Link>
            <Nav.Link as={Link} to="/tricklopedia">
              Tricklopedia
            </Nav.Link>
            <NavDropdown
              title={loggedInUser ? loggedInUser.name : "Log in"}
              drop={"end"}
            >
              {getUserMenuList({ userList, loggedInUser, handlerMap })}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function getUserMenuList({ userList, loggedInUser, handlerMap }) {
  // temporary solution to enable login/logout
  const userMenuItemList = userList.map((user) => (
    <NavDropdown.Item key={user.id} onClick={() => handlerMap.login(user.id)}>
      {user.name}
    </NavDropdown.Item>
  ));

  if (loggedInUser) {
    userMenuItemList.push(<NavDropdown.Divider key={"divider"} />);
    userMenuItemList.push(
      <NavDropdown.Item
        key={"logout"}
        onClick={() => handlerMap.logout()}
        style={{ color: "red" }}
      >
        <Icon path={mdiLogout} size={0.8} color={"red"} /> {"Log out"}
      </NavDropdown.Item>
    );
  }

  return userMenuItemList;
}

export default Navigation;
