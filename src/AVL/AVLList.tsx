import React, { useState } from 'react';
import { Store } from '../Store';
import AVLData from './AVLData';
import AVL from './AVL';

const AVLList: React.FC = () =>
{
  const { state, dispatch } = React.useContext(Store);

  const [currentSearch, setCurrentSearch] = useState(state.avl_data_filter || "");

  const fetchAVLData = async () =>
  {
    const data = await AVLData.Get();
    return dispatch({ type: 'get_avl_data', payload: data });
  }

  return (
    <section>
      <div
        style={{ padding: "1em", marginBottom: 0 }}
        className="level">
        <div className="level-left">
          <div className="level-item is-size-3 has-text-weight-bold">
            AVL
          </div>
          <div className="level-item">
            <div className="field">
              <div className="control">
                <input
                  title="Search for text in the Device Id and Unit fields.  Hit Enter to Search."
                  type="text"
                  placeholder="Search"
                  onChange={event => setCurrentSearch(event.target.value)}
                  value={currentSearch}
                  onKeyDown={event =>
                  {
                    if (event.key === 'Enter')
                    {
                      event.preventDefault();
                      event.stopPropagation();
                      dispatch({
                        type: "search_avl_data",
                        payload: currentSearch
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
                fetchAVLData();
              }}
              title="Refresh the AVL Data"
              type="button"
              className="button is-success is-small">
              <span className="icon is-small">
                <i className="fas fa-sync-alt"></i>
              </span>
            </button>
            <button
              style={{marginLeft: ".5em"}}
              onClick={event =>
              {
                event.preventDefault();
                event.stopPropagation();
                setCurrentSearch("");
                dispatch({
                  type: "search_avl_data",
                  payload: ''
                })
              }}
              title="Reset the Search"
              type="button"
              className="button is-warning is-small">              
              <span className="icon is-small">
                <i className="fas fa-undo-alt"></i>
              </span>
            </button>
          </div>
        </div>
        <div className="level-right">
          <p className="level-item has-text-weight-bold">Error Filters</p>
          <div className="level-item tabs">
            <ul>
              <li className={`${state.avl_data_special_filter === '' ? 'is-active' : ''}`}>
                <a
                  href="#NoFilter"
                  onClick={event => { dispatch({ type: "avl_data_special_filter", payload: '' }) }}>
                  Show All
                </a>
              </li>
              <li className={`${state.avl_data_special_filter === 'error' ? 'is-active' : ''}`}>
                <a
                  href="#AllErrors"
                  onClick={event => { dispatch({ type: "avl_data_special_filter", payload: 'error' }) }}>
                  All Errors
                </a>
              </li>
              <li className={`${state.avl_data_special_filter === 'unit' ? 'is-active' : ''}`}>
                <a
                  href="#UnitErrors"
                  onClick={event => { dispatch({ type: "avl_data_special_filter", payload: 'unit' }) }}>
                  Unit
                </a>
              </li>
              <li className={`${state.avl_data_special_filter === 'date' ? 'is-active' : ''}`}>
                <a
                  href="#DateErrors"
                  onClick={event => { dispatch({ type: "avl_data_special_filter", payload: 'date' }) }}>
                  Date
                </a>
              </li>
              <li className={`${state.avl_data_special_filter === 'location' ? 'is-active' : ''}`}>
                <a
                  href="#LocationErrors"
                  onClick={event => { dispatch({ type: "avl_data_special_filter", payload: 'location' }) }}>
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