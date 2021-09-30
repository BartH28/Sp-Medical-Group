using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai_SpMedicalGruop.Domains;
using senai_SpMedicalGruop.Interfaces;
using senai_SpMedicalGruop.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedicalGruop.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ClinicasController : ControllerBase
    {
        private IClinicaRepository _ClinicaRepository { get; set; }
        public ClinicasController()
        {
            _ClinicaRepository = new ClinicaRepository();
        }

        [Authorize(Roles = "1")]
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(_ClinicaRepository.Listar());
        }

        [Authorize(Roles = "1")]
        [HttpGet("{idClinica}")]
        public IActionResult BuscarPorId(int idClinica)
        {
            return Ok(_ClinicaRepository.BuscarPorId(idClinica));
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Cadastrar(Clinica novoClinica)
        {
            _ClinicaRepository.Cadastrar(novoClinica);

            return StatusCode(201);
        }


        [Authorize(Roles = "1")]
        [HttpPut("{idClinica}")]
        public IActionResult Atualizar(int idClinica, Clinica ClinicaAtualizado)
        {
            _ClinicaRepository.Atualizar(idClinica, ClinicaAtualizado);

            return StatusCode(204);
        }

        [Authorize(Roles = "1")]
        [HttpDelete("{idClinica}")]
        public IActionResult Deletar(int idClinica)
        {
            _ClinicaRepository.Deletar(idClinica);

            return StatusCode(204);
        }
    }
}
