import React from 'react';
import { IUnitHistoryList } from './interfaces';
import UnitHistory from './UnitHistory';
import { Format_DateTime } from './Utilities';

const UnitHistoryList = (props: IUnitHistoryList) =>
{
  if (!props.history || props.history.length === 0) return null;

  return (
    <tr>
      <td>
        
      </td>
      <td colSpan={props.colspan - 1}>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th
                className="has-text-centered"
                colSpan={props.colspan}>
                {props.title}
              </th>
            </tr>
            <tr>
              <th>
                Unitcode
              </th>
              <th>
                Field
              </th>
              <th>
                Changed From
              </th>
              <th>
                Changed To
              </th>
              <th>
                Changed On
              </th>
              <th>
                Changed By
              </th>
            </tr>
          </thead>
          <tbody>
            {props.history.map(
              (h) =>
              {
                if (h.error_message.length > 0)
                {
                  return (
                    <tr>
                      <td colSpan={6}>{h.error_message}</td>
                    </tr>
                  )
                }
                else
                {
                  return (
                    <tr key={h.id}>
                      <td>
                        {h.unitcode}
                      </td>
                      <td>
                        {h.field}
                      </td>
                      <td>
                        {h.changed_from}
                      </td>
                      <td>
                        {h.changed_to}
                      </td>
                      <td>
                        {Format_DateTime(h.changed_on)}
                      </td>
                      <td>
                        {h.changed_by}
                      </td>
                    </tr>
                  )
                }

              })}
          </tbody>
        </table>

      </td>
    </tr>
  );
}

export default UnitHistoryList;