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

  useEffect(() =>
  {

  }, [
    isLoading,
    isError,
    state.filtered_cad_data,
    state.cad_view]);

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
                  dispatch({ type: 'cad_data_sort', payload: 'unitcode' });
                }}
                className={`${state.cad_data_sort_field !== 'unitcode' ? '' : state.avl_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Unit Code
              </a>
            </th>
            <th>
              <a
                href="#SortByCallStatus"
                onClick={event =>
                {
                  event.preventDefault();
                  dispatch({ type: 'cad_data_sort', payload: 'inci_id' });
                }}
                className={`${state.cad_data_sort_field !== 'inci_id' ? '' : state.cad_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Call Status
              </a>
            </th>
            <th>
              <a
                href="#SortByUnitStatus"
                onClick={event =>
                {
                  event.preventDefault();
                  dispatch({ type: 'cad_data_sort', payload: 'status' });
                }}
                className={`${state.cad_data_sort_field !== 'status' ? '' : state.cad_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Status
              </a>
            </th>
            <th>
              <a
                href="#SortByUnitAVStatus"
                onClick={event =>
                {
                  event.preventDefault();
                  dispatch({ type: 'cad_data_sort', payload: 'avstatus' });
                }}
                className={`${state.cad_data_sort_field !== 'avstatus' ? '' : state.cad_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                AV Status
              </a>
            </th>
            <th>
              <a
                href="#SortByDateSavedOn"
                onClick={event =>
                {
                  event.preventDefault();
                  dispatch({ type: 'cad_data_sort', payload: 'updated_on' });
                }}
                className={`${state.cad_data_sort_field !== 'updated_on' ? '' : state.cad_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Data Saved On
              </a>
            </th>
            <th>
              <a
                href="#SortByLocationDate"
                onClick={event =>
                {
                  event.preventDefault();
                  dispatch({ type: 'cad_data_sort', payload: 'location_timestamp' });
                }}
                className={`${state.cad_data_sort_field !== 'location_timestamp' ? '' : state.cad_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
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