using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dapper;

namespace VehicleControl.Models
{
  public class fleetcomplete_data
  {
    public string device_id { get; set; }
    public string asset_tag { get; set; }
    public string unitcode { get; set; }  = "";
    public string vin { get; set; }
    public string make { get; set; }
    public string model { get; set; }
    public string vehicle_year { get; set; }
    public DateTime location_timestamp { get; set; }
    public DateTime date_updated { get; set; }
    public decimal latitude { get; set; }
    public decimal longitude { get; set; }
    public int direction { get; set; }
    public int velocity { get; set; }
    public List<string> error_information { get; set; } = new List<string>();
    public bool has_date_error { get; set; } = false;
    public bool has_location_error { get; set; } = false;
    public bool has_unit_error { get; set; } = false;
    public bool has_asset_tag_error { get; set; } = false;

    public fleetcomplete_data() { }

    public static List<fleetcomplete_data> Get()
    {
      string query = @"
        SELECT 
          F.[device_id]
          ,F.[asset_tag]
          ,ISNULL(U.unitcode, '') unitcode
          ,F.[vin]
          ,F.[make]
          ,F.[model]
          ,F.[year]
          ,F.[timestamp] location_timestamp
          ,F.[date_updated]
          ,F.[latitude]
          ,F.[longitude]
          ,F.[direction]
          ,F.[velocity]
        FROM [dbo].[fleetcomplete_data] F
        LEFT OUTER JOIN unit_tracking_data U ON F.asset_tag = U.asset_tag
        ORDER BY asset_tag, device_id";

      var data = Constants.Get_Data<fleetcomplete_data>(query);
      return CheckForErrors(data);
    }

    private static List<fleetcomplete_data> CheckForErrors(List<fleetcomplete_data> data)
    {
      if (data == null) return data; // null is our error condition

      foreach (fleetcomplete_data a in data)
      {
        if(a.unitcode.Length == 0)
        {
          a.error_information.Add("Device is not tied to a unit that is on one of the county maps like Minicad or the Inspector View.");
          a.has_unit_error = true;
        }
        if(a.device_id == a.asset_tag)
        {
          a.error_information.Add("Asset Tag and Device Id match.  This means that the asset tag is not set properly in Fleet Complete.");
          a.has_asset_tag_error = true;
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
        if (a.date_updated < yesterday)
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
        FROM fleetcomplete_data
        WHERE device_id = @device_id;";

      return Constants.Exec_Query(query, param);
    }


  }
}