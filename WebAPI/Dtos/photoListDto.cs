using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos
{
    public class photoListDto
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string PublicId { get; set; }
    }
}