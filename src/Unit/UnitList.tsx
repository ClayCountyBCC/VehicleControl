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
  const view_name = 'unit_view';
  const view = state[view_name];
  const [currentSearch, setCurrentSearch] = useState(view.data_filter || "");
  
  const hideAddUnit = () =>
  {
    setShowAddUnit(false);
  }

  const { isLoading, isError, fetchData } = useFetchData(UnitData.Get, "get_unit_data", false);

  const Header = UnitHeader(isLoading, fetchData);
   
  const sort_view = (sort_by: string) =>
  {
    dispatch({
      type: 'update_view',
      payload: {
        view: view_name,
        option: {
          sort_field: sort_by,
          sort_ascending: !state[view_name].sort_ascending
        }
      }
    });
  }

  useEffect(() =>
  {

  }, [
    isLoading,
    isError,
    state.filtered_unit_data,
    state.unit_view]);

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
                  sort_view('unitcode');

                }}
                className={`${view.sort_field !== 'unitcode' ? '' : view.sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
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
                  sort_view('using_unit');
                }}
                className={`${view.sort_field !== 'using_unit' ? '' : view.sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
                Using Unit
              </a>
            </th>
            <th>
              <a
                href="#SortByGroup"
                onClick={event =>
                {
                  event.preventDefault();
                  sort_view('group_label');
                }}
                className={`${view.sort_field !== 'group_label' ? '' : view.sort_ascending ? 'sort_ascending' : 'sort_descending'}`}>
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
                        type: 'update_view',
                        payload: {
                          view: view_name,
                          option: {
                            data_filter: currentOption
                          }
                        }
                      });

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
            return (<Unit key={u.unitcode} index={index} {...u} fetchData={fetchData} />);
          })}
        </tbody>
      </table>
    </section>
  );
}

export default UnitList;