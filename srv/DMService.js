const cds = require('@sap/cds')
const axios = require('axios').default;
const FormData = require('form-data');



module.exports = cds.service.impl(function () {
    async function _fetchJwtToken () {
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
  this.on("GET", "DMSMaster", async (req, res) => {

        const lv_JWToken = await _fetchJwtToken();
        console.log(lv_JWToken);
        try {
        let ConDMS = await cds.connect.to('DMS_Dest');
        var JToken = 'Bearer ' + lv_JWToken;
        const Resp = await ConDMS.send('GET', 'browser/iVEN/root', '', { 'Authorization': JToken });
        console.log(Resp);
        return Resp;
    } catch (error) {
            throw(error.message)
    }

});
});









// // This is to create a folder in the repository for every new book that is getting created.
// // So basically we create a new folder for every book id and user can add their respective attachments in that folder.
// const _createFolder = async function (sdmUrl, jwtToken, repositoryId, rootFolderId, forlderName) {
//     return new Promise((resolve, reject) => {
//         const folderCreateURL = sdmUrl + "browser/" + repositoryId + "/root"

//         const formData = new FormData();
//         formData.append("objectId", rootFolderId);
//         formData.append("cmisaction", "createFolder");
//         formData.append("propertyId[0]", "cmis:name");
//         formData.append("propertyValue[0]", forlderName);
//         formData.append("propertyId[1]", "cmis:objectTypeId");
//         formData.append("propertyValue[1]", "cmis:folder");
//         formData.append("succinct", 'true');


//         let headers = formData.getHeaders();
//         headers["Authorization"] = "Bearer " + jwtToken;
        
//         const config = {
//             headers: headers
//         }

//         axios.post(folderCreateURL, formData, config)
//             .then(response => {
//                 resolve(response.data.succinctProperties["cmis:objectId"])
//             })
//             .catch(error => {
//                 reject(error)
//             })
//     })
// }

// module.exports = cds.service.impl(async (service) => {
//     // This will be called whenever a new draft book is getting created
//     service.before("NEW", 'Books', async (context) => {
//         // Fill the repositoryId
//         context.data.repositoryId = "3a6fbabb-1c19-4014-80cd-e9d4443fd311";
//         const connJwtToken = await _fetchJwtToken(sdmCredentials.uaa.url, sdmCredentials.uaa.clientid, sdmCredentials.uaa.clientsecret)
//         // Creating the folder id and fill it
//         context.data.folderId = await _createFolder(sdmCredentials.endpoints.ecmservice.url, connJwtToken, context.data.repositoryId, "SYNsY7aoCEVirXnHScSBm3SQsSAvCy8zsAkZJjAjUE8", context.data.ID);
//     });
// });