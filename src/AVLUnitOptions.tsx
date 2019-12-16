import React from 'react';
import { IAVLUnitOptions } from './interfaces';
import AVLData from './AVLData';
import { Store } from './Store';

const AVLUnitOptions = (props: IAVLUnitOptions) =>
{
  const { dispatch } = React.useContext(Store);

  //const fetchAVLData = async () =>
  //{
  //  const data = await AVLData.Get();
  //  return dispatch({ type: 'get_avl_data', payload: data });
  //}


  if (!props.show_unit_options) return null;

  return (
    <tr>
      <td>
      </td>
      <td className="has-text-right">
        Current Unit:
      </td>
      <td>
        {props.unitcode.length === 0 ? 'None' : props.unitcode}
      </td>
      <td className="has-text-right">
        Change To:
      </td>
      <td colSpan={2}>
        <div className="field has-addons">
          <div className="control">
            <input
              className="input is-small"
              type="text"
              placeholder="New Unit" />
          </div>
          <div className="control">
            <button
              type="button"
              onClick={async event =>
              {
                event.preventDefault();
                const response = await AVLData.Delete(props.device_id);
                if (response.ok)
                {
                  props.fetch_avl_data();
                }
                else
                {
                  alert("There was a problem with deleting this record. Please contact MIS Development for more information.");
                }
              }}
              className="button is-success is-small">
              Save
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default AVLUnitOptions;