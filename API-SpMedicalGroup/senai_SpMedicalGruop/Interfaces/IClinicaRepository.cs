using senai_SpMedicalGruop.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedicalGruop.Interfaces
{
    interface IClinicaRepository
    {
        List<Clinica> Listar();
        Clinica BuscarPorId(int idClinica);
        void Cadastrar(Clinica idClinica);
        void Atualizar(int idClinica, Clinica ClinicaAtualizado);
        void Deletar(int idClinica);
    }
}
