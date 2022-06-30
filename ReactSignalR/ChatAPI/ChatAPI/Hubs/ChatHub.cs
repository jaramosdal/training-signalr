using Microsoft.AspNetCore.SignalR;

namespace ChatAPI.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        [HubMethodName("SendMessageToUser")]
        public async Task DirectMessage(string user, string message)
            => await Clients.User(user).SendAsync("ReceiveMessage", user, message);

        public Task ThrowException()
            => throw new HubException("This error will be sent to the client!");

        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await Clients.All.SendAsync("ConnectedUser", Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await Clients.All.SendAsync("DisconnectedUser", Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
