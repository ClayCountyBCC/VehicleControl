using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VehicleControl.Models;

namespace VehicleControl.Controllers
{
  [RoutePrefix("API/History")]
  public class HistoryController : ApiController
  {
    [HttpGet]
    [Route("Unit")]
    public IHttpActionResult Unit(string unit = "")
    {
      
      return Ok(unit_history.GetByUnitCode(unit));
    }

    [HttpGet]
    [Route("DeviceId")]
    public IHttpActionResult DeviceId(string deviceId = "")
    {
      return Ok(unit_history.GetByDeviceId(deviceId));
    }

  }
}
