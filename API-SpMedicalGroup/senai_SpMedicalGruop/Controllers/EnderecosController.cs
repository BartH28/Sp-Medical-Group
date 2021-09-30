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
    public class EnderecosController : ControllerBase
    {
        private IEnderecoRepository _EnderecoRepository { get; set; }
        public EnderecosController()
        {
            _EnderecoRepository = new EnderecoRepository();
        }

        [Authorize(Roles = "1")]
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(_EnderecoRepository.Listar());
        }

        [Authorize(Roles = "1")]
        [HttpGet("{idEndereco}")]
        public IActionResult BuscarPorId(int idEndereco)
        {
            return Ok(_EnderecoRepository.BuscarPorId(idEndereco));
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Cadastrar(Endereco novoEndereco)
        {
            _EnderecoRepository.Cadastrar(novoEndereco);

            return StatusCode(201);
        }


        [Authorize(Roles = "1")]
        [HttpPut("{idEndereco}")]
        public IActionResult Atualizar(int idEndereco, Endereco EnderecoAtualizado)
        {
            _EnderecoRepository.Atualizar(idEndereco, EnderecoAtualizado);

            return StatusCode(204);
        }

        [Authorize(Roles = "1")]
        [HttpDelete("{idEndereco}")]
        public IActionResult Deletar(int idEndereco)
        {
            _EnderecoRepository.Deletar(idEndereco);

            return StatusCode(204);
        }
    }
}
