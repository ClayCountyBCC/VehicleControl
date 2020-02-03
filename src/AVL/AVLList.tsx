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

  const { isLoading, isError, fetchData } = useFetchData(AVLData.Get, "get_avl_data", false);

  const Header = AVLHeader(isLoading, fetchData);

  let view_name = 'avl_view';

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
    state.filtered_avl_data,
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
                href="#SortByDeviceId"
                onClick={event =>
                {
                  event.preventDefault();
                  sort_view('device_id');
                }}
                className={`${view.sort_field !== 'device_id' ? '' : view.sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Device Id
              </a>
            </th>
            <th>
              <a
                href="#SortByDeviceType"
                onClick={event =>
                {
                  event.preventDefault();
                  sort_view('device_type');
                }}
                className={`${view.sort_field !== 'device_type' ? '' : view.sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Type
              </a>
            </th>
            <th>
              <a
                href="#SortByUnit"
                onClick={event =>
                {
                  event.preventDefault();
                  sort_view('unitcode');
                }}
                className={`${view.sort_field !== 'unitcode' ? '' : view.sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Unit
              </a>
            </th>
            <th>
              <a
                href="#SortByDateSavedOn"
                onClick={event =>
                {
                  event.preventDefault();
                  sort_view('updated_on');
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
          {state.filtered_avl_data.map((avl, index) =>
          {
            return (<AVL key={avl.device_id} index={index} {...avl} fetchData={fetchData} />);
          })}
        </tbody>
      </table>
    </section>
  );
}

export default AVLList;