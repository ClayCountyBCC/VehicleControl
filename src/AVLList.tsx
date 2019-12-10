import React from 'react';
import { Store } from './Store';
import AVLData from './AVLData';
import AVL from './AVL';

const AVLList: React.FC = () =>
{
  const { state, dispatch } = React.useContext(Store);
  

  return (
    <section>
      <nav
        style={{ paddingLeft: "1em", paddingRight: "1em"}}
        className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <h1 className="navbar-item is-size-4 is-bold">AVL</h1>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item">
                <div className="field">
                  <div className="control">
                    <input type="text" placeholder="Search" value="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="navbar-end">
              <p className="navbar-item">
                Errors
            </p>
              <p className="navbar-item">
                No Unit
            </p>
              <p className="navbar-item">
                Bad Date
            </p>
              <p className="navbar-item">
                No Location
            </p>
            </div>
          </div>
        </div>
      </nav>

      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>
              Device Id
            </th>
            <th>
              Device Type
            </th>
            <th>
              Unit
            </th>
            <th>
              Updated On
            </th>
            <th>
              Errors
            </th>
          </tr>
        </thead>
        <tbody>
      {state.avl_data.map(avl =>
      {
        return (<AVL key={avl.device_id} {...avl} />);
      })}
        </tbody>
      </table>
    </section>

  );
}

export default AVLList;