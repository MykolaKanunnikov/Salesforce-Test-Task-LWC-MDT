public with sharing class PaymentTypeWrapper {
    @AuraEnabled
    public String type { get; set; }
    @AuraEnabled
    public String label { get; set; }
    @AuraEnabled
    public String location { get; set; }
    @AuraEnabled
    public Boolean active { get; set; }

    public PaymentTypeWrapper(Payment_Type__mdt paymentType) {
        this.active = paymentType.Active__c;
        this.label = paymentType.Label__c;
        this.type = paymentType.Type__c;
        this.location = paymentType.Location__c;
    }

    public static List<PaymentTypeWrapper> toLWC (List<Payment_Type__mdt> paymentTypes) {
        List<PaymentTypeWrapper> wrapperList = new List<PaymentTypeWrapper>();
        for (Payment_Type__mdt type : paymentTypes) {
            wrapperList.add(new PaymentTypeWrapper(type));
        }
        return wrapperList;
    }
}