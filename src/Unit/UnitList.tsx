import React, { useState, useEffect } from 'react';
import { Store } from '../Store';
import UnitData from './UnitData';
import Unit from './Unit';
import AddUnit from './AddUnit';
import { useFetchData } from '../useFetchData';
import { ListHeaderView } from '../ListHeaderView';
import { UnitHeader } from '../ListHeaders';


const UnitList: React.FC = () =>
{
  const { state, dispatch } = React.useContext(Store);
  const [showAddUnit, setShowAddUnit] = useState(false);
  const [currentSearch, setCurrentSearch] = useState(state.unit_data_filter || "");
  
  const hideAddUnit = () =>
  {
    setShowAddUnit(false);
  }

  const { isLoading, isError, fetchData } = useFetchData(UnitData.Get, "get_unit_data", false);

  const Header = UnitHeader(isLoading, fetchData, state.unit_data_filter);

  useEffect(() =>
  {

  }, [
    isLoading,
    isError,
    state.filtered_unit_data,
    state.unit_data_filter,
    state.unit_data_sort_field,
    state.unit_data_sort_ascending,
    state.unit_data_special_filter]);

  return (
    <section>
      <ListHeaderView loading={isLoading} {...Header} />

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