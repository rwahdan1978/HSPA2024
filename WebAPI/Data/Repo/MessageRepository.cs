using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class MessageRepository : IMessageRepository
    {
        private readonly DataContext dc;

        public MessageRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void AddMessage(Newsletter newsletter)
        {
            dc.Newsletters.Add(newsletter);
        }

        public async Task<Newsletter> FindMessage(int id)
        {
            return await dc.Newsletters.FindAsync(id);
        }
    }
}