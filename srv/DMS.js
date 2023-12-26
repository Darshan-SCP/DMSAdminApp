const cds = require('@sap/cds');
const cloudSDK = require("@sap-cloud-sdk/core");
const axios = require('axios').default;

module.exports = cds.service.impl(function () {

    this.on("GET", "RootFolder", async (req, res) => {
            var BTP_DMS = 'BTP_DMS';
            var Endpoint = '/rest/v2/repositories';
        oDestination = await cloudSDK.getDestination(BTP_DMS);
         //building request
         let oRequestConfig = await cloudSDK.buildHttpRequest(oDestination);
         oRequestConfig.baseURL = oRequestConfig.baseURL + Endpoint;
         oRequestConfig.method = "GET";
        //  oRequestConfig.params = {realm:realm};
        //  oRequestConfig.data={"viewTemplateName":viewTemplateName};
        //  oRequestConfig.headers["Accept"]=oRequestConfig.headers["Content-Type"]="application/json";
        //  oRequestConfig.headers["apikey"]=oDestination.originalProperties.destinationConfiguration.apikey;


         let resp = await axios.request(oRequestConfig);
         return resp;
      });


    });