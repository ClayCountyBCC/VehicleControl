import React from 'react';

const Nav: React.FC = () =>
{
  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <h1 className="navbar-item is-size-3 has-text-weight-bold">Vehicle Control</h1>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <p className="navbar-item is-tab cursor_pointer">
            Units
            </p>
          <p className="navbar-item is-tab is-active cursor_pointer">
            AVL
            </p>
          <p className="navbar-item is-tab cursor_pointer">
            Fleet Complete
            </p>
          <p className="navbar-item is-tab cursor_pointer">
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
