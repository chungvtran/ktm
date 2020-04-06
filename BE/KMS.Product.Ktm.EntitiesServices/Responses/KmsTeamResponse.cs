using KMS.Product.Ktm.EntitiesServices.DTOs;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace KMS.Product.Ktm.EntitiesServices.Responses
{
    public class KmsTeamResponse
    {
        [JsonProperty("")]
        public IEnumerable<KmsTeamDTO> KmsTeamDTOs { get; set; }
    }
}
