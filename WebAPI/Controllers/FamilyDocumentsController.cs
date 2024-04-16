using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Authorize]
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

        public class ValuesController : Controller
        {
            IConfiguration configuration;

            public ValuesController(IConfiguration configuration)
            {
                this.configuration = configuration;
            }
        }

        
        [HttpGet("list/")]
        public async Task<IActionResult> GetAllPhotos()
        {
            var photos = await uow.familyRepository.GetPhotosAllAsync();
            var photoListDTO = mapper.Map<IEnumerable<photoListDto>>(photos);
            return Ok(photoListDTO);
        }

       
        [HttpGet("listwithfoldername/{folder}")]
        public async Task<IActionResult> GetAllPhotos(string folder)
        {
            var photos = await uow.familyRepository.GetPhotosAllFromFolderAsync(folder);
            var photoListDTO = mapper.Map<IEnumerable<photoListDto>>(photos);
            return Ok(photoListDTO);
        }

        
        [HttpGet("folders/")]
        public string GetFolders()
        {
            var cloudinary = 
            new Cloudinary(cloudinaryUrl: "cloudinary://334819583972299:M6mwunz9g3seqhMcP_CGV0HCNvc@hspa2024");
            var test = cloudinary.RootFolders().JsonObj.ToString();
            return test;
        }

      
        [HttpPost("createfolders/{folder}")]
        public string CreateFolder(string folder)
        {
            var cloudinary = 
            new Cloudinary(cloudinaryUrl: "cloudinary://334819583972299:M6mwunz9g3seqhMcP_CGV0HCNvc@hspa2024");
            var test = cloudinary.CreateFolder(folder).JsonObj.ToString();
            return test;
        }

        [HttpDelete("deletefolders/{folder}")]
        public string DeleteFolder(string folder)
        {
            var cloudinary = 
            new Cloudinary(cloudinaryUrl: "cloudinary://334819583972299:M6mwunz9g3seqhMcP_CGV0HCNvc@hspa2024");
            var test = cloudinary.DeleteFolder(folder).JsonObj.ToString();
            return test;
        }

        // familyDocuments/add/photo/
        [HttpPost("add/photo/{folder}")]
        
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file, string folder)
        {
            var thedate = DateTime.Now.ToString("dd_MM_yyyy__HH_mm_ss");
            Random rnd = new Random();
            int num = rnd.Next();
            var result = await photoService.UploadFamilyDocumentsAsync(file,folder);

            if (result.Error != null)
                return BadRequest(result.Error.Message);

            var photo = new FamilyDocuments
            { 
                ImageUrl = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                ImageId =  thedate+"_"+ num,
                FolderName = folder
            };

            dc.familyDocuments.Add(photo);
            
            await uow.SaveAsync();    
            return Ok(200 + " Photo-Document uploaded successfully!");
        }

        // familyDocuments/delete-photo/imageId/pid
        [HttpDelete("delete-photo/{imageId}")]
       
        public async Task<IActionResult> DeletePhoto(string imageId)
        {
            var photo = await uow.familyRepository.GetPhotoByIdAsync(imageId);

            if (photo == null)
                return BadRequest("No such photo exists");

            var result = await photoService.DeletePhotoAsync(photo.PublicId);
            
            if (result.Error != null) 
                return BadRequest(result.Error.Message);

            await uow.familyRepository.DeletePhoto(imageId);

            if (await uow.SaveAsync()) return Ok();

            return Ok(photo.PublicId);
        }

        //move image from one folder to another!
        // [HttpPost("move_image/{FromPublicId}/{ToPublicId}")]
        // public string MoveImage(string FromPublicId, string ToPublicId)

        // {           

        //     var cloudinary = new Cloudinary(cloudinaryUrl: "cloudinary://334819583972299:M6mwunz9g3seqhMcP_CGV0HCNvc@hspa2024");
        //     RenameParams renameParams = new RenameParams(FromPublicId, ToPublicId)           

        //     {               

        //     FromPublicId = FromPublicId.ToString(),               

        //     ToPublicId = ToPublicId.ToString()

        //     };
        //     var renameResult = cloudinary.Rename(renameParams).JsonObj.ToString();

        //     return renameResult;

        // }

    }
}