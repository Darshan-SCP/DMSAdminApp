using DMS_SRV as service from '../../srv/DMService';

annotate service.DMSMaster with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'RequestNo',
            Value : RequestNo,
        },
        {
            $Type : 'UI.DataField',
            Label : 'VendorID',
            Value : VendorID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'repositoryId',
            Value : repositoryId,
        },
        {
            $Type : 'UI.DataField',
            Label : 'folderId',
            Value : folderId,
        },
    ]
);
annotate service.DMSMaster with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'RequestNo',
                Value : RequestNo,
            },
            {
                $Type : 'UI.DataField',
                Label : 'VendorID',
                Value : VendorID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'repositoryId',
                Value : repositoryId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'folderId',
                Value : folderId,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);
