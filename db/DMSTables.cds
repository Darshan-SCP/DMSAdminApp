namespace DMS;

using {
  managed,
  cuid
} from '@sap/cds/common';

entity DMS_MASTER : cuid, managed {
  RequestNo    : Integer;
  VendorID     : String;
  repositoryId : String;
  folderId     : String;
}

entity DMS_ROOT_FOLDER : {
  DisplayName    : String(15);
  externalId     : String(15);
  description    : String(100);
  repositoryType : String(15);
}
