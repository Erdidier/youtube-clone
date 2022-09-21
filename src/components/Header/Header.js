import React, { useState, useContext } from "react";
import "./Header.css";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import AppsIcon from "@material-ui/icons/Apps";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { VideosContext } from "../../Context/VideosContext";

export const Header = () => {
  const [inputSearch, setInputSearch] = useState("");

  const { menu, setMenu } = useContext(VideosContext);

  const toggleMenu = () => {
    setMenu(!menu);
  };
  return (
    <div className="header">
      <div className="header__left">
        <MenuIcon onClick={toggleMenu} />
        <Link
          to="/"
          onClick={() => {
            setInputSearch("");
          }}
        >
          <img
            src="https://i.postimg.cc/gJsPxmDP/Captura-de-Pantalla-2022-08-03-a-la-s-18-06-33.png"
            alt="logo youtube"
            className="header__logo"
          />
        </Link>
      </div>
      <div className="header__input">
        <input
          type="text"
          placeholder="Search"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              window.location.href = `/search/${inputSearch}`;
            }
          }}
        />
        <Link to={`/search/${inputSearch}`} className="header__linkButton">
          <SearchIcon className="header__inputButton" />
        </Link>
      </div>
      <div className="header__icons">
        <VideoCallIcon className="header__icon" />
        <AppsIcon className="header__icon" />
        <NotificationsIcon className="header__icon" />
        <Avatar
          alt="SugamDev"
          src="https://avatars.githubusercontent.com/u/93014692?v=4"
        />
      </div>
      {/* <div className="navbar__center__container">
        <input type="text" className="navbar__search__input" />
      </div>
      <div className="navbar__right__container">
        <p>Right side</p>
      </div> */}
    </div>
  );
};
