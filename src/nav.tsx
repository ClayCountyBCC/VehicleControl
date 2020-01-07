import React from 'react';
import { Store } from './Store';

const Nav = () =>
{
  const { state, dispatch } = React.useContext(Store);

  const closeBaseMapDropdown = () =>
  {
    let e = document.getElementById("nav_basemap_dropdown");
    if (e === null) return;
    e.classList.remove("is-active");
  }

  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <h1 className="navbar-item is-size-3 has-text-weight-bold">Vehicle Control</h1>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <p
            onClick={event =>
            {
              dispatch({ type: "set_current_view", payload: "unit" });
            }}
            className={`navbar-item is-tab cursor_pointer ${state.current_view === "unit" ? 'is-active' : ''} `}>
            Units
          </p>
          <p
            onClick={event =>
            {
              dispatch({ type: "set_current_view", payload: "avl" });
            }}
            className={`navbar-item is-tab cursor_pointer ${state.current_view === "avl" ? 'is-active' : ''} `}>
            AVL
          </p>
          <p
            onClick={event =>
            {
              dispatch({ type: "set_current_view", payload: "fc" });
            }}
            className={`navbar-item is-tab cursor_pointer ${state.current_view === "fc" ? 'is-active' : ''} `}>
            Fleet Complete
          </p>
          <p
            onClick={event =>
            {
              dispatch({ type: "set_current_view", payload: "cad" });
            }}
            className={`navbar-item is-tab cursor_pointer ${state.current_view === "cad" ? 'is-active' : ''} `}>
            CAD
          </p>
          <p
            onClick={event =>
            {
              dispatch({ type: "set_current_view", payload: "map" });
            }}
            className={`navbar-item is-tab cursor_pointer ${state.current_view === "map" ? 'is-active' : ''} `}>
            Map
          </p>
        </div>

        <div className="navbar-end">
          <div
            id="nav_basemap_dropdown"
            className="navbar-item has-dropdown">
            <a className="navbar-link"
              onClick={event =>
              {
                let e = document.getElementById("nav_basemap_dropdown");
                if (e === null) return;
                let isActive = e.classList.contains("is-active");
                let basemaps = document.querySelectorAll(".esri-basemap-gallery__item");
                basemaps.forEach(b =>
                {
                  if (!isActive)
                  {
                    b.addEventListener("click", closeBaseMapDropdown);
                  }
                  else
                  {
                    b.removeEventListener("click", closeBaseMapDropdown);
                  }
                });
                e.classList.toggle("is-active");
              }}
            >
              Select Base Map
            </a>
            <div className="navbar-dropdown">
              <div
                className="navbar-item">
                <div id="basemap_selector_container"></div>

              </div>
            </div>
          </div>
          <p className="navbar-item">
            Layers
          </p>
          <p className="navbar-item"></p>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
