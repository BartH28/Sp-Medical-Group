using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai_SpMedicalGruop.Interfaces;
using senai_SpMedicalGruop.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedicalGruop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerfilsController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }
        public PerfilsController()
        {
            _usuarioRepository = new UsuarioRepository();
        }


        [Authorize(Roles = "1,2,3")]
        [HttpPost("imagem/dir")]
        public IActionResult postDIR(IFormFile arquivo)
        {
            try
            {
                //analise de tamanho do arquivo.

              if (arquivo.Length > 5000000) //5MB
                return BadRequest(new { mensagem = "O tamanho máximo da imagem foi atingido." });
               
                string extensao = arquivo.FileName.Split('.').Last();

              if (extensao != "png" && extensao != "jpg")
                return BadRequest(new { mensagem = "Apenas arquivos .png e .jpg são permitidos." });
                
                
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                _usuarioRepository.SalvarPerfilDir(arquivo, idUsuario);

                return Ok();
                
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [Authorize(Roles = "1,2,3")]
        [HttpGet("imagem/dir")]
        public IActionResult getDIR()
        {
            try
            {

                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                string base64 = _usuarioRepository.ConsultarPerfilDir(idUsuario);

                return Ok(base64);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
