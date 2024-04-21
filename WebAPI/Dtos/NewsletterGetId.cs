using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos
{
    public class NewsletterGetId
    {
        public int id { get; set; }
        public string email { get; set; }
    }
}