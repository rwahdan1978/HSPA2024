using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Newsletter newsletter);
        Task<Newsletter> FindMessage(int id);
    }
}