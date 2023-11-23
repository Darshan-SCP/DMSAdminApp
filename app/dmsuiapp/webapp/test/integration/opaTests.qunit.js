sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'dmsuiapp/test/integration/FirstJourney',
		'dmsuiapp/test/integration/pages/DMSMasterList',
		'dmsuiapp/test/integration/pages/DMSMasterObjectPage'
    ],
    function(JourneyRunner, opaJourney, DMSMasterList, DMSMasterObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('dmsuiapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheDMSMasterList: DMSMasterList,
					onTheDMSMasterObjectPage: DMSMasterObjectPage
                }
            },
            opaJourney.run
        );
    }
);