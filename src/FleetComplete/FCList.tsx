import React, { useEffect } from 'react';
import { Store } from '../Store';
import FleetCompleteData from './FleetCompleteData';
import FC from './FC';
import { useFetchData } from '../useFetchData';
import { ListHeaderView } from '../ListHeaderView';
import { FCHeader } from '../ListHeaders';

const FCList: React.FC = () =>
{
  const { state, dispatch } = React.useContext(Store);

  const { isLoading, isError, fetchData } = useFetchData(FleetCompleteData.Get, "get_fc_data", false);

  const Header = FCHeader(isLoading, fetchData);

  let view_name = 'fc_view';

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
    state.filtered_fc_data,
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
            <th style={{width: "10%"}}>
              <a
                href="#SortByAssetTag"
                onClick={event =>
                {
                  event.preventDefault();
                  sort_view('asset_tag');
                }}
                className={`${view.sort_field !== 'asset_tag' ? '' : view.sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Asset Tag
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
                  sort_view('updated_on');
                }}
                className={`${view.sort_field !== 'updated_on' ? '' : view.sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Data Saved On
              </a>
            </th>
            <th style={{ width: "24%" }}>
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
            <th style={{ width: "14%" }}
              className="has-text-centered">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {state.filtered_fc_data.map((fc, index) =>
          {
            return (<FC key={fc.device_id} index={index} {...fc} />);
          })}
        </tbody>
      </table>
    </section>
  );
}

export default FCList;