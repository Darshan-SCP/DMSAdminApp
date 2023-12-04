const cds = require("@sap/cds");
const axios = require('axios').default;
const FormData = require('form-data');

module.exports = { 

   _fetchJwtToken :  async function() {
        let ConDMST = await cds.connect.to('DMS_Token');
        try {
    
          var params = "?grant_type=client_credentials";
          var path = encodeURI(params);
          const JToken = await ConDMST.send('POST', path);
          return JToken.access_token;
        } catch (error) {
          throw error;
        }
      }

      
}