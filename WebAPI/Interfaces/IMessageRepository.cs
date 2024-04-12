using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Newsletter newsletter);
    }
}