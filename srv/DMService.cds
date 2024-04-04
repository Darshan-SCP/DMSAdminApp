using DMS as tbl from '../db/DMSTables.cds';
using DMSmodel as dmsm from '../srv/External/DMSmodel.cds';


service DMS_SRV {
    entity DMSRootFolder as projection on tbl.ROOT_FOLDER;
    entity GetRootData as projection on dmsm.GetRootData;
    entity RootFolder as projection on dmsm.RootFolder;
    entity MediaFile as projection on tbl.MediaFile;
    function DA() returns many String;
      action   FileUpload(action:String,fileDetails:FileUploadDetail,userDetails : User_Details)         returns many String;
    
}
  type FileUploadDetail:{    
    externalId            : String;       //Repository Name
    fname                 : String;       //File Name   
    objectId              : String;       //Folder ID
    contentStreamMimeType : String;       //File Mime Type
    fileContent           : LargeBinary;  //File Content      
  }
    type User_Details    : {
    USER_ROLE : String(50);
    USER_ID   : String(50);
  }
