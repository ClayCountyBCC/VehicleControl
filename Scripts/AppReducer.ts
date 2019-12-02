/// <reference path="avldata.ts" />
import AVLData from './AVLData';

interface IState
{
  avl_data: Array<AVLData>,
  fleetcomplete_data: []
}

interface IAction
{
  type: string,
  payload: any
}

export default function reducer(state: IState, action: IAction): IState
{
  switch (action.type)
  {
    case "get_avl":
      return { ...state, avl_data: action.payload }

    default:
      return state;
  }
}