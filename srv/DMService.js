const cds = require('@sap/cds')
const axios = require('axios').default;
const FormData = require('form-data');

module.exports = cds.service.impl(function () {
  async function _fetchJwtToken() {
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
  this.on("GET", "GetRootData", async (req, res) => {
    // var needcount = req.query.SELECT.count
    // var skip = req.query.SELECT.limit.offset.val
    // / var top = req.query.SELECT.limit.rows.val
    const lv_JWToken = await _fetchJwtToken();
    try {
      let ConDMS = await cds.connect.to('DMS_Dest');
      var JToken = 'Bearer ' + lv_JWToken;
      const Resp = await ConDMS.send('GET', 'browser/iVEN/root', '', { 'Authorization': JToken });
      var dlist = Resp.objects;
      var output = [];

      dlist.forEach(function (dlistvalue) {
        var item = {};
        item.objectId = dlistvalue.object.properties["cmis:objectId"].value;
        if (dlistvalue.object.properties.hasOwnProperty('sap:versionSeriesContentLength')) {
          item.versionSeriesContentLength = dlistvalue.object.properties["sap:versionSeriesContentLength"].value;
        } else {
          item.versionSeriesContentLength = '';
        }
        if (dlistvalue.object.properties.hasOwnProperty('cmis:versionLabel')) {
          item.versionLabel = dlistvalue.object.properties["cmis:versionLabel"].value;
        } else {
          item.versionLabel = '';
        }
        item.lastModifiedBy = dlistvalue.object.properties["cmis:lastModifiedBy"].value;
        if (dlistvalue.object.properties.hasOwnProperty('cmis:contentStreamId')) {
          item.contentStreamId = dlistvalue.object.properties["cmis:contentStreamId"].value;
        } else {
          item.contentStreamId = '';
        }
        item.objectTypeId = dlistvalue.object.properties["cmis:objectTypeId"].value;
        if (dlistvalue.object.properties.hasOwnProperty('cmis:contentStreamMimeType')) {
          item.contentStreamMimeType = dlistvalue.object.properties["cmis:contentStreamMimeType"].value;
        } else {
          item.contentStreamMimeType = '';
        }
        item.createdBy = dlistvalue.object.properties["cmis:createdBy"].value;
        item.baseTypeId = dlistvalue.object.properties["cmis:baseTypeId"].value;
        item.sap_owner = dlistvalue.object.properties["sap:owner"].value;
        item.creationDate = dlistvalue.object.properties["cmis:creationDate"].value;
        item.changeToken = dlistvalue.object.properties["cmis:changeToken"].value;
        if (dlistvalue.object.properties.hasOwnProperty('cmis:isVersionSeriesCheckedOut')) {
          item.isVersionSeriesCheckedOut = dlistvalue.object.properties["cmis:isVersionSeriesCheckedOut"].value;
        } else {
          item.isVersionSeriesCheckedOut = '';
        }
        if (dlistvalue.object.properties.hasOwnProperty('cmis:isMajorVersion')) {
          item.isMajorVersion = dlistvalue.object.properties["cmis:isMajorVersion"].value;
        } else {
          item.isMajorVersion = '';
        }
        item.name = dlistvalue.object.properties["cmis:name"].value;
        if (dlistvalue.object.properties.hasOwnProperty('cmis:isLatestVersion')) {
          item.isLatestVersion = dlistvalue.object.properties["cmis:isLatestVersion"].value;
        } else {
          item.isLatestVersion = '';
        }
        item.lastModificationDate = dlistvalue.object.properties["cmis:lastModificationDate"].value;
        if (dlistvalue.object.properties.hasOwnProperty('cmis:versionSeriesId')) {
          item.versionSeriesId = dlistvalue.object.properties["cmis:versionSeriesId"].value;
        } else {
          item.versionSeriesId = '';
        }
        if (dlistvalue.object.properties.hasOwnProperty('cmis:isLatestMajorVersion')) {
          item.isLatestMajorVersion = dlistvalue.object.properties["cmis:isLatestMajorVersion"].value;
        } else {
          item.isLatestMajorVersion = '';
        }
        if (dlistvalue.object.properties.hasOwnProperty('cmis:contentStreamLength')) {
          item.contentStreamLength = dlistvalue.object.properties["cmis:contentStreamLength"].value;
        } else {
          item.contentStreamLength = '';
        }
        output.push(item);
        console.log(output);
      });

      return output;
    } catch (error) {
      throw (error)
    }

  });

  this.on("CREATE", "RootFolder", async (req, res) => {
    var body = {
      "repository": {
        "displayName": req.data.externalId,
        "description": req.data.description,
        "repositoryType": "internal",
        "isVersionEnabled": "true",
        "isVirusScanEnabled": "true",
        "isContentBridgeEnabled": "true",
        "externalId": req.data.externalId,
        "skipVirusScanForLargeFile": "true",
        "hashAlgorithms": "None"
      }
    };
    const lv_JWToken = await _fetchJwtToken();
    try {
      let ConDMS = await cds.connect.to('DMS_Dest');
      var JToken = 'Bearer ' + lv_JWToken;
      const Resp = await ConDMS.send('POST', '/rest/v2/repositories', body, { 'Authorization': JToken });
      var dlist = Resp;
      var output = [];
      return output;
    } catch (error) {
      error.message = error.reason.response.body.message;
      throw (error)
    }

  });
  this.on("GET", "RootFolder", async (req, res) => {
    const lv_JWToken = await _fetchJwtToken();
    try {
      let ConDMS = await cds.connect.to('DMS_Dest');
      var JToken = 'Bearer ' + lv_JWToken;
      const Resp = await ConDMS.send('GET', 'browser', '', { 'Authorization': JToken });
      // Resp.forEach(function (mlistvalue) {
      //   console.log(mlistvalue);
      // });
      var output = {};
      output.DataSet = Resp;
      var a = [];
      a = Resp;
      return output;
    } catch (error) {
      error.message = error.reason.response.body.message;
      throw (error)
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
