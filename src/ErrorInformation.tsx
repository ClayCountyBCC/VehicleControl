import React from 'react';
import { IErrorInformation } from './interfaces';

const ErrorInformation = (props: IErrorInformation) =>
{
  if (!props.show_errors) return null;

  return (
    <tr>
      <td>
      </td>
      <td colSpan={props.colspan - 1}>
        <ul>
          {props.error_information.map(
            (errorText, index) =>
            {
              return (
                <li key={index}>
                  {errorText}
                </li>
              )
            })}
        </ul>
      </td>
    </tr>
  );
}

export default ErrorInformation;