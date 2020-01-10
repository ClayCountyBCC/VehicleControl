import React from 'react';
import Nav from './nav';
import { Store } from './Store';
import AVLData from './AVL/AVLData';
import AVLList from './AVL/AVLList';
import FleetCompleteData from './FleetComplete/FleetCompleteData';
import FCList from './FleetComplete/FCList';
import CADData from './Cad/CADData';
import CADList from './Cad/CADList';
import UnitData from './Unit/UnitData';
import UnitList from './Unit/UnitList';
import { WebMapView } from './Map/WebMapView';
import SimpleValue from './SimpleValue';
//import './App.css';

const App: React.FC = () =>
{
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() =>
  {
    fetchUnitData();
    fetchAVLData();
    fetchFCData();
    fetchCADData();
    fetchUnitGroups();
    //state.unit_data.length === 0 && fetchUnitData();
    //state.avl_data.length === 0 && fetchAVLData();
    //state.fc_data.length === 0 && fetchFCData();
    //state.cad_data.length === 0 && fetchCADData();
    //state.unit_groups.length === 0 && fetchUnitGroups();
  }, []);

  const fetchUnitGroups = async () =>
  {
    const data = await SimpleValue.GetUnitGroups();
    return dispatch({ type: 'get_unit_groups_data', payload: data });
  }

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

  const fetchCADData = async () =>
  {
    const data = await CADData.Get();
    console.log('CAD data', data);
    return dispatch({ type: 'get_cad_data', payload: data });
  }

  const fetchUnitData = async () =>
  {
    const data = await UnitData.Get();
    console.log('Unit data', data);
    return dispatch({ type: 'get_unit_data', payload: data });
  }

  return (
    <>
      <Nav />

      <div className="columns main-container is-mobile">
        <div
          style={{ paddingRight: 0 }}
          className={`column left-side ${state.current_view !== 'map' ? 'is-full-mobile is-full-tablet is-full-desktop is-half-widescreen is-half-fullhd' : 'hide'}`}>
          {state.current_view === "avl" ? <AVLList /> : null}
          {state.current_view === "unit" ? <UnitList /> : null}
          {state.current_view === "fc" ? <FCList /> : null}
          {state.current_view === "cad" ? <CADList /> : null}
        </div>

        <div
          style={{ paddingLeft: 0 }}
          className={`column right-side ${state.current_view !== 'map' ? 'is-half-widescreen is-half-fullhd' : ''}`}>
          <WebMapView />
        </div>

      </div>

    </>
  );
}

export default App;
