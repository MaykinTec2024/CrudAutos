using System.ComponentModel.DataAnnotations;

namespace AutosAPI.Model
{
    public class Auto
    {
        public int Id { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Tipo { get; set; }
        public int CantidadAsientos { get; set; }
    }
}
