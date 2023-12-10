const cds = require('@sap/cds')
const FormData = require('form-data');
const DMSlib = require("./Lib/DMS_Lib");

module.exports = cds.service.impl(function () {

  this.on("GET", "GetRootData", async (req, res) => {


        var fname = "20000002";
    var RepoID = 'iVEN';
    let a = await DMSlib. _getSubFolderItems(id,RepoID, fname);
return a;
  });
  this.on("GET", "RootFolder", async (req, res) => {
    //     //to get main repositorie list in DMS with storage data
    //    // exmp ->>>> _GetRepositores();
    //     let a = await DMSlib._GetRepositores();

    //to create main repositorie in DMS 
    //input is required exmp ->>>> _CreateRepositorie("iVEN","iVEN Main Folder");
    // return await DMSlib._CreateRepositorie(req.data.externalId,req.data.description);
    //let a = await DMSlib._CreateRepositorie("iVEN", "iVEN Main Folder");

    //to delete main repository folder - avoid to use this
    //pass repository id from the data set - field name ->> id
    // let a = await DMSlib._DeleteRepositore("3ddb38a2-ee4c-4318-8170-3d02e24e4947");

    //create subfolder 
    // This is to create a folder in the repository for every new book that is getting created.


    // var id = "30029f8000b5d3cc4a212756";
    // var fname = "10000002";
    // var RepoID = 'iVEN';
    // let a = await DMSlib._createSubFolder(id,RepoID, fname);


//read subfolder data of main repo and subfolder 

    // var fname = '10000001'; //optional if need to read main repo iVEN
    // var RepoID = 'iVEN';
    // let a = await DMSlib._getSubFolderItems(RepoID, fname);

//Delete subfolder data of main repo and subfolder 

    // var id = 'BQ1ayzJ0aYlro-p-M2dm77-zT7RyDN9A_eCSL0PdsKQ'; //optional if need to read main repo iVEN
    // var RepoID = 'iVEN';
    // let a = await DMSlib._DeleteSubFolder(id , RepoID);


    var output = {};
    output.DataSet = JSON.stringify(a);
    return output;
  });

  this.on("POST", "RootFolder", async (req, res) => {
    var output = {};
    output.DataSet = JSON.stringify(a);
    return output;
  });
});


