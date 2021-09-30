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
    public class PerfilsMedicosController : ControllerBase
    {
        private IMedicoRepository _medicoRepository { get; set; }
        public PerfilsMedicosController()
        {
            _medicoRepository = new MedicoRepository();
        }

        [Authorize(Roles = "3")]
        [HttpGet("{idMedico}")]
        public IActionResult BuscarPorId(int idMedico)
        {
            return Ok(_medicoRepository.BuscarPorId(idMedico));
        }

        [Authorize(Roles = "3")]
        [HttpPost("imagem/dir")]
        public IActionResult postDIR(IFormFile arquivo)
        {
            try
            {
                if (arquivo.Length  > 500000)
                {
                    return BadRequest(new { mensagem = "O tamanho máximo da imagem foi atingido." });

                }


                //if (arquivo.Length > 999999999) //5MB
                  ///  return BadRequest(new { mensagem = "O tamanho máximo da imagem foi atingido." });

                string extensao = arquivo.FileName.Split('.').Last();

                if (extensao != "png" && extensao != "jpg")
                    return BadRequest(new { mensagem = "Apenas arquivos .png e .jpg são permitidos." });


                int idMedico = Convert.ToInt16(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                _medicoRepository.SalvarPerfilDir(arquivo, idMedico);

                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Authorize(Roles = "3")]
        [HttpGet("imagem/dir")]
        public IActionResult getDIR()
        {
            try
            {

                int idMedico = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                string base64 = _medicoRepository.ConsultarPerfilDir(idMedico);

                return Ok(base64);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
