import React, { useContext, useReducer } from 'react';
import { IState, IAction } from './interfaces';
import AVLData from './AVLData';



const initialState: IState =
{
  avl_data: [],
  fleetcomplete_data: [],
  cad_data: [],
  unit_data: []
}

export const Store = React.createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState
{
  switch (action.type)
  {
    case "get_avl_data":
      return { ...state, avl_data: action.payload };

    default:
      return state;
  }
}




export function StoreProvider(props: any): JSX.Element
{
  const [state, dispatch] = useReducer(reducer, initialState);
  return (<Store.Provider value={{ state, dispatch }}>{props.children}</Store.Provider>);
}