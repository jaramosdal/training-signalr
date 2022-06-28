using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    // The Hub class manages connections, groups, and messaging.
    public class ChatHub : Hub
    {
        // The SendMessage method can be called by a connected client to send a message to all clients
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        // The client should use this name instead of the .NET method name when invoking the method
        [HubMethodName("SendMessageToUser")]
        public async Task DirectMessage(string user, string message) 
            => await Clients.User(user).SendAsync("ReceiveMessage", user, message);

        public Task ThrowException()
            => throw new HubException("This error will be sent to the client!");

        // Perform actions when a client connects to the hub, such as adding it to a group
        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnConnectedAsync();
        }

        // If the client disconnects intentionally, such as by calling connection.stop(), the exception parameter is set to null. However, if the client disconnects due to an error, such as a network failure, the exception parameter contains an exception that describes the failure.
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }
    }
}