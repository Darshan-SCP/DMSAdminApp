
using DMSmodel as dmsm from '../srv/External/DMSmodel.cds';

  service DMSsrv {
    entity RootFolder as projection on dmsm.RootFolder;
  }