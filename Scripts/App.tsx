

import React, { useContext, useReducer, useState, useEffect } from 'react';
import { render } from 'react-dom';
import AppReducer from './AppReducer';
import AppContext from './AppContext';
import AVLData from './AVLData';

//const useAPI = () =>
//{
//  const [data, setData] = useState([]);

//  useEffect(() =>
//  {

//    getData();

//  }, []);

//  const getData = async () =>
//  {
//    const avl = await AVLData.Get();
//    setData(avl);
//  }
//}


const App = (): JSX.Element =>
{
  const initialState = useContext(AppContext);

  const getAVLData = async () =>
  {
    const data = await AVLData.Get();
    return dispatch({ type: 'get_avl', payload: data });
  }

  const [state, dispatch] = useReducer(AppReducer, initialState);
  //const currentAVL = useAPI();

  useEffect(() =>
  {
    //dispatch({ type: "get_avl", payload: currentAVL });
    state.avl_data.length === 0 && getAVLData()

  },
    []
  );

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <h1>
        AVL Data
      </h1>
      <section>
        {state.avl_data.map(avl =>
        {
          return (
            <div key={avl.unitcode}>
              {avl.unitcode}
            </div>
          )
        })}
      </section>
    </AppContext.Provider>
  )
}

render(<App />, document.getElementById('root'));






