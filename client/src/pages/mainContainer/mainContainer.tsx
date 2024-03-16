import { Outlet } from "react-router-dom";
import { Header, SidePanel } from "../../components";
import "./mainContainer.scss";
import { useState } from "react";
const Body = () => {
  const [burger, setBurger] = useState(true);
  window.addEventListener("resize", (e: Event) => {
    const windowEvent = e.target as Window;
    if (windowEvent.screen.width >= 480) {
      setBurger(true);
    }
  });
  return (
    <div className="mainContainer">
      <Header setBurger={setBurger} burger={burger} />
      <div className="mainContainer_wrap">
        <SidePanel burger={burger} setBurger={setBurger} />
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
