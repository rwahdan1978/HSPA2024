using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using AutoMapper;

namespace WebAPI.Errors
{
    public class ApiError
    {
        public ApiError(){}
<<<<<<< HEAD
        
=======
>>>>>>> a707ea6d1607b30b310e1a5d3ffac681ee5c66be
        public ApiError(int errorCode, string errorMessage, string errorDetails = null)
        {
            this.ErrorCode = errorCode;
            this.ErrorMessage = errorMessage;
            this.ErrorDetails = errorDetails;
        }

        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public string ErrorDetails { get; set; }
        public override string ToString()
        {
            var options = new JsonSerializerOptions()
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
<<<<<<< HEAD
            return JsonSerializer.Serialize(this, options);
=======
            return JsonSerializer.Serialize(this,options);
>>>>>>> a707ea6d1607b30b310e1a5d3ffac681ee5c66be
        }
    }
}