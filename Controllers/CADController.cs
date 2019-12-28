using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Security.Principal;
using VehicleControl.Models;

namespace VehicleControl.Controllers
{
  [RoutePrefix("API/CAD")]
  public class CADController : ApiController
  {
    [HttpGet]
    [Route("Get")]
    public IHttpActionResult Get()
    {
      string username = User.Identity.Name;
      if (System.Diagnostics.Debugger.IsAttached && username.Length == 0) username = WindowsIdentity.GetCurrent().Name;
      return Ok(cad_data.Get());
    }

    [HttpPost]
    [Route("Delete")]
    public IHttpActionResult Delete(string unitcode)
    {
      string username = User.Identity.Name;
      if (System.Diagnostics.Debugger.IsAttached && username.Length == 0) username = WindowsIdentity.GetCurrent().Name;
      int deleted_rows = cad_data.Delete(unitcode, username);
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
        return BadRequest($"Error deleting device_id: { unitcode }.");
      }
    }


  }
}
