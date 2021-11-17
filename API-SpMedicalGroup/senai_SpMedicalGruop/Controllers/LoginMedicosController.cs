using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using senai_SpMedicalGruop.Domains;
using senai_SpMedicalGruop.Interfaces;
using senai_SpMedicalGruop.Repositories;
using senai_SpMedicalGruop.ViewModel;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace senai_SpMedicalGruop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginMedicosController : ControllerBase
    {
        private IMedicoRepository _medicoRepository { get; set; }
        public LoginMedicosController()
        {
            _medicoRepository = new MedicoRepository();
        }

        [HttpPost("Login")]
        public IActionResult Login(LoginViewModel login)
        {
            try
            {
                Medico medicoBuscado = _medicoRepository.Login(login.Email, login.Senha);
                if (medicoBuscado == null)
                    return NotFound("Email ou Senha invalidos");

                var minhasClaims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Email, medicoBuscado.Email),
                new Claim(JwtRegisteredClaimNames.Jti, medicoBuscado.IdMedico.ToString()),
                new Claim(ClaimTypes.Role, medicoBuscado.IdTipoUsuarioNavigation.NomeTipo),
                new Claim( "role", medicoBuscado.IdTipoUsuario.ToString() )
            };
                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("SPMedico-Authentication-Key"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var meuToken = new JwtSecurityToken(
                        issuer: "SpMG.webAPI",
                        audience: "SpMG.webAPI",
                        claims: minhasClaims,
                        expires: DateTime.Now.AddMinutes(50),
                        signingCredentials: creds
                    );
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(meuToken)
                });

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
