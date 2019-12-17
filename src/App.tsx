import React, { useState } from 'react';
import Nav from './nav';
import { Store } from './Store';
import AVLData from './AVL/AVLData';
import AVLList from './AVL/AVLList';
import FleetCompleteData from './FleetComplete/FleetCompleteData';
import FCList from './FleetComplete/FCList';
import { WebMapView } from './WebMapView';
//import './App.css';

const App: React.FC = () =>
{
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() =>
  {
    state.avl_data.length === 0 && fetchAVLData();
    state.fc_data.length === 0 && fetchFCData();
  }, []);

  const fetchAVLData = async () =>
  {
    const data = await AVLData.Get();
    return dispatch({ type: 'get_avl_data', payload: data });
  }

  const fetchFCData = async () =>
  {
    const data = await FleetCompleteData.Get();
    console.log('fleet complete data', data);
    return dispatch({ type: 'get_fc_data', payload: data });
  }
  
  return (
    <>
      <Nav />
      
      <div className="columns main-container">
        <div          
          style={{paddingRight: 0}}
          className="column is-half left-side">
          {state.current_view === "avl" ? <AVLList /> : null}
          {state.current_view === "unit" ? null : null}
          {state.current_view === "fc" ? <FCList /> : null}
          {state.current_view === "cad" ? null : null}
        </div>

        <div
          style={{paddingLeft: 0}}
          className="column is-half right-side">
          <WebMapView />
        </div>

      </div>

    </>
  );
}

export default App;
