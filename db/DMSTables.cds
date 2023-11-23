namespace DMS;
using { managed ,cuid} from '@sap/cds/common';

entity DMS_MASTER: cuid,managed {
  RequestNo : Integer;
  VendorID  : String;
  repositoryId : String;
  folderId: String;
}