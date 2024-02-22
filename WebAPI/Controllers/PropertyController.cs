using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    public class PropertyController: BaseController
    {
        private readonly IunitOfWork uow;
        private readonly IMapper mapper;

        public PropertyController(IunitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet("list/{sellRent}")]
        public async Task<IActionResult> GetPropertyList(int sellRent)
        {
            var properties = await uow.PropertyRepository.GetPropertiesAsync(sellRent);
            var propertyListDTO = mapper.Map<IEnumerable<PropertyListDto>>(properties);
            return Ok(propertyListDTO);
        }

        [AllowAnonymous]
        [HttpGet("list/")]
        public async Task<IActionResult> GetPropertyListAll()
        {
            var properties = await uow.PropertyRepository.GetPropertiesAllAsync();
            var propertyListDTO = mapper.Map<IEnumerable<PropertyListDto>>(properties);
            return Ok(propertyListDTO);
        }

        [HttpGet("detail/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyDetail(int id)
        {
            var property = await uow.PropertyRepository.GetPropertyDetailAsync(id);
            var propertytDTO = mapper.Map<PropertyDetailDto>(property);
            return Ok(propertytDTO);
        }
    }
}