const cds = require("@sap/cds");
const axios = require('axios').default;


module.exports = {

  _fetchJwtToken: async function () {
    let ConDMST = await cds.connect.to('DMS_Token');
    try {
      var params = "?grant_type=client_credentials";
      var path = encodeURI(params);
      const JToken = await ConDMST.send('POST', path);
      return JToken.access_token;
    } catch (error) {
      throw error;
    }
  },


  _CreateRepositorie: async function (in_externalId, in_description) {

    var body = {
      "repository": {
        "displayName": in_externalId,
        "description": in_description,
        "repositoryType": "internal",
        "isVersionEnabled": "true",
        "isVirusScanEnabled": "true",
        "isContentBridgeEnabled": "true",
        "externalId": in_externalId,
        "skipVirusScanForLargeFile": "true",
        "hashAlgorithms": "None"
      }
    };
    const lv_JWToken = await this._fetchJwtToken();
    try {
      let ConDMS = await cds.connect.to('DMS_Dest');
      var JToken = 'Bearer ' + lv_JWToken;
      const Resp = await ConDMS.send('POST', '/rest/v2/repositories', body, { 'Authorization': JToken });
      var dlist = Resp;
      var output = [];
      return output;
    } catch (error) {
      // error.message = error.reason.response.body.message;
      var err = error.reason.response.body.message;
      return err;
    }
  },

  _GetRepositores: async function () {
    const lv_JWToken = await this._fetchJwtToken();
    try {
      let ConDMS = await cds.connect.to('DMS_Dest');
      var JToken = 'Bearer ' + lv_JWToken;
      const Resp = await ConDMS.send('GET', '/rest/v2/repositories', '', { 'Authorization': JToken });
      const StorageData = await ConDMS.send('GET', '/rest/v2/usage/storage', '', { 'Authorization': JToken });
      var StorageDataRepoList = StorageData.usageListOfTenants[0].perTenantStorageUsageList.storageUsagePerRepository;
      var output = [];
      var MainFolderlist = Resp.repoAndConnectionInfos;
      if (MainFolderlist) {
        var CheckArray = Array.isArray(MainFolderlist);
        if (CheckArray === true) {
          MainFolderlist.forEach(function (MainFolderlistvalue) {
            var item = {};
            item.externalId = MainFolderlistvalue.repository.externalId;
            item.id = MainFolderlistvalue.repository.id;
            item.description = MainFolderlistvalue.repository.description;
            item.repositorySubType = MainFolderlistvalue.repository.repositorySubType;
            item.repositoryType = MainFolderlistvalue.repository.repositoryType;
            item.cmisRepositoryId = MainFolderlistvalue.repository.cmisRepositoryId;
            item.createdTime = MainFolderlistvalue.repository.createdTime;
            StorageDataRepoList.forEach(function (StorageDataRepoListValue) {
              if (StorageDataRepoListValue.repositoryId === item.id)
                item.storage_metrics = StorageDataRepoListValue.metrics;
              item.storage_usage = StorageDataRepoListValue.usage;
            });
            output.push(item);
          });
        } else {
          var item = {};
          item.externalId = MainFolderlist.repository.externalId;
          item.id = MainFolderlist.repository.id;
          item.description = MainFolderlist.repository.description;
          item.repositorySubType = MainFolderlist.repository.repositorySubType;
          item.repositoryType = MainFolderlist.repository.repositoryType;
          item.cmisRepositoryId = MainFolderlist.repository.cmisRepositoryId;
          item.createdTime = MainFolderlist.repository.createdTime;
          StorageDataRepoList.forEach(function (StorageDataRepoListValue) {
            if (StorageDataRepoListValue.repositoryId === item.id)
              item.storage_metrics = StorageDataRepoListValue.metrics;
            item.storage_usage = StorageDataRepoListValue.usage;
          });
          output.push(item);
        }
        return output;
      } else {
        return "No Data Found!";
      }
    } catch (error) {
      error.message = error.reason.response.body.message;
      throw (error)
    }
  },
  _DeleteRepositore: async function (in_repo_id) {
    try {
      if(in_repo_id){
        var path = '/rest/v2/repositories/' + in_repo_id;
        const lv_JWToken = await this._fetchJwtToken();
        let ConDMS = await cds.connect.to('DMS_Dest');
        var JToken = 'Bearer ' + lv_JWToken;
        const Resp = await ConDMS.send('DELETE', path, '', { 'Authorization': JToken });
        return Resp;
      } else {
        return "in_repo_id as input required for delete opration";
      }
    } catch (error) {
      var err = error.reason.response.body.message;
      return err;
    }
  }





}