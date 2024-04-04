const cds = require('@sap/cds')
const FormData = require('form-data');
const DMSlib = require("./Lib/DMS_Lib");
const { randomUUID } = require('crypto');
const { Readable, PassThrough } = require('stream');
const stream = require('stream');


module.exports = cds.service.impl(function () {
  const { MediaFile } = this.entities;
  // this.on("GET", "GetRootData", async (req, res) => {


  //   var fname = "20000002";
  //   var RepoID = 'iVEN';
  //   let a = await DMSlib._getSubFolderItems(id, RepoID, fname);
  //   return a;
  // });

  this.before("POST", "MediaFile", async (req, res) => {

    // const stream = new stream.Passthrough();
    // const chunks = []
    // var data = req.data;
    // stream.on( 'data',(chunk)=>{
    //   chunks.push(chunk);
    // })
    // stream.on('end',()=>{
    //  var mdta = Buffer.concat(chunks).toString('base64');
    // })
    const { body } = req;
    const { stringContentOfSomeFile } = body;
    
    // create formData for your request:
    const thisForm = new FormData();
  
    // passing a JSON object:
    // must declare "contentType: application/json" to avoid 415 status response from some systems:
  //  const someJson = JSON.stringify({  key: 'value', otherKey: 'otherValue' });
    
  
  //thisForm.append('data', someJson, { contentType: 'application/pdf' });
    
    // passing a file buffer:
    const fileBuffer = Buffer.from(stringContentOfSomeFile, 'utf-8');
    return ;
  });
  //   // var ID = randomUUID();

  //   const url = req._.req.path;

  //   // const id = '1f625369-0294-47c4-bc0a-6755ddc31b8d';
  //   // var tx = cds.transaction(req);
  //   // let connection = await cds.connect.to('db');
  //   // let mediaObj = await connection.run(
  //   //   SELECT`content ,  mediaType`
  //   //     .from`${connection.entities['MediaFile']}`
  //   //     .where({ ID: id }));

  //   // if (mediaObj.length <= 0) {
  //   //   req.reject(404, "Media not found for the ID");
      //return;
  //   // }
  //   // var decodedMedia = "";
  //   // decodedMedia = new Buffer.from(mediaObj[0].content.toString().split(";base64,").pop(), "base64");
  //   // var output = await DMSlib._formatResult(decodedMedia, mediaObj.mediaType);
  //  // return output

  // });
  // this.on("PUT", "MediaFile", async (req, res) => {
  //   // var ObjectId = '427nKXGdTqb2-kxgLGpRzYe2k8m_lc3ubpRYfUXFhaY'; //opt
  //   // var RepoID = 'iVEN';
  //   // let mediaObj = await DMSlib._DownloadFile(ObjectId, RepoID);

  //   // var decodedMedia = mediaObj;
  //   // // var decodedMedia = new Buffer.from(mediaObj[0].content.toString().split(";base64,").pop(), "base64");
  //   // var output = await DMSlib._formatResult(decodedMedia, 'application/pdf');
  //   // output.fileName = "test.pdf"
  //   // output.mediaType = "application/pdf"; 
  //   return output;

  // });
  this.on("GET",'DA', async (req,res) => {
    // xVvUFquAeZgGWIWtJI2metbuxvnNGqF1U5dN69QVuGQ
   // var ObjectId = '427nKXGdTqb2-kxgLGpRzYe2k8m_lc3ubpRYfUXFhaY'; //opt
    var ObjectId = 'MkXEZobpf3JOvz1jRD_pl9Z1ewcyXRFVNbwG--2DKPM';
    var RepoID = 'iVEN';
    let mediaObj = await DMSlib._DownloadFile(ObjectId, RepoID);

    // var decodedMedia = mediaObj;
    // var decodedMedia = new Buffer.from(mediaObj[0].content.toString().split(";base64,").pop(), "base64");
    //var output = await DMSlib._formatResult(decodedMedia, 'application/pdf');
   // var blob = new Blob([mediaObj], {type: "application/pdf"});
    // mediaObj = 'data:"application/pdf";base64,' + mediaObj;
    req._.res.set('Content-disposition', 'attachment;filename=filjson.json');
    req._.res.set('Content-type', 'application/json');
    req._.res.charset = 'UTF-8';
     req._.res.set('transfer-encoding', 'chunked');
     req._.res.chunkedEncoding = true ;
    
    var resObj = JSON.stringify(mediaObj);
    req._.res.write(resObj);
    req._.res.end();
 

  });
  this.on("POST",'DA', async (req,res) => {
    // xVvUFquAeZgGWIWtJI2metbuxvnNGqF1U5dN69QVuGQ
   // var ObjectId = '427nKXGdTqb2-kxgLGpRzYe2k8m_lc3ubpRYfUXFhaY'; //opt
    // var ObjectId = 'MkXEZobpf3JOvz1jRD_pl9Z1ewcyXRFVNbwG--2DKPM';
    // var RepoID = 'iVEN';
    // let mediaObj = await DMSlib._DownloadFile(ObjectId, RepoID);

  
 return "ok";

  });
  this.on('FileUpload', async (req) => {   
    try {     
        var { action,fileDetails, userDetails } = req.data;
        var sUserId = userDetails.USER_ID || null;
        var sUserRole = userDetails.USER_ROLE || null;
        var client = await dbClass.createConnectionFromEnv();
        var dbConn = new dbClass(client);                        
        var response;    

        var sExternalId = fileDetails.externalId || null;
        var sObjectId = fileDetails.objectId || null;
        var sFileName = fileDetails.fname || null;
        var fileContent = fileDetails.fileContent || null;    
        var sFileMimeType = fileDetails.contentStreamMimeType || null;          
        if (action == 'Download') {
            response = await lib_dms._DownloadFile(sObjectId, sExternalId);
        } else if (action == 'Upload') {   
            response = await lib_dms._UploadFile(sExternalId,sObjectId,sFileName,sFileMimeType,fileContent);     
        }  

        if(response||response.properties){                       
            response.properties.statusText="File "+sFileName+" uploaded successfully"
            response.properties.status=200;        
        }    
                
        
        // req._.res.set('Content-disposition', 'attachment; filename=Quick_Time_Entry.pdf');
        // req._.res.set('Content-type', 'application/pdf');
        // var base64DataUri = 'data:application/pdf;base64,' + response;            
        // req._.res.send(base64DataUri);
        // req._.res.end();
        req.reply(response);             
    } catch (error) {

        var sType = error.code ? "Procedure" : "Node Js";  
        var iErrorCode = error.code ??(error.status??500);
        var iErrorMessage = error.message ??(error.statusText??error);    
        let Result = {
            OUT_ERROR_CODE: iErrorCode,
            OUT_ERROR_MESSAGE: iErrorMessage      
        }
        lib_common.postErrorLog(Result, null, sUserId, sUserRole, "Upload DMS Repository", sType, dbConn, hdbext);
        // console.error(error)     
        // return error.messsage            
        req.error({ code: iErrorCode, message: iErrorMessage });    
    }
})
});


