using DMS as tbl from '../db/DMSTables.cds';
using DMSmodel as dmsm from '../srv/External/DMSmodel.cds';


service DMS_SRV {
    entity DMSMaster as projection on tbl.DMS_MASTER;
    entity GetRootData as projection on dmsm.GetRootData;
    entity RootFolder as projection on dmsm.RootFolder;
}