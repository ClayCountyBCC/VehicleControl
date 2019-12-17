import React from 'react';
import { Store } from './Store';

const Nav = () =>
{
  const { state, dispatch } = React.useContext(Store);

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
        </div>

        <div className="navbar-end">
          <p className="navbar-item">
            BaseMap
          </p>
          <p className="navbar-item">
            Layers
          </p>

        </div>
      </div>
    </nav>
  );
}

export default Nav;
