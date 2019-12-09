import React from 'react';

const Nav: React.FC = () =>
{
  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <h1 className="navbar-item is-size-3">Vehicle Control</h1>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">

          </div>
          <div className="navbar-end">
            <p className="navbar-item">
              Units
            </p>
            <p className="navbar-item">
              AVL
            </p>
            <p className="navbar-item">
              Fleet Complete
            </p>
            <p className="navbar-item">
              CAD
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
