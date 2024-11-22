using AutosAPI.Model;
using AutosAPI.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace AutosAPI.Service
{
    public class AutosService : IAutosService
    {
        private readonly ApplicationDbContext _context;

        public AutosService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Auto>> GetAllAutosAsync()
        {
            return await _context.Auto.ToListAsync();
        }

        public async Task<Auto> GetAutoByIdAsync(int id)
        {
            return await _context.Auto.FindAsync(id);
        }

        public async Task CreateAutoAsync(Auto auto)
        {
            _context.Auto.Add(auto);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAutoAsync(Auto auto)
        {
            _context.Entry(auto).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAutoAsync(int id)
        {
            var auto = await _context.Auto.FindAsync(id);
            if (auto != null)
            {
                _context.Auto.Remove(auto);
                await _context.SaveChangesAsync();
            }
        }


    }
}
