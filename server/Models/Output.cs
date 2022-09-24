using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Output
    {
        public List<float>? Sgpa { get; set; }
        public float Cgpa { get; set; }

        public Output()
        {
            this.Sgpa = new List<float>();
        }
    }
}
