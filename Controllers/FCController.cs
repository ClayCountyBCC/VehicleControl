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
  [RoutePrefix("API/FC")]
  public class FCController : ApiController
  {
    [HttpGet]
    [Route("Get")]
    public IHttpActionResult Get()
    {
      string username = User.Identity.Name;
      if (System.Diagnostics.Debugger.IsAttached && username.Length == 0) username = WindowsIdentity.GetCurrent().Name;
      return Ok(fleetcomplete_data.Get());
    }

    [HttpPost]
    [Route("Update")]
    public IHttpActionResult Update(string asset_tag, string unitcode)
    {
      if (unitcode == null) unitcode = "";
      string username = User.Identity.Name;
      if (System.Diagnostics.Debugger.IsAttached && username.Length == 0) username = WindowsIdentity.GetCurrent().Name;
      int result = fleetcomplete_data.UpdateUnit(asset_tag, unitcode, username);
      if (result > 0)
      {
        return Ok();
      }
      else
      {
        return BadRequest($"Error updating device_id: { asset_tag } to unitcode: { unitcode }.");
      }
    }

    [HttpPost]
    [Route("Delete")]
    public IHttpActionResult Delete(string device_id)
    {
      string username = User.Identity.Name;
      if (System.Diagnostics.Debugger.IsAttached && username.Length == 0) username = WindowsIdentity.GetCurrent().Name;
      int deleted_rows = fleetcomplete_data.Delete(device_id);
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
        return BadRequest($"Error deleting device_id: { device_id }.");
      }

    }
  }
}
