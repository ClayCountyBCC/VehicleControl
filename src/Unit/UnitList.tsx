import React, { useState } from 'react';
import { Store } from '../Store';
import UnitData from './UnitData';
import Unit from './Unit';
import AddUnit from './AddUnit';

const UnitList: React.FC = () =>
{
  const { state, dispatch } = React.useContext(Store);

  const [currentSearch, setCurrentSearch] = useState(state.avl_data_filter || "");
  const [showAddUnit, setShowAddUnit] = useState(false);

  const fetchUnitData = async () =>
  {
    const data = await UnitData.Get();
    return dispatch({ type: 'get_unit_data', payload: data });
  }

  const hideAddUnit = () =>
  {
    setShowAddUnit(false);
  }

  return (
    <section>
      <div
        style={{ padding: "1em", marginBottom: 0 }}
        className="level">
        <div className="level-left">
          <div className="level-item is-size-3 has-text-weight-bold">
            Unit
          </div>
          <div className="level-item">
            <div className="field">
              <div className="control">
                <input
                  title="Search for text in the Device Id, Unit, and Asset Tag fields.  Hit Enter to Search."
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
                        type: "search_unit_data",
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
                fetchUnitData();
              }}
              title="Refresh the Unit Data"
              type="button"
              className="button is-success is-small">
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
                  type: "search_unit_data",
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
              <li className={`${state.unit_data_special_filter === '' ? 'is-active' : ''}`}>
                <a
                  href="#NoFilter"
                  onClick={event => { dispatch({ type: "unit_data_special_filter", payload: '' }) }}>
                  Show All
                </a>
              </li>
              <li className={`${state.unit_data_special_filter === 'error' ? 'is-active' : ''}`}>
                <a
                  href="#AllErrors"
                  onClick={event => { dispatch({ type: "unit_data_special_filter", payload: 'error' }) }}>
                  Errors
                </a>
              </li>
              <li className={`${state.unit_data_special_filter === 'unit' ? 'is-active' : ''}`}>
                <a
                  href="#AssetTagErrors"
                  onClick={event => { dispatch({ type: "unit_data_special_filter", payload: 'avl' }) }}>
                  AVL
                </a>
              </li>
              <li className={`${state.unit_data_special_filter === 'unit' ? 'is-active' : ''}`}>
                <a
                  href="#UnitErrors"
                  onClick={event => { dispatch({ type: "unit_data_special_filter", payload: 'fc' }) }}>
                  FC
                </a>
              </li>
              <li className={`${state.unit_data_special_filter === 'date' ? 'is-active' : ''}`}>
                <a
                  href="#DateErrors"
                  onClick={event => { dispatch({ type: "unit_data_special_filter", payload: 'cad' }) }}>
                  CAD
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
                  dispatch({ type: 'unit_data_sort', payload: 'unitcode' });
                }}
                className={`${state.unit_data_sort_field !== 'unitcode' ? '' : state.unit_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Unit
              </a>
              <span
                style={{ marginLeft: "1em" }}
                title="Add A Unit"
                className="icon cursor_pointer has-text-danger"
                onClick={event =>
                {
                  setShowAddUnit(!showAddUnit);
                }}>
                <i className="fas fa-plus-circle"></i>
              </span>
            </th>
            <th>
              <a
                href="#SortByUsingUnit"
                onClick={event =>
                {
                  event.preventDefault();
                  dispatch({ type: 'unit_data_sort', payload: 'using_unit' });
                }}
                className={`${state.unit_data_sort_field !== 'using_unit' ? '' : state.unit_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Using Unit
              </a>
            </th>
            <th>
              <a
                href="#SortByGroup"
                onClick={event =>
                {
                  event.preventDefault();
                  dispatch({ type: 'unit_data_sort', payload: 'group_label' });
                }}
                className={`${state.unit_data_sort_field !== 'group_label' ? '' : state.unit_data_sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                <span
                  title="View this on the Map"
                  className="icon">
                  <i className="fas fa-sort"></i>
                </span>

              </a>
              <div
                style={{ display: "inline-block" }}
                className="control">
                <div className="select is-small">
                  <select
                    onChange={event =>
                    {
                      let currentOption = event.target.options[event.target.selectedIndex].innerText;
                      if (currentOption === "All Groups") currentOption = "";
                      setCurrentSearch(currentOption);
                      dispatch({
                        type: "search_unit_data",
                        payload: currentOption
                      })

                    }}>
                    <option value="">All Groups</option>
                    {
                      state.unit_groups.map(group =>
                      {
                        return (
                          <option key={group.value} value={group.value}>{group.label}</option>
                        )
                      })}
                  </select>
                </div>
              </div>
            </th>
            <th>
              AVL
            </th>
            <th>
              FC
            </th>
            <th>
              CAD
            </th>
            <th className="has-text-centered">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          <AddUnit
            unitcode=""
            has_avl_device={false}
            has_fc_device={false}
            should_have_cad_location={false}
            group_label={""}
            show_add_unit={showAddUnit}
            cancel={hideAddUnit}

          />
          {state.filtered_unit_data.map((u, index) =>
          {
            return (<Unit key={u.unitcode} index={index} {...u} />);
          })}
        </tbody>
      </table>
    </section>
  );
}

export default UnitList;