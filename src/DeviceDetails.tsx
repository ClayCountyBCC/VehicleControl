import React from 'react';
import { Format_DateTime } from './Utilities';
//import { IErrorInformation } from './interfaces';

const DeviceDetails = (props: any) =>
{
    
  if (!props.show_details) return null;
  
  const valid_keys = [
    'device_id',
    'device_type',
    'updated_on',
    'location_timestamp',
    'longitude',
    'latitude',
    'direction',
    'satellite_count',
    'unitcode',
    'velocity',
    'asset_tag',
    'vin',
    'make',
    'model',
    'vehicle_year',
    'inci_id',
    'status',
    'avstatus'];

  const date_keys = ['location_timestamp', 'updated_on'];

  let keys = Object.keys(props);


  return (
    <>
      {keys.map(key =>
      {
        if (valid_keys.indexOf(key) > -1)
        {
          return (
            <tr key={key}>
              <td></td>
              <td colSpan={2}>
                {key}
              </td>
              <td colSpan={props.colspan - 3}>
                { date_keys.indexOf(key) > -1 ? Format_DateTime(props[key]) : props[key] ? props[key].toString() : '' }
              </td>
            </tr>
          )
        }
      })}
    </>
  );
}

export default DeviceDetails;