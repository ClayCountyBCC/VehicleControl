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

  const Header = FCHeader(isLoading, fetchData, state.fc_data_filter);

  useEffect(() =>
  {

  }, [
    isLoading,
    isError,
    state.filtered_fc_data,
    state.fc_data_filter,
    state.fc_data_sort_field,
    state.fc_data_sort_ascending,
    state.fc_data_special_filter]);


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
                  dispatch({ type: 'fc_data_sort', payload: 'device_id' });
                }}
                className={`${state.fc_data_sort_field !== 'device_id' ? '' : state.fc_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Device Id
              </a>
            </th>
            <th style={{width: "10%"}}>
              <a
                href="#SortByAssetTag"
                onClick={event =>
                {
                  event.preventDefault();
                  dispatch({ type: 'fc_data_sort', payload: 'asset_tag' });
                }}
                className={`${state.fc_data_sort_field !== 'asset_tag' ? '' : state.fc_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Asset Tag
              </a>
            </th>
            <th style={{ width: "8%" }}>
              <a
                href="#SortByUnit"
                onClick={event =>
                {
                  event.preventDefault();
                  dispatch({ type: 'fc_data_sort', payload: 'unitcode' });
                }}
                className={`${state.fc_data_sort_field !== 'unitcode' ? '' : state.fc_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Unit
              </a>
            </th>
            <th style={{ width: "24%" }}>
              <a
                href="#SortByDateSavedOn"
                onClick={event =>
                {
                  event.preventDefault();
                  dispatch({ type: 'fc_data_sort', payload: 'updated_on' });
                }}
                className={`${state.fc_data_sort_field !== 'updated_on' ? '' : state.fc_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Data Saved On
              </a>
            </th>
            <th style={{ width: "24%" }}>
              <a
                href="#SortByLocationDate"
                onClick={event =>
                {
                  event.preventDefault();
                  dispatch({ type: 'fc_data_sort', payload: 'location_timestamp' });
                }}
                className={`${state.fc_data_sort_field !== 'location_timestamp' ? '' : state.fc_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
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