namespace ChatAPI.Models;

public static class Chat
{
    static Chat()
    {
        Messages = new List<Message>();
    }

    public static List<Message> Messages { get; set; }
}