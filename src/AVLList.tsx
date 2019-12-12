import React from 'react';
import { Store } from './Store';
import AVLData from './AVLData';
import AVL from './AVL';

const AVLList: React.FC = () =>
{
  const { state, dispatch } = React.useContext(Store);
  

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
                  type="text"
                  placeholder="Search"
                  onKeyDown={event =>
                  {
                    if (event.key === 'Enter')
                    {
                      event.preventDefault();
                      event.stopPropagation();
                      dispatch({
                        type: "search_avl_data",
                        payload: (event.target as HTMLInputElement).value
                      })
                    }

                  }} />
              </div>
            </div>
          </div>
        </div>
        <div className="level-right">
          <p className="level-item has-text-weight-bold">Quick Filters</p>
          <div className="level-item tabs">
            <ul>
              <li className={`${state.avl_data_special_filter === '' ? 'is-active' : ''}`}>
                <a onClick={event => { dispatch({ type: "avl_data_special_filter", payload: '' }) }}>
                  No Filter
                </a>
              </li>
              <li className={`${state.avl_data_special_filter === 'error' ? 'is-active' : ''}`}>
                <a onClick={event => { dispatch({ type: "avl_data_special_filter", payload: 'error' }) }}>
                  All Errors
                </a>
              </li>
              <li className={`${state.avl_data_special_filter === 'unit' ? 'is-active' : ''}`}>
                <a onClick={event => { dispatch({ type: "avl_data_special_filter", payload: 'unit' }) }}>
                  Unit Errors
                </a>
              </li>
              <li className={`${state.avl_data_special_filter === 'date' ? 'is-active' : ''}`}>
                <a onClick={event => { dispatch({ type: "avl_data_special_filter", payload: 'date' }) }}>
                  Date Errors
                </a>
              </li>
              <li className={`${state.avl_data_special_filter === 'location' ? 'is-active' : ''}`}>
                <a onClick={event => { dispatch({ type: "avl_data_special_filter", payload: 'location' }) }}>
                  Location Errors
                </a>
              </li>
            </ul>
          </div>
          {/*
          <button
            type="button"
            onClick={event =>
            {
              event.preventDefault();
              dispatch({
                type: "search_avl_data",
                payload: ''
              })
            }}
            className="level-item is-text button has-text-link no-decoration">
            Show All
          </button>          
          <a className="level-item">
            Errors
          </a>
          <a className="level-item">
            No Unit
          </a>
          <a className="level-item">
            Bad Date
          </a>
          <a className="level-item">
            Bad Location
          </a>
          */}
        </div>
      </div>

      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>
              <a
                onClick={event => dispatch({ type: 'avl_data_sort', payload: 'device_id' })}
                className={`${state.avl_data_sort_field !== 'device_id' ? '' : state.avl_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Device Id
              </a>
            </th>
            <th>
              <a
                onClick={event => dispatch({ type: 'avl_data_sort', payload: 'device_type' })}
                className={`${state.avl_data_sort_field !== 'device_type' ? '' : state.avl_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Device Type
              </a>
            </th>
            <th>
              <a
                onClick={event => dispatch({ type: 'avl_data_sort', payload: 'unitcode' })}
                className={`${state.avl_data_sort_field !== 'unitcode' ? '' : state.avl_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Unit
              </a>
            </th>
            <th>
              <a
                onClick={event => dispatch({ type: 'avl_data_sort', payload: 'updated_on' })}
                className={`${state.avl_data_sort_field !== 'updated_on' ? '' : state.avl_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Data Saved On
              </a>
            </th>
            <th>
              <a
                onClick={event => dispatch({ type: 'avl_data_sort', payload: 'location_timestamp' })}
                className={`${state.avl_data_sort_field !== 'location_timestamp' ? '' : state.avl_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Location On
              </a>
            </th>
            <th>
              Errors
            </th>
          </tr>
        </thead>
        <tbody>
          {state.filtered_avl_data.map(avl =>
          {
            return (<AVL key={avl.device_id} {...avl} />);
          })}
        </tbody>
      </table>
    </section>
  );
}

export default AVLList;