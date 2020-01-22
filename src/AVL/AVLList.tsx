import React, { useEffect } from 'react';
import { Store } from '../Store';
import AVLData from './AVLData';
import AVL from './AVL';
import { useFetchData } from '../useFetchData';
import ListHeaderView from '../ListHeaderView';
import { AVLHeader } from '../ListHeaders';
//import { useInterval } from '../useInterval';

const AVLList: React.FC = () =>
{
  const { state, dispatch } = React.useContext(Store);

  //let isLoading, isError, fetchData;
  const { isLoading, isError, fetchData } = useFetchData(AVLData.Get, "get_avl_data", false);

  const Header = AVLHeader(isLoading, fetchData, state.avl_data_filter);

  //useInterval(() =>
  //{
  //  console.log("automatically refreshing avl");
  //  fetchData();
  //}, 60000);

  useEffect(() =>
  {

  }, [
    isLoading,
    isError,
    state.filtered_avl_data,
    state.avl_data_filter,
    state.avl_data_sort_field,
    state.avl_data_sort_ascending,
    state.avl_data_special_filter]);

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
                href="#SortByDeviceId"
                onClick={event =>
                {
                  event.preventDefault();
                  dispatch({ type: 'avl_data_sort', payload: 'device_id' });
                }}
                className={`${state.avl_data_sort_field !== 'device_id' ? '' : state.avl_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Device Id
              </a>
            </th>
            <th>
              <a
                href="#SortByDeviceType"
                onClick={event =>
                {
                  event.preventDefault();
                  dispatch({ type: 'avl_data_sort', payload: 'device_type' });
                }}
                className={`${state.avl_data_sort_field !== 'device_type' ? '' : state.avl_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Type
              </a>
            </th>
            <th>
              <a
                href="#SortByUnit"
                onClick={event =>
                {
                  event.preventDefault();
                  dispatch({ type: 'avl_data_sort', payload: 'unitcode' });
                }}
                className={`${state.avl_data_sort_field !== 'unitcode' ? '' : state.avl_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Unit
              </a>
            </th>
            <th>
              <a
                href="#SortByDateSavedOn"
                onClick={event =>
                {
                  event.preventDefault();
                  dispatch({ type: 'avl_data_sort', payload: 'updated_on' });
                }}
                className={`${state.avl_data_sort_field !== 'updated_on' ? '' : state.avl_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Data Saved On
              </a>
            </th>
            <th>
              <a
                href="#SortByLocationDate"
                onClick={event =>
                {
                  event.preventDefault();
                  dispatch({ type: 'avl_data_sort', payload: 'location_timestamp' });
                }}
                className={`${state.avl_data_sort_field !== 'location_timestamp' ? '' : state.avl_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Location On
              </a>
            </th>
            <th className="has-text-centered">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {state.filtered_avl_data.map((avl, index) =>
          {
            return (<AVL key={avl.device_id} index={index} {...avl} />);
          })}
        </tbody>
      </table>
    </section>
  );
}

export default AVLList;