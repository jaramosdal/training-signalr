using ChatAPI.Hubs;
using ChatAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace ChatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatController(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Message>> GetMessages()
        {
            return Ok(Chat.Messages);
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessages(Message message)
        {
            Chat.Messages.Add(message);
            await _hubContext.Clients.All.SendAsync("NuevoMensaje");
            return Ok();
        }
    }
}
