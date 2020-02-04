import React, { useState, useEffect } from 'react';
import { Store } from './Store';
import { IListHeader, IHeaderFilter } from './interfaces';

export const ListHeaderView = (
  {
    title,
    title_description,
    loading,
    fetchData,
    view_name,
    header_filters }: IListHeader) =>
{
  const { state, dispatch } = React.useContext(Store);

  const [currentSearch, setCurrentSearch] = useState(state[view_name].data_filter);

  const update_view = (option: object) => 
  {
    dispatch(
      {
        type: 'update_view',
        payload:
        {
          view: view_name,
          option: option
        }
      });
  }

  useEffect(() =>
  {
    if (currentSearch.length === 0 && state[view_name].data_filter.length > 0)
    {
      setCurrentSearch(state[view_name].data_filter);
    }
  }, [loading, state[view_name].data_filter, state[view_name].special_filter, currentSearch]);

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
                    update_view({ data_filter: currentSearch });
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
              update_view({ data_filter: '' });

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
                        update_view({ special_filter: f.value });
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