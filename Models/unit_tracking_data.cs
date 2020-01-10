using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dapper;

namespace VehicleControl.Models
{
  public class unit_tracking_data
  {
    public string unitcode { get; set; } = "";
    public string using_unit { get; set; } = "";

    public string group_label { get; set; } = "";
    public bool show_in_minicad { get; set; } = false;

    public decimal avl_longitude { get; set; } = 0;
    public decimal avl_latitude { get; set; } = 0;
    public DateTime avl_location_timestamp { get; set; }
    public bool has_avl_device { get; set; } = false;
    public bool has_avl_error { get; set; } = false;

    public decimal fc_longitude { get; set; } = 0;
    public decimal fc_latitude { get; set; } = 0;
    public DateTime fc_location_timestamp { get; set; }
    public bool has_fc_device { get; set; } = false;
    public bool has_fc_error { get; set; } = false;

    public decimal cad_longitude { get; set; } = 0;
    public decimal cad_latitude { get; set; } = 0;
    public DateTime cad_location_timestamp { get; set; }
    public bool should_have_cad_location { get; set; } = false;
    public bool has_cad_error { get; set; } = false;
    
    public List<string> error_information { get; set; } = new List<string>();
    
    unit_tracking_data()
    {
    }

    public static List<unit_tracking_data> Get()
    {
      string query = @"
        SELECT
          UTD.unitcode
          ,ISNULL(UTD.using_unit
                  ,'') using_unit
          ,ISNULL(G.label
                  ,'') group_label
          ,ISNULL(UG.show_in_minicad -- this property should be in the unit_tracking_data table
                  ,0) show_in_minicad
          ,COALESCE(AI.longitude
                    ,AP.longitude
                    ,0) avl_longitude
          ,COALESCE(AI.latitude
                    ,AP.latitude
                    ,0) avl_latitude
          ,COALESCE(AI.location_timestamp
                    ,AP.location_timestamp
                    ,'1/1/1995') avl_location_timestamp
          ,UTD.has_avl_device
          ,COALESCE(F.longitude
                    ,0) fc_longitude
          ,COALESCE(F.latitude
                    ,0) fc_latitude
          ,COALESCE(F.timestamp
                    ,'1/1/1995') fc_location_timestamp
          ,UTD.has_fc_device
          ,COALESCE(C.longitude
                    ,0) cad_longitude
          ,COALESCE(C.latitude
                    ,0) cad_latitude
          ,COALESCE(C.location_timestamp
                    ,'1/1/1995') cad_location_timestamp
          ,UTD.should_have_cad_location
        FROM
          unit_tracking_data UTD
          LEFT OUTER JOIN unit_group UG ON UTD.unitcode = UG.unitcode
          LEFT OUTER JOIN groups G ON UG.group_name = G.value
          LEFT OUTER JOIN avl_data AI ON CAST(UTD.imei AS VARCHAR(50)) = AI.device_id
                                         AND AI.device_type = 'ESN/IMSI'
                                         AND UTD.imei != 0
          LEFT OUTER JOIN avl_data AP ON CAST(UTD.phone_number AS VARCHAR(50)) = AP.device_id
                                         AND AP.device_type = 'Phone Number'
                                         AND UTD.phone_number != 0
          LEFT OUTER JOIN fleetcomplete_data F ON UTD.asset_tag = F.asset_tag
          LEFT OUTER JOIN cad_unit_location_data C ON UTD.unitcode = C.unitcode
        ORDER  BY
          UTD.unitcode;";
      var data = Constants.Get_Data<unit_tracking_data>(query);
      return CheckForErrors(data);
    }

    private static List<unit_tracking_data> CheckForErrors(List<unit_tracking_data> data)
    {

      if (data == null) return data; // null is our error condition
      var yesterday = DateTime.Now.AddDays(-1);

      foreach (unit_tracking_data a in data)
      {
        if (a.has_avl_device)
        {
          // check for AVL errors here
          // if there are any, a.has_avl_error = true
          var l = CheckForLocationErrors("AVL", a.has_avl_device, a.avl_longitude, a.avl_latitude);
          if (l.Count() > 0)
          {
            a.error_information.AddRange(l);
            a.has_avl_error = true;
          }

          var d = CheckForDateErrors("AVL", a.avl_location_timestamp, yesterday);
          if (d.Count() > 0)
          {
            a.error_information.AddRange(d);
            a.has_avl_error = true;
          }
        }

        if (a.has_fc_device)
        {
          // check for FC errors here
          // if there are any, a.has_fc_error = true
          var l = CheckForLocationErrors("Fleet Complete", a.has_fc_device, a.fc_longitude, a.fc_latitude);
          if (l.Count() > 0)
          {
            a.error_information.AddRange(l);
            a.has_fc_error = true;
          }

          var d = CheckForDateErrors("Fleet Complete", a.fc_location_timestamp, yesterday);
          if (d.Count() > 0)
          {
            a.error_information.AddRange(d);
            a.has_fc_error = true;
          }
        }

        if (a.should_have_cad_location)
        {
          // check for cad location erorrs here
          // if there are any, a.has_cad_errors = true
          var l = CheckForLocationErrors("CAD", a.should_have_cad_location, a.cad_longitude, a.cad_latitude);
          if(l.Count() > 0)
          {
            a.error_information.AddRange(l);
            a.has_cad_error = true;
          }

          var d = CheckForDateErrors("CAD", a.cad_location_timestamp, yesterday);
          if(d.Count() > 0)
          {
            a.error_information.AddRange(d);
            a.has_cad_error = true;
          }
        }
      }

      return data;
    }

    private static List<string> CheckForLocationErrors(string location_type, bool expected_location, decimal longitude, decimal latitude)
    {
      var l = new List<string>();
      if(!expected_location && latitude != 0 && longitude != 0)
      {
        l.Add($"This unit has an unexpected {location_type} location.  The 'has {location_type} location' flag is false.");
      }
      if (expected_location && (latitude == 0 || longitude == 0))
      {
        l.Add($"This unit should have a {location_type} location but does not.");
      }
      return l;
    }

    private static List<string> CheckForDateErrors(string location_type, DateTime location_timestamp, DateTime yesterday)
    {
      var l = new List<string>();
      if (location_timestamp > DateTime.Now.AddMinutes(5))
      {
        l.Add($"{location_type} location is set in the future.");
      }
      if (location_timestamp < yesterday)
      {
        l.Add($"{location_type} location has not been updated in the last 24 hours.");
      }
      return l;
    }

    public static int Delete(string unitcode, string username)
    {
      var param = new DynamicParameters();
      param.Add("@username", username);
      param.Add("@unitcode", unitcode);
      string query = @"
        INSERT INTO unit_maintenance_history (unitcode, field, changed_from, changed_to, changed_by)
        VALUES (@unitcode, 'Deleted from unit_tracking_data', @unitcode, '', @username);

        DELETE
        FROM Tracking.dbo.unit_tracking_data
        WHERE 
          unitcode = @unitcode;";

      return Constants.Exec_Query(query, param);
    }

    public static int Add(string unitcode, string username, bool has_avl, bool has_fc, bool should_have_cad, string group)
    {
      if (unitcode.Trim().Length == 0) return -1;

      var param = new DynamicParameters();
      param.Add("@username", username);
      param.Add("@unitcode", unitcode);
      param.Add("@has_avl", has_avl);
      param.Add("@has_fc", has_fc);
      param.Add("@should_have_cad", should_have_cad);
      param.Add("@group", group);
      string query = @"
        DECLARE @Now DATETIME = GETDATE();

        INSERT INTO unit_maintenance_history (unitcode, field, changed_from, changed_to, changed_by)
        VALUES (@unitcode, 'Added unit to unit_tracking_data', @unitcode, '', @username);

        INSERT INTO Tracking.[dbo].[unit_tracking_data]
        (
          [unitcode]
          ,[date_updated]
          ,[longitude]
          ,[latitude]
          ,[data_source]
          ,[imei]
          ,[phone_number]
          ,[asset_tag]
          ,[date_last_communicated]
          ,[tracking_data_updated]
          ,[has_avl_device]
          ,[has_fc_device]
          ,[should_have_cad_location]
        )
        VALUES
        (
          @unitcode
          ,@Now
          ,0
          ,0
          ,'VC'
          ,0
          ,0
          ,''
          ,@Now
          ,@Now
          ,@has_avl
          ,@has_fc
          ,@should_have_cad
        );

        DELETE FROM unit_group WHERE unitcode=@unitcode;

        INSERT INTO unit_group (unitcode, group_name, show_in_minicad)
        SELECT
          @unitcode
          ,@group
          ,default_show_in_minicad_value
        FROM groups
        WHERE value=@group";

      return Constants.Exec_Query(query, param);
    }

    public static int Update(string unitcode, string username, bool has_avl, bool has_fc, bool should_have_cad, string group)
    {
      if (unitcode.Trim().Length == 0) return -1;

      var param = new DynamicParameters();
      param.Add("@username", username);
      param.Add("@unitcode", unitcode);
      param.Add("@has_avl", has_avl);
      param.Add("@has_fc", has_fc);
      param.Add("@should_have_cad", should_have_cad);
      param.Add("@group", group);
      string query = @"
        DECLARE @Now DATETIME = GETDATE();

        INSERT INTO unit_maintenance_history
        (
          unitcode
          ,field
          ,changed_from
          ,changed_to
          ,changed_by
        )
          SELECT
            @unitcode
            ,'Has AVL Device'
            ,has_avl_device
            ,@has_avl
            ,@username
          FROM
            Tracking.dbo.unit_tracking_data
          WHERE
            unitcode = @unitcode
            AND has_avl_device != @has_avl;

        INSERT INTO unit_maintenance_history
        (
          unitcode
          ,field
          ,changed_from
          ,changed_to
          ,changed_by
        )
          SELECT
            @unitcode
            ,'Has Fleet Complete Device'
            ,has_fc_device
            ,@has_fc
            ,@username
          FROM
            Tracking.dbo.unit_tracking_data
          WHERE
            unitcode = @unitcode
            AND has_fc_device != @has_fc;

        INSERT INTO unit_maintenance_history
        (
          unitcode
          ,field
          ,changed_from
          ,changed_to
          ,changed_by
        )
          SELECT
            @unitcode
            ,'Should Have CAD Location'
            ,should_have_cad_location
            ,@should_have_cad
            ,@username
          FROM
            Tracking.dbo.unit_tracking_data
          WHERE
            unitcode = @unitcode
            AND should_have_cad_location != @should_have_cad; 


        UPDATE Tracking.dbo.unit_tracking_data
        SET
          has_avl_device = @has_avl
          ,has_fc_device = @has_fc
          ,should_have_cad_location = @should_have_cad
        WHERE
          unitcode = @unitcode;

        DELETE FROM unit_group
        WHERE  unitcode = @unitcode;

        INSERT INTO unit_group
        (
          unitcode
          ,group_name
          ,show_in_minicad
        )
          SELECT
            @unitcode
            ,@group 
            ,default_show_in_minicad_value
          FROM
            groups
          WHERE
            value = @group;";

      return Constants.Exec_Query(query, param);
    }

    public static bool UnitCodeExists(string unitcode)
    {
      var param = new DynamicParameters();
      param.Add("@unitcode", unitcode);
      string query = @"
        SELECT
          COUNT(*) CNT
        FROM Tracking.dbo.unit_tracking_data
        WHERE 
          unitcode = @unitcode;";
      return Constants.Exec_Scalar<int>(query, param) > 0;
    }

  }
}
