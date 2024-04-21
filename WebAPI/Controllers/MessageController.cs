using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class MessageController : BaseController
    {
        private readonly IunitOfWork uow;
        private readonly IMapper mapper;
        private readonly DataContext dc;

        public MessageController(IunitOfWork uow, IMapper mapper, DataContext dc)
        {
            this.uow = uow;
            this.mapper = mapper;
            this.dc = dc;
        }

        //for subscribe - done
        // message/save
        [HttpPost("save")]
        [AllowAnonymous]
        
        public async Task<IActionResult> SaveNewsLetterSubscription(NewsletterDto newsletterDto)
        {
            var callRequest = mapper.Map<Newsletter>(newsletterDto);
            uow.messageRepository.AddMessage(callRequest);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        //for un-subscribe
        // message/update/11
        [HttpPut("update/{id}")]
        [AllowAnonymous]
        
        public async Task<IActionResult> UpdateNewsLetterSubscription(NewsletterUpdateSubDto newsletterUpdateSubDto, int id)
        {
            if (id != newsletterUpdateSubDto.id)
                return BadRequest("Update is not allowed!");
             var messageFromDb = await uow.messageRepository.FindMessage(id);

             if (messageFromDb == null)
                return BadRequest("Update is not allowed!");

            mapper.Map(newsletterUpdateSubDto,messageFromDb);
            await uow.SaveAsync();
            return Ok(messageFromDb);

        }  

        [HttpGet("getID/{email}")]
        [AllowAnonymous]
        public async Task<Newsletter> SubscriberId(string email)
        {
            var properties = await dc.Newsletters
            .Where(p => p.Email == email)
            .FirstOrDefaultAsync();

            return properties;
        }
    }
}