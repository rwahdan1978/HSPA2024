using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Data.Repo;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class FamilyDocumentsController : BaseController
    {
        private readonly DataContext dc;
        private readonly IMapper mapper;
        private readonly IPhotoService photoService;
        private readonly IunitOfWork uow;

        public FamilyDocumentsController(DataContext dc, IMapper mapper, 
                        IPhotoService photoService, IunitOfWork uow)
        {
            this.dc = dc;
            this.mapper = mapper;
            this.photoService = photoService;
            this.uow = uow;
        }

        [Authorize]
        [HttpGet("list/")]
        public async Task<IActionResult> GetAllPhotos()
        {
            var photos = await uow.familyRepository.GetPhotosAllAsync();
            var photoListDTO = mapper.Map<IEnumerable<photoListDto>>(photos);
            return Ok(photoListDTO);
        }

        // familyDocuments/add/photo/
        [HttpPost("add/photo")]
        [Authorize]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var thedate = DateTime.Now.ToString("dd_MM_yyyy__HH_mm_ss");
            var folder = "FamilyDocs_"+ thedate;
            var result = await photoService.UploadFamilyDocumentsAsync(file,folder);

            //var theUrl = "https://res.cloudinary.com/hspa2024/image/upload/c_thumb,h_500,w_800/" + result.PublicId;

            if (result.Error != null)
                return BadRequest(result.Error.Message);

            var photo = new FamilyDocuments
            {
                DisplayName = result.DisplayName,
                ImageUrl = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
            };

            dc.familyDocuments.Add(photo);
            
            await uow.SaveAsync();    
            return Ok(200 + " Photo-Document uploaded successfully!");
        }

        // familyDocuments/delete-photo/pid
        [HttpDelete("delete-photo/{photoPublicId}")]
        [Authorize]
        public async Task<IActionResult> DeletePhoto(string photoPublicId)
        {
            var photo = await uow.familyRepository.GetPhotoByIdAsync(photoPublicId);

            if (photo == null)
                return BadRequest("No such photo exists");

            var result = await photoService.DeletePhotoAsync(photoPublicId);
            
            if (result.Error != null) 
                return BadRequest(result.Error.Message);

            var delPhoto = uow.familyRepository.DeletePhoto(photo.PublicId);

            if (await uow.SaveAsync()) return Ok();

            return Ok();
        }
    }
}