using DMS as tbl from '../db/DMSTables.cds';
using DMSmodel as dmsm from '../srv/External/DMSmodel.cds';


service DMS_SRV {
    entity DMSRootFolder as projection on tbl.ROOT_FOLDER;
    entity GetRootData as projection on dmsm.GetRootData;
    entity RootFolder as projection on dmsm.RootFolder;
    entity MediaFile as projection on tbl.MediaFile;
}