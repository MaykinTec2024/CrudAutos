using AutosAPI.Model;

namespace AutosAPI.Service
{
    public interface IAutosService
    {
        Task<List<Auto>> GetAllAutosAsync();
        Task<Auto> GetAutoByIdAsync(int id);
        Task CreateAutoAsync(Auto auto);
        Task UpdateAutoAsync(Auto auto);
        Task DeleteAutoAsync(int id);
    }
}
