using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dapper;

namespace VehicleControl.Models
{
  public class cad_data
  {
    public string unitcode { get; set; } = "";
    public DateTime location_timestamp { get; set; } = new DateTime();
    public string inci_id { get; set; } = "";
    public string status { get; set; } = "";
    public decimal latitude { get; set; } = 0;
    public decimal longitude { get; set; } = 0;
    public int speed { get; set; } = -1;
    public int heading { get; set; } = 0;
    public DateTime updated_on { get; set; }
    public bool has_date_error { get; set; } = false;
    public bool has_location_error { get; set; } = false;
    public bool has_unit_error { get; set; } = false;
    public List<string> error_information = new List<string>();

    public cad_data() { }

    public static List<cad_data> Get()
    {
      string query = @"
        SELECT
          unitcode
          ,location_timestamp
          ,inci_id
          ,status
          ,avstatus
          ,latitude
          ,longitude
          ,speed
          ,heading
          ,updated_on
        FROM
          Tracking.dbo.cad_unit_location_data
        ORDER  BY
          unitcode ";

      var data = Constants.Get_Data<cad_data>(query);
      return CheckForErrors(data);

    }

    private static List<cad_data> CheckForErrors(List<cad_data> data)
    {
      if (data == null) return data; // null is our error condition

      foreach (cad_data a in data)
      {
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

    public static int Delete(string unitcode, string username)
    {
      var param = new DynamicParameters();
      param.Add("@username", username);
      param.Add("@unitcode", unitcode);
      string query = @"
        INSERT INTO unit_maintenance_history (unitcode, field, changed_from, changed_to, changed_by)
        VALUES (@unitcode, 'Deleted from cad_unit_location_data', @unitcode, '', @username);

        DELETE
        FROM Tracking.dbo.cad_unit_location_data
        WHERE 
          unitcode = @unitcode;";

      return Constants.Exec_Query(query, param);
    }

  }

}