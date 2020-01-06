using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VehicleControl.Models;
using System.Security.Principal;

namespace VehicleControl.Controllers
{
  [RoutePrefix("API/Unit")]
  public class UnitController : ApiController
  {
    [HttpGet]
    [Route("Get")]
    public IHttpActionResult Get()
    {
      return Ok(unit_tracking_data.Get());
    }

    [HttpPost]
    [Route("Delete")]
    public IHttpActionResult Delete(string unitcode)
    {
      string username = User.Identity.Name;
      if (System.Diagnostics.Debugger.IsAttached && username.Length == 0) username = WindowsIdentity.GetCurrent().Name;
      int deleted_rows = unit_tracking_data.Delete(unitcode, username);
      if (deleted_rows > 0)
      {
        return Ok();
      }
      if (deleted_rows == 0)
      {
        return NotFound();
      }
      else
      {
        return BadRequest($"Error deleting unit: { unitcode }.");
      }
    }

    [HttpPost]
    [Route("Update")]
    public IHttpActionResult Update(string unitcode, bool has_avl, bool has_fc, bool should_have_cad, string group)
    {
      if (!unit_tracking_data.UnitCodeExists(unitcode))
      {
        return BadRequest("Unable to update this unitcode;  The unitcode does not exist.");
      }

      string username = User.Identity.Name;
      if (System.Diagnostics.Debugger.IsAttached && username.Length == 0) username = WindowsIdentity.GetCurrent().Name;
      int updated_rows = unit_tracking_data.Update(unitcode, username, has_avl, has_fc, should_have_cad, group);
      if (updated_rows > 0)
      {
        return Ok();
      }
      if (updated_rows == 0)
      {
        return NotFound();
      }
      else
      {
        return BadRequest($"Error updating unit: { unitcode }.");
      }
    }

    [HttpPost]
    [Route("Add")]
    public IHttpActionResult Add(string unitcode, bool has_avl, bool has_fc, bool should_have_cad, string group)
    {
      if (unit_tracking_data.UnitCodeExists(unitcode))
      {
        return BadRequest("Unable to add this unitcode;  The unitcode is already present.");
      }

      string username = User.Identity.Name;
      if (System.Diagnostics.Debugger.IsAttached && username.Length == 0) username = WindowsIdentity.GetCurrent().Name;
      int updated_rows = unit_tracking_data.Add(unitcode, username, has_avl, has_fc, should_have_cad, group);
      if (updated_rows > 0)
      {
        return Ok();
      }
      if (updated_rows == 0)
      {
        return NotFound();
      }
      else
      {
        return BadRequest($"Error adding unit: { unitcode }.");
      }
    }

  }
}
