using System;
using System.Collections.Generic;

#nullable disable

namespace senai_SpMedicalGruop.Domains
{
    public partial class Endereco
    {
        public Endereco()
        {
            Clinicas = new HashSet<Clinica>();
            Usuarios = new HashSet<Usuario>();
        }

        public short IdEndereco { get; set; }
        public string RuaAvenida { get; set; }
        public string Numero { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string SiglaEstado { get; set; }
        public string Cep { get; set; }

        public virtual ICollection<Clinica> Clinicas { get; set; }
        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
