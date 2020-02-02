import React, { useState, useEffect } from 'react';
import { Store } from './Store';
import { IListHeader, IHeaderFilter } from './interfaces';

export const ListHeaderView = (
  {
    title,
    title_description,
    //search_type,
    loading,
    fetchData,
    view_name,
    header_filters }: IListHeader) =>
{
  const { state, dispatch } = React.useContext(Store);

  const [currentSearch, setCurrentSearch] = useState(state[view_name].data_filter || "");

  useEffect(() =>
  {

  }, [loading, state[view_name]]);

  return (
    <div
      style={{ padding: "1em", marginBottom: 0 }}
      className="level">
      <div className="level-left">
        <div className="level-item is-size-3 has-text-weight-bold">
          {title}
        </div>
        <div className="level-item">
          <div className="field">
            <div
              className={`control ${loading ? 'is-loading' : ''}`}>
              <input
                className="input is-small"
                title={title_description}
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
                      type: 'update_view',
                      payload: {
                        view: view_name,
                        option: {
                          data_filter: currentSearch
                        }
                      }
                    })
                    //dispatch({
                    //  type: search_type,
                    //  payload: currentSearch
                    //})
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
              fetchData();
            }}
            title="Refresh data"
            type="button"
            className={`button is-success is-small ${loading ? 'is-loading' : ''}`}>
            <span className="icon is-small">
              <i className="fas fa-sync-alt"></i>
            </span>
          </button>
          <button
            style={{ marginLeft: ".5em" }}
            onClick={event =>
            {
              event.preventDefault();
              event.stopPropagation();
              setCurrentSearch("");
              dispatch({
                type: 'update_view',
                payload: {
                  view: view_name,
                  option: {
                    special_filter: ''
                  }
                }
              })
              //dispatch({
              //  type: search_type,
              //  payload: ''
              //})
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
        <p className="level-item has-text-weight-bold">Filters</p>
        <div className="level-item tabs">
          <ul>
            {
              header_filters.map(f =>
              {
                return (
                  <li
                    className={`${state[view_name].special_filter === f.value ? 'is-active' : ''}`}
                    key={f.id}>
                    <a
                      onClick={event =>
                      {
                        //dispatch({ type: view_name + '_special_filter', payload: f.value })
                        dispatch({
                          type: 'update_view',
                          payload: {
                            view: view_name,
                            option: {
                              special_filter: f.value
                            }
                          }
                        })
                      }}>
                      {f.label}
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ListHeaderView;