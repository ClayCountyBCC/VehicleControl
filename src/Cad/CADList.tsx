import React, { useState, useEffect } from 'react';
import { Store } from '../Store';
import CADData from './CADData';
import CAD from './CAD';
import { useFetchData } from '../useFetchData';
import { ListHeaderView } from '../ListHeaderView';
import { CADHeader } from '../ListHeaders';

const CADList: React.FC = () =>
{
  const { state, dispatch } = React.useContext(Store);

  const { isLoading, isError, fetchData } = useFetchData(CADData.Get, "get_cad_data", false);

  const Header = CADHeader(isLoading, fetchData);

  let view_name = 'cad_view';

  let view = state[view_name];

  let sort_view = (sort_by: string) =>
  {
    dispatch({
      type: 'update_view',
      payload: {
        view: view_name,
        option: {
          sort_field: sort_by,
          sort_ascending: !view.sort_ascending
        }
      }
    });
  }

  useEffect(() =>
  {

  }, [
    isLoading,
    isError,
    state.filtered_cad_data,
    view]);

  return (
    <section>

      <ListHeaderView loading={isLoading} {...Header} />

      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              <a
                href="#SortByUnitCode"
                onClick={event =>
                {
                  event.preventDefault();
                  sort_view('unitcode');
                  //dispatch({ type: 'cad_data_sort', payload: 'unitcode' });
                }}
                className={`${view.sort_field !== 'unitcode' ? '' : view.sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Unit Code
              </a>
            </th>
            <th>
              <a
                href="#SortByCallStatus"
                onClick={event =>
                {
                  event.preventDefault();
                  sort_view('inci_id');
                  //dispatch({ type: 'cad_data_sort', payload: 'inci_id' });
                }}
                className={`${view.sort_field !== 'inci_id' ? '' : view.sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Call Status
              </a>
            </th>
            <th>
              <a
                href="#SortByUnitStatus"
                onClick={event =>
                {
                  event.preventDefault();
                  sort_view('status');
                  //dispatch({ type: 'cad_data_sort', payload: 'status' });
                }}
                className={`${view.sort_field !== 'status' ? '' : view.sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Status
              </a>
            </th>
            <th>
              <a
                href="#SortByUnitAVStatus"
                onClick={event =>
                {
                  event.preventDefault();
                  sort_view('avstatus');
                  //dispatch({ type: 'cad_data_sort', payload: 'avstatus' });
                }}
                className={`${view.sort_field !== 'avstatus' ? '' : view.sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                AV Status
              </a>
            </th>
            <th>
              <a
                href="#SortByDateSavedOn"
                onClick={event =>
                {
                  event.preventDefault();
                  sort_view('updated_on');
                  //dispatch({ type: 'cad_data_sort', payload: 'updated_on' });
                }}
                className={`${view.sort_field !== 'updated_on' ? '' : view.sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Data Saved On
              </a>
            </th>
            <th>
              <a
                href="#SortByLocationDate"
                onClick={event =>
                {
                  event.preventDefault();
                  sort_view('location_timestamp');
                  //dispatch({ type: 'cad_data_sort', payload: 'location_timestamp' });
                }}
                className={`${view.sort_field !== 'location_timestamp' ? '' : view.sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Location On
              </a>
            </th>
            <th className="has-text-centered">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {state.filtered_cad_data.map((cad, index) =>
          {
            return (<CAD key={cad.unitcode} index={index} {...cad} />);
          })}
        </tbody>
      </table>
    </section>
  );
}

export default CADList;