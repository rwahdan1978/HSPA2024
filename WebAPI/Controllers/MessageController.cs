using System.Net;
using System.Net.Mail;
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

        [HttpPost("SendEmail/{email}")]
        [AllowAnonymous]
        
        public ActionResult SendEmail(string email)
        {
            var message = new MailMessage()
            {
                From = new MailAddress("ramiwahdan1978@gmail.com"),
                Subject = "Test1",
                IsBodyHtml = true,
                Body = 
                """
                <html>
                <body>
                    <h2>Hi, this is a test!</h2>,
                    <h3>Hi, this is a test2!</h3>
                    <img src="https://res.cloudinary.com/hspa2024/image/upload/v1709295557/house_default_kfgrot.png">
                </body>
                </html>
                """
            };

            message.To.Add(email.ToString());

            var smtp = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(message.From.ToString(), "pqwq yoam bfpd pdjg"),
                EnableSsl = true
            };
            
            smtp.Send(message);

            return Ok("Email Sent!");

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
                return BadRequest("Update is not allowed!11");
             var messageFromDb = await uow.messageRepository.FindMessage(id);

             if (messageFromDb == null)
                return BadRequest("Update is not allowed!12");

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