using Microsoft.EntityFrameworkCore;
using senai_SpMedicalGruop.Contexts;
using senai_SpMedicalGruop.Domains;
using senai_SpMedicalGruop.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedicalGruop.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {
        SpMGContext ctx = new();
        public void Agendar(Consultum Consulta)
        {
            if (Consulta.IdMedico != null ) 
            {
                ctx.Consulta.Add(Consulta);

                ctx.SaveChanges();
            }
            
        }

        public Consultum BuscarPorId(int _idConsulta)
        {
            return ctx.Consulta.FirstOrDefault(e => e.IdConsulta == _idConsulta);
        }

        public void CancelarConsulta(int idConsulta, string status)
        {
            Consultum ConsultaBuscada = ctx.Consulta
               .FirstOrDefault(p => p.IdConsulta == idConsulta);

            switch (status)
            {
                case "1":
                    ConsultaBuscada.IdSituacao = 1;
                    break;

                case "2":
                    ConsultaBuscada.IdSituacao = 2;
                    break;

                case "3":
                    ConsultaBuscada.IdSituacao = 3;
                    break;

                default:
                    ConsultaBuscada.IdSituacao = ConsultaBuscada.IdSituacao;
                    break;
            }

            ctx.Consulta.Update(ConsultaBuscada);

            ctx.SaveChanges();
        }

        public void MudarDesc(int idConsulta, string descri)
        {
            Consultum ConsultaBuscada = ctx.Consulta
               .FirstOrDefault(p => p.IdConsulta == idConsulta);



            ConsultaBuscada.Descricao = descri;

            ctx.Consulta.Update(ConsultaBuscada);

            ctx.SaveChanges();
        }



        public List<Consultum> ListarMinhas(int idUsuario)
        {
            return ctx.Consulta
                .Include(c => c.IdMedicoNavigation).ThenInclude(e => e.IdEspecialidadeNavigation)
                .Include(c => c.IdSituacaoNavigation)
                .Include(c => c.IdUsuarioNavigation)
                .Where(p => p.IdUsuario == idUsuario)
                .ToList();
        }

        

        public List<Consultum> ListarTodos()
        {
            return ctx.Consulta.Include(c => c.IdMedicoNavigation).Include(c => c.IdUsuarioNavigation).Include(c => c.IdSituacaoNavigation).ToList();
        }

        public List<Consultum> ListarMinhasMed(int idMedico)
        {
            return ctx.Consulta
               .Include(c => c.IdMedicoNavigation).ThenInclude(e => e.IdEspecialidadeNavigation)
               .Include(c => c.IdSituacaoNavigation)
               .Include(c => c.IdUsuarioNavigation)
               .Where(p => p.IdMedico == idMedico)
               .ToList();
        }
    }
}
                //.Include(p => p.IdEventoNavigation.IdTipoEventoNavigation)
                //.Include("IdSituacaoNavigation")
                //.Include(p => p.IdEventoNavigation.IdInstituicaoNavigation)

                //.Include(p => p.IdEventoNavigation).ThenInclude(e => e.IdTipoEventoNavigation)