public with sharing class PaymentTypeWrapper {
    public String type { get; set; }
    public String label { get; set; }
    public String location { get; set; }
    public Boolean active { get; set; }
    
    public PaymentTypeWrapper() {
        this.type = '';
        this.label = '';
        this.location = '';
        this.active = false;
    }
    
    public PaymentTypeWrapper(Payment_Type__mdt paymentType) {
        this.type = paymentType.Type__c;
        this.label = paymentType.Label__c;
        this.location = paymentType.Location__c;
        this.active = paymentType.Active__c;
    }
    
    public Payment_Type__mdt toMetadata() {
        Payment_Type__mdt paymentType = new Payment_Type__mdt();
        paymentType.Type__c = this.type;
        paymentType.Label__c = this.label;
        paymentType.Location__c = this.location;
        paymentType.Active__c = this.active;
        return paymentType;
    }
}
