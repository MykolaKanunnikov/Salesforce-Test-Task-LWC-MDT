public with sharing class DeployCallback implements Metadata.DeployCallback {
    public void handleResult(Metadata.DeployResult result,
                             Metadata.DeployCallbackContext context) {
        if (result.status == Metadata.DeployStatus.Succeeded) {
            //do nothing
        } else {
            String errMsg = result.details.componentFailures[0].problem;
            System.debug('errMsg - ' + errMsg);
        }
    }
}