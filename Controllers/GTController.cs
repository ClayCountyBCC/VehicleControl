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
    [RoutePrefix("API/GT")]
    public class GTController : ApiController
    {
        [HttpGet]
        [Route("Get")]
        public IHttpActionResult Get()
        {
            return Ok(geotab_data.Get());
        }

        [HttpPost]
        [Route("Update")]
        public IHttpActionResult Update(string device_id, string unitcode)
        {
            if (unitcode == null) unitcode = "";
            string username = User.Identity.Name;
            if (System.Diagnostics.Debugger.IsAttached && username.Length == 0) username = WindowsIdentity.GetCurrent().Name;
            int result = geotab_data.UpdateUnit(device_id, unitcode, username);
            if (result > 0)
            {
                return Ok();
            }
            else
            {
                return BadRequest($"Error updating device_id: {device_id} to unitcode: {unitcode}.");
            }
        }

        [HttpPost]
        [Route("Delete")]
        public IHttpActionResult Delete(string device_id)
        {
            string username = User.Identity.Name;
            if (System.Diagnostics.Debugger.IsAttached && username.Length == 0) username = WindowsIdentity.GetCurrent().Name;
            int deleted_rows = geotab_data.Delete(device_id);
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
                return BadRequest($"Error deleting device_id: {device_id}.");
            }
        }


    }
}
