import React, { useEffect } from 'react';
import { Store } from '../Store';
import GeotabData from './GeotabData';
import GT from './GT';
import { useFetchData } from '../useFetchData';
import { ListHeaderView } from '../ListHeaderView';
import { GTHeader } from '../ListHeaders';

const GTList: React.FC = () =>
{
  const { state, dispatch } = React.useContext(Store);

  const { isLoading, isError, fetchData } = useFetchData(GeotabData.Get, "get_gt_data", false);

  const Header = GTHeader(isLoading, fetchData);

  let view_name = 'gt_view';

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
    state.filtered_gt_data,
    view]);


  return (
    <section>
      <ListHeaderView loading={isLoading} {...Header} />

      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th style={{width: "5%"}}>
              #
            </th>
            <th style={{ width: "15%" }}>
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
            <th style={{ width: "10%" }}>
              <a
                href="#SortBySerialNumber"
                onClick={event => {
                  event.preventDefault();
                  sort_view('serial_number');
                }}
                className={`${view.sort_field !== 'serial_number' ? '' : view.sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Serial Number
              </a>
            </th>
            <th style={{ width: "8%" }}>
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
            <th style={{ width: "24%" }}>
              <a
                href="#SortByDateSavedOn"
                onClick={event =>
                {
                  event.preventDefault();
                  sort_view('date_device_updated');
                }}
                className={`${view.sort_field !== 'date_device_updated' ? '' : view.sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Device Updated
              </a>
            </th>
            <th style={{ width: "24%" }}>
              <a
                href="#SortByLocationDate"
                onClick={event =>
                {
                  event.preventDefault();
                  sort_view('location_updated_on');
                }}
                className={`${view.sort_field !== 'location_updated_on' ? '' : view.sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Location On
              </a>
            </th>
            <th style={{ width: "14%" }}
              className="has-text-centered">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {state.filtered_gt_data.map((gt, index) =>
          {
            return (<GT key={gt.device_id} index={index} fetchData={fetchData} {...gt} />);
          })}
        </tbody>
      </table>
    </section>
  );
}

export default GTList;