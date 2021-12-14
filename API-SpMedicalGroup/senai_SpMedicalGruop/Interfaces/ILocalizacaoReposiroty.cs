using senai_SpMedicalGruop.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedicalGruop.Interfaces
{
    interface ILocalizacaoReposiroty
    {
        void Cadastrar(Localizacao novaLocalizacao);
        List<Localizacao> ListarTodos();
          
    }
}
