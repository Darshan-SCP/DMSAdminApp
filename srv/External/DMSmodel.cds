@cds.external: true
service DMSmodel {};

@cds.external: true
entity DMSmodel.GetRootData {
    key objectId                   : String(100) not null;
        versionSeriesContentLength : String(10);
        lastModifiedBy             : String;
        versionLabel               : String(10);
        contentStreamId            : String;
        objectTypeId               : String(20);
        contentStreamMimeType      : String(30);
        createdBy                  : String;
        baseTypeId                 : String(20);
        sap_owner                  : String;
        creationDate               : Date;
        changeToken                : Int16;
        isVersionSeriesCheckedOut  : Boolean;
        isMajorVersion             : Boolean;
        contentStreamFileName      : String(100);
        //   "sap:parentIds": {

        //     "cardinality": "multi",
        //     "value": [
        //       "a87fd180008397fc2fa8f556"
        //     ]
        //   },
        name                       : String(100);
        isLatestVersion            : Boolean;
        lastModificationDate       : Date;
        versionSeriesId            : String;
        isLatestMajorVersion       : Boolean;
        contentStreamLength        : Int64;

}
