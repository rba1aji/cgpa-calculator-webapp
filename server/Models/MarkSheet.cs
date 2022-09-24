using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class MarkSheet
    {
        public Input? Input { get; set; }
        public List<int>? Grades { get; set; }
        public int SumOfProductOfCreditsGrades { get; set; }
        public int SumOfCredits { get; set; }

        public MarkSheet(Input ip)
        {
            this.Input = ip;
            this.Grades=new List<int>();
            this.SumOfProductOfCreditsGrades = 0;
            this.SumOfCredits = 0;
        }

        public float Sgpa { get; set; }

        public void gradesToPoints()
        {
            for (int i = 0; i < Input?.noOfCourses; i++)
            {
                switch (Input.gradesInAlphabet?.ElementAt(i))
                {
                    case "O":
                        Grades?.Add(10);
                        break;
                    case "A+":
                        Grades?.Add(9);
                        break;
                    case "A":
                        Grades?.Add(8);
                        break;
                    case "B+":
                        Grades?.Add(7);
                        break;
                    case "B":
                        Grades?.Add(6);
                        break;
                    default:
                        Grades?.Add(0);
                        break;
                }
            }
        }

        public void calculate()
        {
            if (Input?.credits?.Count > 0 && Grades?.Count > 0)
            {
                for (int i = 0; i < Input.noOfCourses; i++)
                {
                    SumOfCredits += Input.credits.ElementAt(i);
                    SumOfProductOfCreditsGrades += Input.credits.ElementAt(i) * Grades.ElementAt(i);
                }
                Sgpa = SumOfProductOfCreditsGrades / (float)SumOfCredits;
            }
        }
    }
}
