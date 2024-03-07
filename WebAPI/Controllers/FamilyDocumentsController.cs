using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
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


        // we need to work on this. make repository to get the photos
        // familyDocuments/list/
        [AllowAnonymous]
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
            var theDate = DateTime.Now.ToString("dddd, dd MMMM yyyy HH:mm:ss");
            var folder = "FamilyDocs";
            var result = await photoService.UploadFamilyDocumentsAsync(file,folder);
             if (result.Error != null)
                return BadRequest(result.Error.Message);

            var photo = new FamilyDocuments
            {
                ImageUrl = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            dc.familyDocuments.Add(photo);
            
            await uow.SaveAsync();    
            return Ok(200 + " Photo-Document uploaded successfully!");
        }
    }
}