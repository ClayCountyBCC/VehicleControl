import React from 'react';
import Nav from './nav';
import { Store } from './Store';
import AVLData from './AVL/AVLData';
import AVLList from './AVL/AVLList';
import FleetCompleteData from './FleetComplete/FleetCompleteData';
import FCList from './FleetComplete/FCList';
import GeotabData from './Geotab/GeotabData';
import GTList from './Geotab/GTList';
import CADData from './Cad/CADData';
import CADList from './Cad/CADList';
import UnitData from './Unit/UnitData';
import UnitList from './Unit/UnitList';
import { WebMapView } from './Map/WebMapView';
import SimpleValue from './SimpleValue';
import { useFetchData } from './useFetchData';
import { useInterval } from './useInterval';

const App: React.FC = () =>
{
  const { state, dispatch } = React.useContext(Store);

  const { fetchData: fetchAVLData } = useFetchData(AVLData.Get, "get_avl_data", false);
  const { fetchData: fetchGTData } = useFetchData(GeotabData.Get, "get_gt_data", false);
  const { fetchData: fetchCADData } = useFetchData(CADData.Get, "get_cad_data", false);
  const { fetchData: fetchUnitData } = useFetchData(UnitData.Get, "get_unit_data", false);

  React.useEffect(() =>
  {
    fetchUnitData();
    fetchAVLData();
    fetchGTData();
    fetchCADData();
    fetchUnitGroups();
  }, []);

  useInterval(() =>
  {
    console.log("automatically refreshing all");
    fetchUnitData();
    fetchAVLData();
    fetchGTData();
    fetchCADData();
    fetchUnitGroups();
  }, 60000);

  const fetchUnitGroups = async () =>
  {
    const data = await SimpleValue.GetUnitGroups();
    return dispatch({ type: 'get_unit_groups_data', payload: data });
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
          {state.current_view === "gt" ? <GTList /> : null}
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
