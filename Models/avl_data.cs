﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dapper;
using System.Data;
using System.Data.SqlClient;


namespace VehicleControl.Models
{
  public class avl_data
  {
    public string device_id { get; set; } = "";
    public string device_type { get; set; } = "";
    public string unitcode { get; set; } = "";
    public int direction { get; set; } = 0;
    public DateTime location_timestamp { get; set; }
    public int satellite_count { get; set; } = 0;
    public int velocity { get; set; } = 0;
    public string ip_address { get; set; } = "";
    public decimal latitude { get; set; } = 0;
    public decimal longitude { get; set; } = 0;
    public DateTime updated_on { get; set; }
    public List<string> error_information { get; set; } = new List<string>();

    public avl_data() { }

    public static List<avl_data> Get()
    {
      string query = @"
        SELECT 
          A.[device_id]
          ,A.[device_type]
          ,COALESCE(UI.unitcode, UP.unitcode, '') unitcode
          ,A.[direction]
          ,A.[location_timestamp]
          ,A.[satellite_count]
          ,A.[velocity]
          ,A.[ip_address]
          ,A.[latitude]
          ,A.[longitude]
          ,A.[updated_on] 
        FROM [dbo].[avl_data] A
        LEFT OUTER JOIN unit_tracking_data UI ON A.device_id = CAST(UI.imei AS NVARCHAR(50)) 
          AND A.device_type = 'ESN/IMSI'
        LEFT OUTER JOIN unit_tracking_data UP ON A.device_id = CAST(UP.phone_number AS NVARCHAR(50)) 
          AND A.device_type = 'Phone Number'
        ORDER BY device_type, device_id";
      var data = Constants.Get_Data<avl_data>(query);
      return avl_data.CheckForErrors(data);
    }

    private static List<avl_data> CheckForErrors(List<avl_data> data)
    {
      if (data == null) return data; // null is our error condition

      foreach (avl_data a in data)
      {
        if (a.unitcode.Length == 0)
        {
          a.error_information.Add("Device is not tied to a unit that is on one of the county maps like Minicad or the Inspector View.");
        }
        if (a.location_timestamp > DateTime.Now.AddMinutes(5))
        {
          a.error_information.Add("Location is set in the future.");
        }
        var yesterday = DateTime.Now.AddDays(-1);
        if (a.location_timestamp < yesterday)
        {
          a.error_information.Add("Location has not been updated in the last 24 hours.");
        }
        if (a.updated_on < yesterday)
        {
          a.error_information.Add("Device has not been seen in the last 24 hours.");
        }
        if (a.longitude == 0 || a.latitude == 0)
        {
          a.error_information.Add("Lat/Long is invalid.");
        }
      }

      return data;
    }

    public static int Delete(string device_id, string username)
    {
      var param = new DynamicParameters();
      param.Add("@device_id", device_id);
      string query = @"
        DELETE
        FROM avl_data
        WHERE device_id = @device_id;";

      return Constants.Exec_Query(query, param);
    }

    public static int Update(string device_id, string device_type, string unitcode, string username)
    {
      try
      {
        if (device_type == "Phone Number")
        {
          long phone_number = long.Parse(device_id);
          return UpdatePhoneNumber(phone_number, unitcode, username);
        }
        else
        {
          long imei = long.Parse(device_id);
          return UpdateIMEI(imei, unitcode, username);
        }
      }
      catch(Exception ex)
      {
        new ErrorLog(ex);
        return -1;
      }

    }

    private static int UpdateIMEI(long imei, string unitcode, string username)
    {
      var param = new DynamicParameters();

      param.Add("@imei", imei);
      param.Add("@phone_number", 0);
      param.Add("@username", username);
      param.Add("@unitcode", unitcode);

      string query = @"
        SET ISOLATION LEVEL SERIALIZABLE;

        INSERT INTO maintenance_history (unitcode, field, changed_from, changed_to, changed_by)
        SELECT
          unitcode
          ,'imei' field
          ,CAST(imei AS VARCHAR(50))
          ,'0'
          ,@username
        FROM unit_tracking_data
        WHERE 
          unitcode != @unitcode
          AND imei != @imei;

        UPDATE unit_tracking_data
        SET 
          imei = 0  
        WHERE  
          unitcode != @unitcode
          AND imei = @imei;

        INSERT INTO maintenance_history (unitcode, field, changed_from, changed_to, changed_by)
        SELECT
          unitcode
          ,'imei' field
          ,CAST(imei AS VARCHAR(50))
          ,@imei
          ,@username
        FROM unit_tracking_data
        WHERE 
          unitcode = @unitcode
          AND imei != @imei;

        INSERT INTO maintenance_history (unitcode, field, changed_from, changed_to, changed_by)
        SELECT
          unitcode
          ,'phone_number' field
          ,CAST(phone_number AS VARCHAR(50))
          ,@phone_number
          ,@username
        FROM unit_tracking_data
        WHERE 
          unitcode = @unitcode
          AND phone_number != @phone_number;

        UPDATE unit_tracking_data
        SET 
          imei = @imei
          ,phone_number = @phone_number
        WHERE
          unitcode = @unitcode
          AND imei != @imei;";
      return Constants.Exec_Query(query, param);
    }

    private static int UpdatePhoneNumber(long phone_number, string unitcode, string username)
    {
      var param = new DynamicParameters();

      param.Add("@imei", 0);
      param.Add("@phone_number", phone_number);
      param.Add("@username", username);
      param.Add("@unitcode", unitcode);

      string query = @"
        SET ISOLATION LEVEL SERIALIZABLE;

        INSERT INTO maintenance_history (unitcode, field, changed_from, changed_to, changed_by)
        SELECT
          unitcode
          ,'phone_number' field
          ,CAST(phone_number AS VARCHAR(50))
          ,'0'
          ,@username
        FROM unit_tracking_data
        WHERE 
          unitcode != @unitcode
          AND phone_number != @phone_number;

        UPDATE unit_tracking_data
        SET 
          phone_number = 0  
        WHERE  
          unitcode != @unitcode
          AND imei = @imei;

        INSERT INTO maintenance_history (unitcode, field, changed_from, changed_to, changed_by)
        SELECT
          unitcode
          ,'phone_number' field
          ,CAST(phone_number AS VARCHAR(50))
          ,@phone_number
          ,@username
        FROM unit_tracking_data
        WHERE 
          unitcode = @unitcode
          AND phone_number != @phone_number;

        INSERT INTO maintenance_history (unitcode, field, changed_from, changed_to, changed_by)
        SELECT
          unitcode
          ,'imei' field
          ,CAST(imei AS VARCHAR(50))
          ,@phone_number
          ,@username
        FROM unit_tracking_data
        WHERE 
          unitcode = @unitcode
          AND imei != @imei;

        UPDATE unit_tracking_data
        SET 
          imei = @imei
          ,phone_number = @phone_number
        WHERE
          unitcode = @unitcode
          AND phone_number != @phone_number;
";
      return Constants.Exec_Query(query, param);
    }

  }
}
