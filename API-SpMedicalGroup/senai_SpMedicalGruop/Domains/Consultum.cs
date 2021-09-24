using System;
using System.Collections.Generic;

#nullable disable

namespace senai_SpMedicalGruop.Domains
{
    public partial class Consultum
    {
        public short IdConsulta { get; set; }
        public short? IdSituacao { get; set; }
        public short? IdUsuario { get; set; }
        public short? IdMedico { get; set; }
        public DateTime DataConsulta { get; set; }
        public string Descricao { get; set; }

        public virtual Medico IdMedicoNavigation { get; set; }
        public virtual Situacao IdSituacaoNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
    }
}
