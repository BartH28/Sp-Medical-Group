using senai_SpMedicalGruop.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedicalGruop.Interfaces
{
    interface IConsultaRepository
    {
        List<Consultum> ListarMinhas(int idUsuario);

        void Agendar(Consultum Consulta);

        void CancelarConsulta(int idConsulta, string status);

        void MudarDesc(int idConsulta, string descri);

        List<Consultum> ListarMinhasMed(int idMedico);

        List<Consultum> ListarTodos();
        Consultum BuscarPorId(int idConsulta);
    }
}
