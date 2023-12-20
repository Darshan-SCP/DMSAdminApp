const cds = require('@sap/cds')
const FormData = require('form-data');
const DMSlib = require("./Lib/DMS_Lib");
const { randomUUID } = require('crypto');
const { Readable, PassThrough } = require('stream');


module.exports = cds.service.impl(function () {

  this.on("GET", "GetRootData", async (req, res) => {


    var fname = "20000002";
    var RepoID = 'iVEN';
    let a = await DMSlib._getSubFolderItems(id, RepoID, fname);
    return a;
  });
  this.on("GET", "RootFolder", async (req, res) => {
    //     //to get main repositorie list in DMS with storage data
    //    // exmp ->>>> _GetRepositores();
    // let a = await DMSlib._GetRepositores();

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

    var fname = '600000001'; //optional if need to read main repo iVEN
    var RepoID = 'iVEN';
    let a = await DMSlib._getSubFolderItems(RepoID, fname);

    //Delete subfolder data of main repo and subfolder 

    // var id = 'BQ1ayzJ0aYlro-p-M2dm77-zT7RyDN9A_eCSL0PdsKQ'; //optional if need to read main repo iVEN
    // var RepoID = 'iVEN';
    // let a = await DMSlib._DeleteSubFolder(id , RepoID);


    // to rename any folder - pass folder id
    //_RenameFolder: async function (ObjectId, RepoID, NewforlderName)
    var ObjectId = '427nKXGdTqb2-kxgLGpRzYe2k8m_lc3ubpRYfUXFhaY'; //optional if need to read main repo iVEN
    var RepoID = 'iVEN';
    // var NewforlderName = '700000001';
    // let a = await DMSlib._RenameFolder(ObjectId, RepoID, NewforlderName);

    // let a = await DMSlib._DownloadFile(ObjectId,RepoID)

    var output = {};
    output.DataSet = JSON.stringify(a);
    return output;
  });
  this.on("CREATE", "MediaFile", async (req, res) => {
    // var ID = randomUUID();

    const url = req._.req.path;

    const id = '1f625369-0294-47c4-bc0a-6755ddc31b8d';
    var tx = cds.transaction(req);
    let connection = await cds.connect.to('db');
    let mediaObj = await connection.run(
      SELECT`content ,  mediaType`
        .from`${connection.entities['MediaFile']}`
        .where({ ID: id }));

    if (mediaObj.length <= 0) {
      req.reject(404, "Media not found for the ID");
      return;
    }
    var decodedMedia = "";
    decodedMedia = new Buffer.from(mediaObj[0].content.toString().split(";base64,").pop(), "base64");
    var output = await DMSlib._formatResult(decodedMedia, mediaObj.mediaType);
    return output

  });
  this.on("GET", "MediaFile", async (req, res) => {
    var ObjectId = '427nKXGdTqb2-kxgLGpRzYe2k8m_lc3ubpRYfUXFhaY'; //opt
    var RepoID = 'iVEN';
    let a = await DMSlib._DownloadFile(ObjectId, RepoID);
    var output = {};
    output.content = a;
    output.fileName = "test.pdf"
    output.mediaType = "application/pdf";

    return output;

  });

});


