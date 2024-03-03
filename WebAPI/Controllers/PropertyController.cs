using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class PropertyController: BaseController
    {
        private readonly IunitOfWork uow;
        private readonly IMapper mapper;
        private readonly IPhotoService photoService;

        public PropertyController(IunitOfWork uow, IMapper mapper, IPhotoService photoService)
        {
            this.uow = uow;
            this.mapper = mapper;
            this.photoService = photoService;
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

        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddProperty(PropertyDto propertyDto)
        {
            var property = mapper.Map<Property>(propertyDto);
            var userId = GetUserId();
            property.PostedBy =userId;
            property.LastUpdatedBy=userId;
            uow.PropertyRepository.AddProperty(property);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpPost("add/photo/{propId}")]
        [Authorize]
        public async Task<IActionResult> AddPropertyPhoto(IFormFile file, int propId)
        {

            var theDate = DateTime.Now.ToString("dddd, dd MMMM yyyy HH:mm:ss");
            var property = await uow.PropertyRepository.GetPropertyByIdAsync(propId);
            var folder = property.Name + theDate;
            
            var result = await photoService.UploadPhotoAsync(file,folder);

            if (result.Error != null)
                return BadRequest(result.Error.Message);
            
            var photo = new Photo
            {
                ImageUrl = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };
            if (property.Photos.Count == 0)
            {
                photo.IsPrimary =true;
            }
            property.Photos.Add(photo);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpPost("set-primary-photo/{propId}/{photoPublicId}")]
        [Authorize]
        public async Task<IActionResult> SetPrimaryPhoto(int propId, string photoPublicId)
        {
            var userId = GetUserId();
            var property = await uow.PropertyRepository.GetPropertyByIdAsync(propId);
            
            if (property == null)
                return BadRequest("No such property or photo exists");

            if (property.PostedBy != userId)
                return BadRequest("You are not authorized to change the primary photo!");

            var photo = property.Photos.FirstOrDefault(p => p.PublicId == photoPublicId);

            if (photo == null)
                return BadRequest("No such property or photo exists");

            if (photo.IsPrimary)
                return BadRequest("photo is already a primary photo!");

            var currentPrimary = property.Photos.FirstOrDefault(p => p.IsPrimary);

            if (currentPrimary != null) currentPrimary.IsPrimary = false;

            photo.IsPrimary = true;

            if (await uow.SaveAsync()) return NoContent();

            return BadRequest("Some error has occured, failed to set the primary photo!");
        }

        [HttpDelete("delete-photo/{propId}/{photoPublicId}")]
        [Authorize]
        public async Task<IActionResult> DeletePhoto(int propId, string photoPublicId)
        {
            var userId = GetUserId();
            var property = await uow.PropertyRepository.GetPropertyByIdAsync(propId);
            
            if (property == null)
                return BadRequest("No such property or photo exists");

            if (property.PostedBy != userId)
                return BadRequest("You are not authorized to delete the photo!");

            var photo = property.Photos.FirstOrDefault(p => p.PublicId == photoPublicId);

            if (photo == null)
                return BadRequest("No such property or photo exists");

            if (photo.IsPrimary)
                return BadRequest("You cannot delete the primary photo!");

            var result = await photoService.DeletePhotoAsync(photo.PublicId);
            
            if (result.Error != null) 
                return BadRequest(result.Error.Message);

            property.Photos.Remove(photo);

            if (await uow.SaveAsync()) return Ok();

            return BadRequest("Some error has occured, failed to delete photo!");
        }
    }
}