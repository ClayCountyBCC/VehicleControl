import AVLData from './AVLData';

export interface IState
{
  avl_data: Array<AVLData>
  fleetcomplete_data: Array<any>
  cad_data: Array<any>
  unit_data: Array<any>
}

export interface IAction
{
  type: string
  payload: any
}