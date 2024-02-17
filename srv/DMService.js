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
     let a = await DMSlib._GetRepositores();
     var output = {};
    //to create main repositorie in DMS 
    //input is required exmp ->>>> _CreateRepositorie("iVEN","iVEN Main Folder");
    // return await DMSlib._CreateRepositorie(req.data.externalId,req.data.description);
    //let a = await DMSlib._CreateRepositorie("iVEN", "iVEN Main Folder");

    //to delete main repository folder - avoid to use this
    //pass repository id from the data set - field name ->> id
    // let a = await DMSlib._DeleteRepositore("5576625b-784f-4ad1-9614-6d6bf6769a15");
    // let a = await DMSlib._DeleteRepositore();
    //create subfolder 
    // This is to create a folder in the repository for every new book that is getting created.


    // var id = "30029f8000b5d3cc4a212756";
    // var fname = "10000002";
    // var RepoID = 'iVEN';
    // let a = await DMSlib._createSubFolder(id,RepoID, fname);


    //read subfolder data of main repo and subfolder 

    // var fname = '10000008/10000009'; //optional if need to read main repo iVEN
    // var RepoID = 'iVEN';
    // let a = await DMSlib._getSubFolderItems(RepoID, fname);

    //Delete subfolder data of main repo and subfolder 

    // var id = 'BQ1ayzJ0aYlro-p-M2dm77-zT7RyDN9A_eCSL0PdsKQ'; //optional if need to read main repo iVEN
    // var RepoID = 'iVEN';
    // let a = await DMSlib._DeleteSubFolder(id , RepoID);


    // to rename any folder - pass folder id
    //_RenameFolder: async function (ObjectId, RepoID, NewforlderName)
    // var ObjectId = '1jcIftykacdLzWQ6dAXjuFH9lAAIlix_eZ3bXN6cSxI'; //optional if need to read main repo iVEN
    // var RepoID = 'iVEN';
    // var NewforlderName = '700000001';
    // let a = await DMSlib._RenameFolder(ObjectId, RepoID, NewforlderName);

    // let a = await DMSlib._DownloadFile(ObjectId, RepoID)
    // var sf = '427nKXGdTqb2-kxgLGpRzYe2k8m_lc3ubpRYfUXFhaY';
    // var tf = 'jE1Xgmc9LAHPKDZqiJOzGH_hzm75k7yIC9YJjci1DgE';
    // var ObjectId = 'BSARfyLKYktcDDkfAMgDxT0iEl0vNE71hS3DbM9LQbg';

    // let a = await DMSlib._MoveObjectFTF(ObjectId, RepoID, tf, sf);
    // var output = {};
    // // output.DataSet = JSON.stringify(a);
    // var mediaObj = a;
    // if (mediaObj.length <= 0) {
    //   req.reject(404, 'Media not found for the ID')
    //   return
    // }
    // var decodedMedia = "";
    // for (var i in mediaObj) {
    //   decodedMedia = new Buffer.from( (mediaObj[i].content.toString()).split(';base64,').pop(), 'base64');
    // }


    // var output = await DMSlib._formatResult(mediaObj, 'application/pdf');
    // output.fileName = "test.pdf"
    // output.mediaType = "application/pdf";
    output.description = a ;
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
  this.on("POST", "MediaFile", async (req, res) => {
    var ObjectId = '427nKXGdTqb2-kxgLGpRzYe2k8m_lc3ubpRYfUXFhaY'; //opt
    var RepoID = 'iVEN';
    let mediaObj = await DMSlib._DownloadFile(ObjectId, RepoID);

    var decodedMedia = mediaObj;
    // var decodedMedia = new Buffer.from(mediaObj[0].content.toString().split(";base64,").pop(), "base64");
    var output = await DMSlib._formatResult(decodedMedia, 'application/pdf');
    output.fileName = "test.pdf"
    output.mediaType = "application/pdf"; 
    return output;

  });
  this.on('DA', async (req,res) => {

    var ObjectId = '427nKXGdTqb2-kxgLGpRzYe2k8m_lc3ubpRYfUXFhaY'; //opt
    var RepoID = 'iVEN';
    let mediaObj = await DMSlib._DownloadFile(ObjectId, RepoID);

    var decodedMedia = mediaObj;
    // var decodedMedia = new Buffer.from(mediaObj[0].content.toString().split(";base64,").pop(), "base64");
    var output = await DMSlib._formatResult(decodedMedia, 'application/pdf');

    req._.res.set('Content-disposition', 'attachment; filename=Quick_Time_Entry.pdf');
    req._.res.set('Content-type', 'application/pdf');
     req._.res.charset = 'UTF-8';
    req._.res.set('transfer-encoding', 'chunked');
    req._.res.chunkedEncoding = true ;
    req._.res.write("mediaObj");
    req._.res.end();
    // output.fileName = "test.pdf"
    // output.mediaType = "application/pdf"; 
    // return output;





  });

});


