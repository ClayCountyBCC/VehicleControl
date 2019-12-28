import React from 'react';
import { Store } from '../Store';
import CADData from './CADData';
import CAD from './CAD';

const CADList: React.FC = () =>
{
  const { state, dispatch } = React.useContext(Store);

  const fetchCADData = async () =>
  {
    const data = await CADData.Get();
    return dispatch({ type: 'get_cad_data', payload: data });
  }

  return (
    <section>
      <div
        style={{ padding: "1em", marginBottom: 0 }}
        className="level">
        <div className="level-left">
          <div className="level-item is-size-3 has-text-weight-bold">
            CAD
          </div>
          <div className="level-item">
            <div className="field">
              <div className="control">
                <input
                  title="Search for text in the UnitCode field.  Hit Enter to Search."
                  type="text"
                  placeholder="Search"
                  onKeyDown={event =>
                  {
                    if (event.key === 'Enter')
                    {
                      event.preventDefault();
                      event.stopPropagation();
                      dispatch({
                        type: "search_cad_data",
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
                fetchCADData();
              }}
              title="Refresh the CAD Data"
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
              <li className={`${state.cad_data_special_filter === '' ? 'is-active' : ''}`}>
                <a
                  href="#NoFilter"
                  onClick={event => { dispatch({ type: "cad_data_special_filter", payload: '' }) }}>
                  Show All
                </a>
              </li>
              <li className={`${state.cad_data_special_filter === 'error' ? 'is-active' : ''}`}>
                <a
                  href="#AllErrors"
                  onClick={event => { dispatch({ type: "cad_data_special_filter", payload: 'error' }) }}>
                  All Errors
                </a>
              </li>
              <li className={`${state.cad_data_special_filter === 'date' ? 'is-active' : ''}`}>
                <a
                  href="#DateErrors"
                  onClick={event => { dispatch({ type: "cad_data_special_filter", payload: 'date' }) }}>
                  Date
                </a>
              </li>
              <li className={`${state.cad_data_special_filter === 'location' ? 'is-active' : ''}`}>
                <a
                  href="#LocationErrors"
                  onClick={event => { dispatch({ type: "cad_data_special_filter", payload: 'location' }) }}>
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