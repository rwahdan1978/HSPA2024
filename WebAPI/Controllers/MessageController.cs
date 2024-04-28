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

        //for subscribe - done
        // message/save
        [HttpPost("save")]
        [AllowAnonymous]
        
        public async Task<IActionResult> SaveNewsLetterSubscription(NewsletterDto newsletterDto)
        {
            var callRequest = mapper.Map<Newsletter>(newsletterDto);
            uow.messageRepository.AddMessage(callRequest);
            await uow.SaveAsync();

            var message = new MailMessage()
            {
                From = new MailAddress("ramiwahdan1978@gmail.com"),
                Subject = "New Subscription",
                IsBodyHtml = true,
            };

            // if you need to include attachments
           // message.Attachments.Add(new Attachment("C:/Users/ramit/OneDrive/Desktop/projects-list.pdf"));

            message.To.Add(callRequest.Email.ToString());

            var theUser = message.From.User;

            message.Body = 
                $"""
                <html>
                    <body>
                        <h2>Hi, {theUser}</h2>,
                        <p>
                            Thank you very much for your subscription, From now on you will get updated from our
                            newsletter. 
                        </p>
                    </body>
                </html>
                """;

            var smtp = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(message.From.ToString(), "pqwq yoam bfpd pdjg"),
                EnableSsl = true
            };
            
            smtp.Send(message);
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

            var resub = mapper.Map(newsletterUpdateSubDto,messageFromDb);
            await uow.SaveAsync();

            if (resub.Subscribed.ToString() == "True")
            {
                //email to sub
                var message = new MailMessage()
            {
                From = new MailAddress("ramiwahdan1978@gmail.com"),
                Subject = "Rectivate Subscription",
                IsBodyHtml = true,
            };

            // if you need to include attachments
           // message.Attachments.Add(new Attachment("C:/Users/ramit/OneDrive/Desktop/projects-list.pdf"));

            message.To.Add(resub.Email.ToString());

            var theUser = message.From.User;

            message.Body = 
                $"""
                <html>
                    <body>
                        <h2>Hi, {theUser}</h2>,
                        <p>
                            Thank you very much for re-activating your subscription, From now on you will get updated from our
                            newsletter. 
                        </p>
                    </body>
                </html>
                """;

            var smtp = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(message.From.ToString(), "pqwq yoam bfpd pdjg"),
                EnableSsl = true
            };
            
            smtp.Send(message);
            }
            else
            {
                //email to unsub
                var message = new MailMessage()
            {
                From = new MailAddress("ramiwahdan1978@gmail.com"),
                Subject = "Cancellation of Subscription",
                IsBodyHtml = true,
            };

            // if you need to include attachments
           // message.Attachments.Add(new Attachment("C:/Users/ramit/OneDrive/Desktop/projects-list.pdf"));

            message.To.Add(resub.Email.ToString());

            var theUser = message.From.User;

            message.Body = 
                $"""
                <html>
                    <body>
                        <h2>Hi, {theUser}</h2>,
                        <p>
                            Sorry for unsubscribing, From now on you will not get updates from our
                            newsletter. 
                        </p>
                    </body>
                </html>
                """;

            var smtp = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(message.From.ToString(), "pqwq yoam bfpd pdjg"),
                EnableSsl = true
            };
            
            smtp.Send(message);
            }

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