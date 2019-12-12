using System;
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
    public decimal latitude { get; set; } = 0;
    public decimal longitude { get; set; } = 0;
    public DateTime updated_on { get; set; }
    public List<string> error_information { get; set; } = new List<string>();
    public bool has_date_error { get; set; } = false;
    public bool has_location_error { get; set; } = false;
    public bool has_unit_error { get; set; } = false;

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
          a.has_unit_error = true;
        }
        if (a.location_timestamp > DateTime.Now.AddMinutes(5))
        {
          a.error_information.Add("Location is set in the future.");
          a.has_date_error = true;
        }
        var yesterday = DateTime.Now.AddDays(-1);
        if (a.location_timestamp < yesterday)
        {
          a.error_information.Add("Location has not been updated in the last 24 hours.");
          a.has_date_error = true;
        }
        if (a.updated_on < yesterday)
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

        WITH NewData AS (
          SELECT
            @imei imei
            ,@phone_number phone_number
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
            @imei imei
            ,@phone_number phone_number
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
                   ,[asset_tag]
                   ,[date_last_communicated])
        SELECT
          unitcode
          ,0
          ,0
          ,'AVL'
          ,0
          ,0
          ,''
          ,GETDATE()
        FROM NewData;

        INSERT INTO unit_maintenance_history (unitcode, field, changed_from, changed_to, changed_by)
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

        INSERT INTO unit_maintenance_history (unitcode, field, changed_from, changed_to, changed_by)
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

        INSERT INTO unit_maintenance_history (unitcode, field, changed_from, changed_to, changed_by)
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
          AND imei != @imei;
";
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

        WITH NewData AS (
          SELECT
            @imei imei
            ,@phone_number phone_number
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
            @imei imei
            ,@phone_number phone_number
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
                   ,[asset_tag]
                   ,[date_last_communicated])
        SELECT
          unitcode
          ,0
          ,0
          ,'AVL'
          ,0
          ,0
          ,''
          ,GETDATE()
        FROM NewData;

        INSERT INTO unit_maintenance_history (unitcode, field, changed_from, changed_to, changed_by)
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

        INSERT INTO unit_maintenance_history (unitcode, field, changed_from, changed_to, changed_by)
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

        INSERT INTO unit_maintenance_history (unitcode, field, changed_from, changed_to, changed_by)
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
