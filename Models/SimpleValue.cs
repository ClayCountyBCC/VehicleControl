using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VehicleControl.Models
{
  public class SimpleValue
  {
    public string label { get; set; } = "";
    public string value { get; set; } = "";

    SimpleValue() { }

    public static List<SimpleValue> GetUnitGroups()
    {
      string query = @"
        SELECT
          value
          ,label
        FROM
          groups
        WHERE
          enabled = 1
        ORDER  BY
          label ";
      return Constants.Get_Data<SimpleValue>(query);

    }
  }
}