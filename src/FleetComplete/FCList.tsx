import React from 'react';
import { Store } from '../Store';
import FleetCompleteData from './FleetCompleteData';
import FC from './FC';

const FCList: React.FC = () =>
{
  const { state, dispatch } = React.useContext(Store);

  const fetchFCData = async () =>
  {
    const data = await FleetCompleteData.Get();
    return dispatch({ type: 'get_fc_data', payload: data });
  }

  return (
    <section>
      <div
        style={{ padding: "1em", marginBottom: 0 }}
        className="level">
        <div className="level-left">
          <div className="level-item is-size-3 has-text-weight-bold">
            FC
          </div>
          <div className="level-item">
            <div className="field">
              <div className="control">
                <input
                  title="Search for text in the Device Id, Unit, and Asset Tag fields.  Hit Enter to Search."
                  type="text"
                  placeholder="Search"
                  onKeyDown={event =>
                  {
                    if (event.key === 'Enter')
                    {
                      event.preventDefault();
                      event.stopPropagation();
                      dispatch({
                        type: "search_fc_data",
                        payload: (event.target as HTMLInputElement).value
                      })
                    }

                  }} />
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={event =>
              {
                event.preventDefault();
                fetchFCData();
              }}
              title="Refresh the Fleet Complete Data"
              type="button"
              className="button is-success is-small">
              <span className="icon is-small">
                <i className="fas fa-sync-alt"></i>
              </span>
            </button>
          </div>
        </div>
        <div className="level-right">
          <p className="level-item has-text-weight-bold">Error Filters</p>
          <div className="level-item tabs">
            <ul>
              <li className={`${state.fc_data_special_filter === '' ? 'is-active' : ''}`}>
                <a
                  href="#NoFilter"
                  onClick={event => { dispatch({ type: "fc_data_special_filter", payload: '' }) }}>
                  Show All
                </a>
              </li>
              <li className={`${state.fc_data_special_filter === 'error' ? 'is-active' : ''}`}>
                <a
                  href="#AllErrors"
                  onClick={event => { dispatch({ type: "fc_data_special_filter", payload: 'error' }) }}>
                  All Errors
                </a>
              </li>
              <li className={`${state.fc_data_special_filter === 'unit' ? 'is-active' : ''}`}>
                <a
                  href="#AssetTagErrors"
                  onClick={event => { dispatch({ type: "fc_data_special_filter", payload: 'asset_tag' }) }}>
                  Asset Tag
                </a>
              </li>
              <li className={`${state.fc_data_special_filter === 'unit' ? 'is-active' : ''}`}>
                <a
                  href="#UnitErrors"
                  onClick={event => { dispatch({ type: "fc_data_special_filter", payload: 'unit' }) }}>
                  Unit
                </a>
              </li>
              <li className={`${state.fc_data_special_filter === 'date' ? 'is-active' : ''}`}>
                <a
                  href="#DateErrors"
                  onClick={event => { dispatch({ type: "fc_data_special_filter", payload: 'date' }) }}>
                  Date
                </a>
              </li>
              <li className={`${state.fc_data_special_filter === 'location' ? 'is-active' : ''}`}>
                <a
                  href="#LocationErrors"
                  onClick={event => { dispatch({ type: "fc_data_special_filter", payload: 'location' }) }}>
                  Location
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th style={{width: "5%"}}>
              #
            </th>
            <th style={{ width: "10%" }}>
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
            <th style={{ width: "10%" }}>
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
            <th style={{ width: "25%" }}>
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
            <th style={{ width: "25%" }}>
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
            <th style={{ width: "15%" }}
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