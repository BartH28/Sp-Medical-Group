using Microsoft.AspNetCore.Http;
using senai_SpMedicalGruop.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedicalGruop.Interfaces
{
    interface IMedicoRepository
    {
        List<Medico> Listar();
        Medico BuscarPorId(int idMedico);
        void Cadastrar(Medico idMedico);
        void Atualizar(int idMedico, Medico MedicoAtualizado);
        void Deletar(int idMedico);

        Medico Login(string email, string senha);
        void SalvarPerfilDir(IFormFile foto, int id_Medico);
        string ConsultarPerfilDir(int id_Medico);
    }
}
