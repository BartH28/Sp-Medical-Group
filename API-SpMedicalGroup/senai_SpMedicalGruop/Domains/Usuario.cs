using System;
using System.Collections.Generic;

#nullable disable

namespace senai_SpMedicalGruop.Domains
{
    public partial class Usuario
    {
        public Usuario()
        {
            Consulta = new HashSet<Consultum>();
        }

        public short IdUsuario { get; set; }
        public short? IdTipoUsuario { get; set; }
        public short? IdEndereco { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Telefone { get; set; }
        public string Rg { get; set; }
        public string Cpf { get; set; }

        public virtual Endereco IdEnderecoNavigation { get; set; }
        public virtual TipoDeUsuario IdTipoUsuarioNavigation { get; set; }
        public virtual ICollection<Consultum> Consulta { get; set; }
    }
}
