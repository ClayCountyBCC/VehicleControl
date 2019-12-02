using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VehicleControl.Models
{
  public class unit_tracking_data
  {
    public string unitcode { get; set; } = "";
    public string using_unit { get; set; } = "";
    public string data_source { get; set; } = "";
    public long imei { get; set; } = 0;
    public long phone_number { get; set; } = 0;    
    public string asset_tag { get; set; } = "";
    public DateTime date_last_saved { get; set; }
    public List<string> error_information { get; set; } = new List<string>();
    public Dictionary<long, avl_data> avl_devices = new Dictionary<long, avl_data>();
    public cad_data cad_location_data { get; set; } = null;
    public fleetcomplete_data fleetcomplete_location_data { get; set; } = null;

    unit_tracking_data()
    {
    }

    public static List<unit_tracking_data> Get()
    {
      return new List<unit_tracking_data>();
    }



  }
}
