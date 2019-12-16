using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Web.Http;
using VehicleControl.Models;

namespace VehicleControl.Controllers
{
  [RoutePrefix("API/AVL")]
  public class AVLController : ApiController
  {

    [HttpGet]
    [Route("Get")]
    public IHttpActionResult Get()
    {
      string username = User.Identity.Name;
      if (System.Diagnostics.Debugger.IsAttached && username.Length == 0) username = WindowsIdentity.GetCurrent().Name;
      return Ok(avl_data.Get());
    }

    [HttpPost]
    [Route("Update")]
    public IHttpActionResult Update(string device_id, string device_type, string unitcode)
    {
      string username = User.Identity.Name;
      if (System.Diagnostics.Debugger.IsAttached && username.Length == 0) username = WindowsIdentity.GetCurrent().Name;
      int result = avl_data.Update(device_id, device_type, unitcode, username);
      if(result > 0)
      {
        return Ok(avl_data.Get());
      }
      else
      {
        return BadRequest($"Error updating device_id: { device_id } to unitcode: { unitcode }.");
      }
    }

    [HttpPost]
    [Route("Delete")]
    public IHttpActionResult Delete(string device_id)
    {
      string username = User.Identity.Name;
      if (System.Diagnostics.Debugger.IsAttached && username.Length == 0) username = WindowsIdentity.GetCurrent().Name;
      int deleted_rows = avl_data.Delete(device_id, username);
      if(deleted_rows > 0)
      {
        return Ok(avl_data.Get());
      }
      if(deleted_rows == 0)
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
