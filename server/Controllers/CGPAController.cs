using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CGPAController : ControllerBase
    {
        [HttpGet]
        public ActionResult<string> welcome()
        {
            return Ok("hi");
        }

        [HttpPost("{noOfSem}")]
        public ActionResult<Output> FindCGPA(int noOfSem, [FromBody] Input[] input)
        {
            Output output = new Output();
            if (noOfSem < 1)
            {
                return NotFound(output);
            }
            for (int i = 0; i < noOfSem; i++)
            {
                MarkSheet marksheet = new MarkSheet(input[i]);
                marksheet.gradesToPoints();
                marksheet.calculate();
                output.Sgpa?.Add(marksheet.Sgpa);
                output.Cgpa += marksheet.Sgpa;
            }
            output.Cgpa /= noOfSem;
            return Ok(output);
        }
    }
}
