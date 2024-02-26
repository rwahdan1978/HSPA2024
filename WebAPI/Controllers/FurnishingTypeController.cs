using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    public class FurnishingTypeController: BaseController
    {
        private readonly IunitOfWork uow;
        private readonly IMapper mapper;

        public FurnishingTypeController(IunitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

                // GET api/furnishingtypes
        [HttpGet ("list")]        
        [AllowAnonymous]
        public async Task<IActionResult> GetFurnishingTypes()
        {            
            var furnishingTypes = await uow.FurnishingTypeRepository.GetFurnishingTypesAsync();
            var furnishingTypesDto = mapper.Map<IEnumerable<KeyValuePairDto>>(furnishingTypes);
            return Ok(furnishingTypesDto);
        }

    }
}