import SeasonPlan from "./components/SeasonPlan.js";
import Group from "./components/Group.js";
import Trickroulette from "./components/Trickroulette.js";
import Tricklopedia from "./components/Tricklopedia.js";
import Home from "./components/Home.js";

import Layout from "./components/Layout.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserProvider from "./components/UserProvider";
import TricklistProvider from "./components/TricklistProvider";
import UserListProvider from "./components/UserListProvider";
import SeasonPlanListProvider from "./components/SeasonPlanListProvider";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="SeasonPlan"
                element={
                  <TricklistProvider>
                    <SeasonPlanListProvider>
                      <SeasonPlan />
                    </SeasonPlanListProvider>
                  </TricklistProvider>
                }
              />
              <Route
                path="Group"
                element={
                  <UserListProvider>
                    <Group />
                  </UserListProvider>
                }
              />

              <Route
                path="Trickroulette"
                element={
                  <TricklistProvider>
                    <Trickroulette />
                  </TricklistProvider>
                }
              />

              <Route
                path="Tricklopedia"
                element={
                  <SeasonPlanListProvider>
                    <TricklistProvider>
                      <Tricklopedia />
                    </TricklistProvider>
                  </SeasonPlanListProvider>
                }
              />

              <Route path="*" element={"not found"} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
