// *****************************************
// Creator: Seth CLimenhaga
// 
// Description:
// Helper methods for encoding and veryifying  
// jwt tokens
// *****************************************

using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace venus.Helpers
{
    public static class JwtService
    {
        private const string SecureKey = "this is a very secure key";

        /// <summary>
        /// static method that generates a user 
        /// </summary>
        /// <param name="id">id for a user to encode</param>
        /// <returns>A jwt token</returns>
        public static string Generate(string id)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecureKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credentials);

            var payload = new JwtPayload(id, null, null, null, DateTime.Today.AddDays(1));
            var securityToken = new JwtSecurityToken(header, payload);
            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
        
        /// <summary>
        /// static method that verifies 
        /// </summary>
        /// <param name="jwt">A token to verify</param>
        /// <returns>A validated token</returns>
        public static JwtSecurityToken Verify(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(SecureKey);

            tokenHandler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
                
            }, out var validatedToken);
            
            return (JwtSecurityToken)validatedToken;
        }
    }
}