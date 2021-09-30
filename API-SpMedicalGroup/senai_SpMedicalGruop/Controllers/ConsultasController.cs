using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai_SpMedicalGruop.Domains;
using senai_SpMedicalGruop.Interfaces;
using senai_SpMedicalGruop.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedicalGruop.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {
        private IConsultaRepository _ConsultaRepository { get; set; }

        public ConsultasController()
        {
            _ConsultaRepository = new ConsultaRepository();
        }

        [Authorize(Roles = "1")]
        [HttpGet("todas")]
        public IActionResult ListarTodas()
        {
            try
            {
                return Ok(_ConsultaRepository.ListarTodos());
            }
            catch (Exception error)
            {
                return BadRequest(new
                {
                    mensagem = "Não é possível mostrar as presenças se o usuário não estiver logado!",
                    error
                });
            }
        }



        [Authorize(Roles = "2")]
        [HttpGet("minhas")]
        public IActionResult ListarMinhas()
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(_ConsultaRepository.ListarMinhas(idUsuario));
            }
            catch (Exception error)
            {
                return BadRequest(new
                {
                    mensagem = "Não é possível mostrar as presenças se o usuário não estiver logado!",
                    error
                });
            }
        }

        [Authorize(Roles = "3")]
        [HttpGet("minhasMed")]
        public IActionResult ListarMinhasMed()
        {
            try
            {
                int idMedico = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(_ConsultaRepository.ListarMinhasMed(idMedico));
            }
            catch (Exception error)
            {
                return BadRequest(new
                {
                    mensagem = "Não é possível mostrar as presenças se o Medico não estiver logado!",
                    error
                });
            }
        }


        [Authorize(Roles = "1")]
        [HttpPost("agendamento/")]
        public IActionResult Agendar(Consultum novaConsulta)
        {

                _ConsultaRepository.Agendar(novaConsulta);

                return StatusCode(201);
        }

        [Authorize(Roles = "1")]
        [HttpPatch("Cancelar/{idConsulta}")]
        public IActionResult Cancelar(int idConsulta, Consultum status)
        {
            try
            {
                _ConsultaRepository.CancelarConsulta(idConsulta, status.IdSituacao.ToString());

                return StatusCode(204);
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [Authorize(Roles = "3")]
        [HttpPatch("Descricao/{idConsulta}")]
        public IActionResult Descricao(int idConsulta, Consultum _Descricao)
        {
            try
            {
                _ConsultaRepository.MudarDesc(idConsulta, _Descricao.Descricao);

                return Ok(_ConsultaRepository.BuscarPorId(idConsulta));
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }
    }
}
