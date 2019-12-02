import React from 'react';
import AVLData from './AVLData';

interface IState
{
  avl_data: Array<AVLData>
}

interface IAction
{
  type: string,
  payload: any
}


const initialState: IState = {
  avl_data: []
}

const AppContext = React.createContext<IState | any>(initialState);

export default AppContext;