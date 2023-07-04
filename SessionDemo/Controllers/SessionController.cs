using Microsoft.AspNetCore.Mvc;

namespace SessionDemo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SessionController: ControllerBase
    {
        [HttpGet]
        [Route("fetch-from-session")]
        public IActionResult FetchFromSession()
        {
            var data = HttpContext.Session.GetString("user");
            if(data!= null)
            {
                return Ok(data);
            }
            return BadRequest("User Not Found");
        }

        [HttpPost]
        [Route("authenticate")]
        public IActionResult Login([FromBody] Login credential)
        {
            try
            {
                if(credential!=null && credential.userName!=null)
                    HttpContext.Session.SetString("user", credential.userName);
                return Ok(credential);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
