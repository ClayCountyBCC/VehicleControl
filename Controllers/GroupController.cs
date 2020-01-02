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
  [RoutePrefix("API/Group")]
  public class GroupController : ApiController
  {
    [HttpGet]
    [Route("GetUnitGroups")]
    public IHttpActionResult GetUnitGroups()
    {
      return Ok(SimpleValue.GetUnitGroups());
    }
  }
}
