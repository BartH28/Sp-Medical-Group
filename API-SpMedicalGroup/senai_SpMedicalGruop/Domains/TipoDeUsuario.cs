using System;
using System.Collections.Generic;

#nullable disable

namespace senai_SpMedicalGruop.Domains
{
    public partial class TipoDeUsuario
    {
        public TipoDeUsuario()
        {
            Medicos = new HashSet<Medico>();
            Usuarios = new HashSet<Usuario>();
        }

        public short IdTipoUsuario { get; set; }
        public string NomeTipo { get; set; }

        public virtual ICollection<Medico> Medicos { get; set; }
        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
