using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Text;

namespace KMS.Product.Ktm.Repository
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext()
        {

        }
        public ApplicationContext(string connectionString) : base(connectionString)
        {

        }
    }
}
