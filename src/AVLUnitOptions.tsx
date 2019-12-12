import React from 'react';
import { IAVLUnitOptions } from './interfaces';

const AVLUnitOptions = (props: IAVLUnitOptions) =>
{
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