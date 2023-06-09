public with sharing class LocationController {
    /**
     * @description getRecords provides relevant, wrapped Payment Type details
     * for the Location__c record.
     * @param  recordId from LWC
     * @return          Response which contains expected data or error object
     */
    @AuraEnabled
    public static Response getRecords(String recordId) {
        Response resp;
        try {
            List<Payment_Type__mdt> paymentTypes = [SELECT Active__c, Label__c, Location__c, Type__c
                                                    FROM Payment_Type__mdt
                                                    WHERE Location__c =: recordId
                                                        WITH SECURITY_ENFORCED];
            resp = new Response(PaymentTypeWrapper.toLWC(paymentTypes));
        } catch (Exception e) {
            resp = new Response(e);
        }
        return resp;
    }

    /**
     * @description saveRecord description
     * @param  recordId serves as a location value
     * @param  label
     * @param  type
     * @param  active
     * @return
     * REQUIRED: add checks for params
     */
    @AuraEnabled
    public static Response saveRecord(String recordId, String label, String type, Boolean active) {
        Response resp;
        try {
            if (label == null || type == null || label == '' || type == '') {
                resp = new Response(new CustomDeployException('No input recieved'));
            } else {
                Metadata.CustomMetadata customMetadata =  new Metadata.CustomMetadata();
                customMetadata.fullName = 'Payment_Type.' + label + '_' + recordId;
                customMetadata.label = 'Standard ' + label;

                Metadata.CustomMetadataValue typeValue = new Metadata.CustomMetadataValue();
                typeValue.field = 'Type__c';
                typeValue.value = type;
                customMetadata.values.add(typeValue);

                Metadata.CustomMetadataValue labelValue = new Metadata.CustomMetadataValue();
                labelValue.field = 'Label__c';
                labelValue.value = label;
                customMetadata.values.add(labelValue);

                Metadata.CustomMetadataValue locationValue = new Metadata.CustomMetadataValue();
                locationValue.field = 'Location__c';
                locationValue.value = recordId;
                customMetadata.values.add(locationValue);

                Metadata.CustomMetadataValue activeValue = new Metadata.CustomMetadataValue();
                activeValue.field = 'Active__c';
                activeValue.value = active;
                customMetadata.values.add(activeValue);

                Metadata.DeployContainer mdContainer = new Metadata.DeployContainer();
                mdContainer.addMetadata(customMetadata);

                // Setup deploy callback
                DeployCallback callback = new DeployCallback();

                // Enqueue custom metadata deployment
                Id deployRequestId = Metadata.Operations.enqueueDeployment(mdContainer, callback);

                Object msg = 'deployRequestId: ' + deployRequestId;

                resp = new Response(msg);
            }
        } catch (Exception e) {
            resp = new Response(e);
        }
        return resp;
    }
}