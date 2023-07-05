using Microsoft.AspNetCore.Http;

namespace SessionMiddleware
{
    public class SessionExtMiddle : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            if(context.Request.Path.StartsWithSegments("/api/SessionOperation") && IsCrudOperation(context.Request.Method))
            {
                switch (context.Request.Method)
                {
                    case "GET":
                        await context.Response.WriteAsync(context.Session.GetString("user"));
                        break;
                    case "POST":
                    case "PUT":
                        context.Session.SetString("user", context.Request.Query["user"]);
                        break;
                    case "DELETE":
                        context.Session.Remove("user");
                            break;
                    default:
                        context.Response.StatusCode = 405;
                        break;
                }
                return;
            }
            await next(context);
        }
        private bool IsCrudOperation(string method)
        {
            return method.Equals("GET", StringComparison.OrdinalIgnoreCase)
                || method.Equals("POST", StringComparison.OrdinalIgnoreCase)
                || method.Equals("PUT", StringComparison.OrdinalIgnoreCase)
                || method.Equals("DELETE", StringComparison.OrdinalIgnoreCase);
        }
    }
}