using Dapper;
using System;
using System.Collections.Generic;

namespace VehicleControl.Models
{
  public class geotab_data
  {
    public string device_id { get; set; }
    public string serial_number { get; set; }
    public string device_type { get; set; }
    public string unitcode { get; set; }
    public DateTime date_device_updated { get; set; }
    public DateTime location_updated_on { get; set; }
    public decimal latitude { get; set; }
    public decimal longitude { get; set; }
    public List<string> error_information { get; set; } = new List<string>();
    public bool has_date_error { get; set; } = false;
    public bool has_location_error { get; set; } = false;
    public bool has_unit_error { get; set; } = false;


    public static List<geotab_data> Get()
    {
      string query = @"
        USE Tracking;

        SELECT
            D.id AS device_id,
            D.serial_number,
            D.device_type,
	        ISNULL(UTD.unitcode, '') AS unitcode,
            D.date_last_updated AS date_device_updated,
            L.status_date AS location_updated_on,
            ISNULL(L.latitude, 0) AS latitude,
            ISNULL(L.longitude, 0) AS longitude
        FROM 
            dbo.geotab_devices D
            LEFT OUTER JOIN dbo.geotab_locations L ON L.device_id = D.id
	        LEFT OUTER JOIN dbo.unit_tracking_data UTD ON D.serial_number = UTD.geotab_serial";

      var data = Constants.Get_Data<geotab_data>(query);
      return CheckForErrors(data);
    }

    private static List<geotab_data> CheckForErrors(List<geotab_data> data)
    {
      if (data == null) return data; // null is our error condition

      foreach (geotab_data a in data)
      {
        if (a.unitcode.Length == 0)
        {
          a.error_information.Add("Device is not tied to a unit that is on one of the county maps like Minicad or the Inspector View.");
          a.has_unit_error = true;
        }
        if (a.location_updated_on > DateTime.Now.AddMinutes(5))
        {
          a.error_information.Add("Location is set in the future.");
          a.has_date_error = true;
        }
        var yesterday = DateTime.Now.AddDays(-1);
        if (a.location_updated_on < yesterday)
        {
          a.error_information.Add("Location has not been updated in the last 24 hours.");
          a.has_date_error = true;
        }
        if (a.date_device_updated < yesterday)
        {
          a.error_information.Add("Device has not been seen in the last 24 hours.");
          a.has_date_error = true;
        }
        if (a.longitude == 0 || a.latitude == 0)
        {
          a.error_information.Add("Lat/Long is invalid.");
          a.has_location_error = true;
        }
      }

      return data;
    }

    public static int Delete(string device_id)
    {
      var param = new DynamicParameters();
      param.Add("@device_id", device_id);
      string query = @"
        DELETE
        FROM geotab_locations
        WHERE device_id = @device_id;

        UPDATE UTD
        SET UTD.geotab_serial = ''
        FROM unit_tracking_data UTD
        INNER JOIN geotab_devices D ON UTD.geotab_serial = D.serial_number AND D.id = @device_id

        DELETE
        FROM geotab_devices
        WHERE id = @device_id;";


      return Constants.Exec_Query(query, param);
    }

    public static int UpdateUnit(string geotab_serial, string unitcode, string username)
    {
      // This function is going to associate a given asset tag with a unitcode.
      var param = new DynamicParameters();

      param.Add("@geotab_serial", geotab_serial);
      param.Add("@username", username);
      param.Add("@unitcode", unitcode);

      string query;

      if (unitcode.Length == 0)
      {
        query = @"
        SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

        INSERT INTO unit_maintenance_history (unitcode, field, changed_from, changed_to, changed_by)
        SELECT
          unitcode
          ,'geotab_serial' field
          ,geotab_serial
          ,''
          ,@username
        FROM unit_tracking_data
        WHERE 
          geotab_serial = @geotab_serial;

        UPDATE unit_tracking_data
        SET 
          geotab_serial = ''  
        WHERE            
          geotab_serial=@geotab_serial;";
      }
      else
      {
        query = @"
        SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

        WITH NewData AS (
          SELECT
            @geotab_serial geotab_serial
            ,@username username
            ,@unitcode unitcode
          WHERE NOT EXISTS (SELECT unitcode FROM unit_tracking_data UTD2 WHERE UTD2.unitcode = @unitcode)
        )

        INSERT INTO Tracking.dbo.unit_maintenance_history (unitcode, field, changed_from, changed_to, changed_by)
        SELECT
          unitcode
          ,'Added New UnitCode'
          ,''
          ,''
          ,username
        FROM NewData;

        WITH NewData AS (
          SELECT
            @geotab_serial geotab_serial
            ,@username username
            ,@unitcode unitcode
          WHERE NOT EXISTS (SELECT unitcode FROM unit_tracking_data UTD2 WHERE UTD2.unitcode = @unitcode)
        )

        INSERT INTO Tracking.dbo.unit_tracking_data
                   ([unitcode]
                   ,[longitude]
                   ,[latitude]
                   ,[data_source]
                   ,[imei]
                   ,[phone_number]
                   ,[geotab_serial]
                   ,[asset_tag]
                   ,[date_last_communicated])
        SELECT
          unitcode
          ,0
          ,0
          ,'GT'
          ,0
          ,0
          ,@geotab_serial
          ,''
          ,GETDATE()
        FROM NewData;

        INSERT INTO unit_maintenance_history (unitcode, field, changed_from, changed_to, changed_by)
        SELECT
          unitcode
          ,'geotab_serial' field
          ,geotab_serial
          ,''
          ,@username
        FROM unit_tracking_data
        WHERE 
          unitcode != @unitcode
          AND geotab_serial = @geotab_serial;

        UPDATE unit_tracking_data
        SET 
          geotab_serial = ''
        WHERE  
          unitcode != @unitcode
          AND geotab_serial = @geotab_serial;

        INSERT INTO unit_maintenance_history (unitcode, field, changed_from, changed_to, changed_by)
        SELECT
          unitcode
          ,'geotab_serial' field
          ,geotab_serial
          ,@geotab_serial
          ,@username
        FROM unit_tracking_data
        WHERE 
          unitcode = @unitcode
          AND geotab_serial != @geotab_serial;

        UPDATE unit_tracking_data
        SET 
          geotab_serial=@geotab_serial          
        WHERE
          unitcode = @unitcode
          AND geotab_serial != @geotab_serial;";
      }
      return Constants.Exec_Query(query, param);
    }
  }
}
