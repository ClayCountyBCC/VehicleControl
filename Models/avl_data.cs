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

    public static int Delete(string device_id)
    {
      var param = new DynamicParameters();
      param.Add("@device_id", device_id);
      string query = @"
        DELETE
        FROM avl_data
        WHERE device_id = @device_id;";

      return Constants.Exec_Query(query, param);
    }

  }
}
