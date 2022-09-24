using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Input
    {
        public List<int>? credits { get; set; }
        public List<string>? gradesInAlphabet{ get; set; }
        public int noOfCourses { get; set; }
    }
}