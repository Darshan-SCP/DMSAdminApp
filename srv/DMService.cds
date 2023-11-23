using DMS as tbl from '../db/DMSTables.cds';

service DMS_SRV {
    entity DMSMaster as projection on tbl.DMS_MASTER;
}