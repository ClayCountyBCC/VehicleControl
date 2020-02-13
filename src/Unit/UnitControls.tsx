import React, { useState } from 'react';
import { Store } from '../Store';
import { IUnitControls } from '../interfaces';
import UnitData from './UnitData';

const UnitControls = (props: IUnitControls) =>
{
  const { state, dispatch } = React.useContext(Store);

  const getGroupValue = (label: string) =>
  {
    if (label.length === 0) return label;
    let v = state.unit_groups.filter(g => g.label === label);
    if (v.length > 0) return v[0].value;
    return '';
  }

  const [group, setGroup] = useState(getGroupValue(props.group_label));
  const [hasAVL, setHasAVL] = useState(props.has_avl_device);
  const [hasFC, setHasFC] = useState(props.has_fc_device);
  const [hasCAD, setHasCAD] = useState(props.should_have_cad_location);

  if (!state.unit_view.e[props.unitcode] || !state.unit_view.e[props.unitcode]['options']) return null;

  return (
    <>
      <tr>
        <td>
        </td>
        <td colSpan={2}
          className="has-text-right">
          Group:
        </td>
        <td>
          <div className="field">
            <div className="control">
              <div className="select is-small">
                <select value={group}
                  onChange={event =>
                  {
                    setGroup(event.target.value)
                  }}>
                  <option value="">No Group</option>
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
          </div>
        </td>
        <td colSpan={4}></td>
      </tr>
      <tr>
        <td>
        </td>
        <td colSpan={2}
          className="has-text-right">
          Has AVL Device
        </td>
        <td>
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input
                  checked={hasAVL}
                  onChange={event => setHasAVL(event.target.checked)}
                  type="checkbox" />
              </label>
            </div>
          </div>
        </td>
        <td colSpan={4}></td>
      </tr>
      <tr>
        <td>
        </td>
        <td colSpan={2}
          className="has-text-right">
          Has Fleet Complete Device
        </td>
        <td>
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input
                  checked={hasFC}
                  onChange={event => setHasFC(event.target.checked)}
                  type="checkbox" />
              </label>
            </div>
          </div>
        </td>
        <td colSpan={4}></td>
      </tr>
      <tr>
        <td>
        </td>
        <td colSpan={2}
          className="has-text-right">
          Should Have CAD Location
        </td>
        <td>
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input
                  checked={hasCAD}
                  onChange={event => setHasCAD(event.target.checked)}
                  type="checkbox" />
              </label>
            </div>
          </div>
        </td>
        <td colSpan={4}></td>
      </tr>
      <tr>
        <td colSpan={3}>
        </td>
        <td>
          <div className="field">
            <div className="control">
              <button
                onClick={async (event) => 
                {
                  event.preventDefault();
                  const response = await UnitData.Update(props.unitcode, group, hasAVL, hasFC, hasCAD);
                  if (response.ok)
                  {
                    props.refresh_data();
                  }
                  else
                  {
                    alert("There was a problem updating this record. Please contact MIS Development for more information.");
                  }
                }}
                title="This will save all of the selections above"
                className="is-success button is-small">
                Save
              </button>
              <button
                title="Close the Unit Options menu without saving any changes"
                style={{ marginLeft: "1em" }}
                className="is-warning button is-small"
                onClick={event =>
                {
                  dispatch({ type: 'unit_data_toggle_show_unit_options', payload: props.unitcode });
                }}>
                Cancel
              </button>
            </div>
          </div>
        </td>
        <td colSpan={4}></td>
      </tr>
    </>
  );
}

export default UnitControls;

