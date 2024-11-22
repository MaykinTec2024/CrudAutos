using AutosAPI.Model;
using AutosAPI.Repository;
using AutosAPI.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutosAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AutosController : ControllerBase
    {
        private readonly AutosService _autoService;

        public AutosController(AutosService autoService)
        {
            _autoService = autoService;
        }

        [HttpGet]
        public async Task<IActionResult> ListaAutos()
        {
            var autos = await _autoService.GetAllAutosAsync();
            return Ok(autos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ListaAutosId(int id)
        {
            var auto = await _autoService.GetAutoByIdAsync(id);
            if (auto == null)
                return NotFound();
            return Ok(auto);
        }

        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] Auto auto)
        {
            await _autoService.CreateAutoAsync(auto);
            return CreatedAtAction(nameof(ListaAutosId), new { id = auto.Id }, auto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Actualizar(int id, [FromBody] Auto auto)
        {
            if (id != auto.Id) return BadRequest();

            await _autoService.UpdateAutoAsync(auto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var auto = await _autoService.GetAutoByIdAsync(id);
            if (auto == null) return NotFound();
            await _autoService.DeleteAutoAsync(id);
            return NoContent();
        }

    }
}
