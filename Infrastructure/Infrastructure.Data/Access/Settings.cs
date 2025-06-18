using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace Infrastructure.Data.Access
{
    public class Settings
    {
        public const int MAX_BATCH_SIZE = 1000;
        public static string ServerIP { get; set; }

        private static bool DebugMode = true;

        #region>> Custom Method | If this region evolves, Transaction DB file also changes 

        //Centralized management of connection chains
        private static string _defaultConnectionString;
        private static string _testConnectionString;
        private static string _nexaCorpConnectionString;

        public static string DefaultConnectionString => _defaultConnectionString;
        public static string TestConnectionString => _testConnectionString;
        public static string NexaCorpConnectionString => _nexaCorpConnectionString;


        public static void SetDefaultConnectionString(string connectionString)
        {
            _defaultConnectionString = connectionString;
        }
        public static void SetNexaCorpConnectionString(string connectionString)
        {
            _nexaCorpConnectionString = connectionString;
        }

        public static void SetTestConnectionString(string connectionString)
        {
            _testConnectionString = connectionString;
        }

        #endregion

        #region>> Commented section

        //public static string ConnectionStringTest
        //{
        //    get
        //    {
        //        return _connectionStringTest;
        //    }
        //}

        //public static string ConnectionString // Prop
        //{
        //    get
        //    {
        //        return _connectionString;
        //    }
        //}

        //public static string ConnectionString_NexaCorp
        //{
        //    get
        //    {
        //        return _connectionStringNexa;
        //    }
        //}

        //private static string _connectionString { get; set; }
        //private static string _connectionStringTest { get; set; }
        //private static string _connectionStringNexa { get; set; }
        #endregion

        #region>> Adda -4/2025 : it sucks, but I'll review it later, because I don't have time to think about securing our database (Nexa Corp) 
        public static string GetConnectionString()
        {

            return @"workstation id=NexaShop.mssql.somee.com;packet size=4096;user id=Hamidoullah_SQLLogin_1;pwd=p353go4tp1;data source=NexaShop.mssql.somee.com;persist security info=False;initial catalog=NexaShop;TrustServerCertificate=True";
        }
        //public static bool GetDebugMode()
        //{
        //    return DebugMode;
        //}
        #endregion
        public class MyService
        {
            private readonly IConfiguration _configuration;

            public MyService(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public string GetConnectionString()
            {
                return _configuration.GetConnectionString("DefaultConnection");
            }
        }
    }
}
