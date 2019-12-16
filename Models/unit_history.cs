using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dapper;

namespace VehicleControl.Models
{
  public class unit_history
  {
    public int id { get; set; } = -1;
    public string unitcode { get; set; } = "";
    public string field { get; set; } = "";
    public string changed_from { get; set; } = "";
    public string changed_to { get; set; } = "";
    public DateTime changed_on { get; set; } = DateTime.Today;
    public string changed_by { get; set; } = "";
    public string error_message { get; set; } = "";

    public unit_history() { }
    public unit_history(string error)
    {
      error_message = error;
    }

    public static List<unit_history> GetByUnitCode(string unitcode)
    {
      if(unitcode.Length ==0) return GetHistoryError("The unitcode was not passed correctly, so no results can be returned.");

      var param = new DynamicParameters();
      param.Add("@unitcode", unitcode);
      string query = @"
        SELECT
          id
          ,unitcode
          ,field
          ,changed_from
          ,changed_to
          ,changed_on
          ,changed_by
        FROM unit_maintenance_history
        WHERE 
          unitcode = @unitcode
        ORDER BY id DESC";
      var data = Constants.Get_Data<unit_history>(query, param);
      if(data == null || data.Count() == 0)
      {
        string message = "";
        if(data == null)
        {
          message = "An error has occurred when attempting to retrieve this information.  Please contact MIS Development for resolution.";
        }
        if (data.Count() == 0)
        {
          message = "No history found for Unit: " + unitcode + ".";
        }
        return GetHistoryError(message);

      }
      return data;
    }

    public static List<unit_history> GetByDeviceId(string device_id)
    {
      if (device_id.Length == 0) return GetHistoryError("The device_id was not passed correctly, so no results can be returned.");

      var param = new DynamicParameters();
      param.Add("@device_id", device_id);
      string query = @"
        SELECT
          id
          ,unitcode
          ,field
          ,changed_from
          ,changed_to
          ,changed_on
          ,changed_by
        FROM unit_maintenance_history
        WHERE 
          changed_to = @device_id
          OR changed_from = @device_id
        ORDER BY id DESC";
      var data = Constants.Get_Data<unit_history>(query, param);

      if (data == null || data.Count() == 0)
      {
        string message = "";
        if (data == null)
        {
          message = "An error has occurred when attempting to retrieve this information.  Please contact MIS Development for resolution.";
        }
        if (data.Count() == 0)
        {
          message = "No history found for Device: " + device_id + ".";
        }
        return GetHistoryError(message);        
      }

      return data;
    }

    private static List<unit_history> GetHistoryError(string error_message)
    {
      var historylist = new List<unit_history>();
      historylist.Add(new unit_history(error_message));
      return historylist;
    }

  }
}