public with sharing class DeployCallback implements Metadata.DeployCallback {
    public void handleResult(Metadata.DeployResult result,
                             Metadata.DeployCallbackContext context) {
        if (result.status == Metadata.DeployStatus.Succeeded) {
            // do nothing
        } else {
            // Deployment was not successful
            System.debug('fail: ' + result);
            System.debug('fail context: ' + context);
            System.debug('details componentFailures:' + result.details.componentFailures);
            System.debug('errorMessage - ' + result.errorMessage);
        }
    }
}