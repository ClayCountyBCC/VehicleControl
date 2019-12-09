import React from 'react';
import Nav from './nav';
import { Store } from './Store';
import AVLData from './AVLData';
//import './App.css';

const App: React.FC = () =>
{
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() =>
  {
    state.avl_data.length === 0 && fetchAVLData()
  })

  const fetchAVLData = async () =>
  {
    const data = await AVLData.Get();
    return dispatch({ type: 'get_avl_data', payload: data });
  }
  console.log('state: ', state);

  return (
    <>
      <Nav />
      <div className="App">
      </div>
    </>
  );
}

export default App;
