/**
 * @description It's a wrapper for everything a controller returns
 */
public with sharing class Response {
    /**
     * @description Apex property
     */
    @AuraEnabled
    public Object responseObj { get; set; }

    /**
     * @description Apex property
     */
    @AuraEnabled
    public Boolean isSuccess { get; set; }

    /**
     * @description Constructor without params
     */
    public Response() {
        this.isSuccess = true;
    }

    /**
     * @description Standard use case constructor
     * @param  pResponseObj stuff to be used in LWC
     */
    public Response(Object pResponseObj) {
        this.isSuccess = true;
        this.responseObj = pResponseObj;
    }

    /**
     * @description Response description
     * @param  e any exception to handle in LWC
     */
    public Response(Exception e) {
        String respMessage = e.getMessage();
        if (e instanceof DmlException) {
            DmlException dmlEx = (DmlException)e;
            respMessage = dmlEx.getDmlMessage(0);
        }
        this.isSuccess = false;
        this.responseObj = respMessage;
    }
}