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
}