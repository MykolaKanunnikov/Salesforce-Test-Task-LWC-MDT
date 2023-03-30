import { api } from 'lwc';
import LightningModal from 'lightning/modal';
import saveRecord from '@salesforce/apex/LocationController.saveRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PaymentTypesModal extends LightningModal {

    @api
    content;

    isActive = false;

    handleChange(event) {
        this.isActive = event.target.checked;
    }

    handleSave() {
        let label = this.template.querySelector('.label');
        let type = this.template.querySelector('.type');
        saveRecord({ recordId: this.content, label: label.value, type: type.value, active: this.isActive })
            .then(resp => {
                if (resp.isSuccess) {
                    const successEvent = new ShowToastEvent({
                        title: 'To be saved if input is valid',
                        variant: 'information',
                        message: resp.responseObj
                    });
                    this.dispatchEvent(successEvent);
                    this.close(true);
                } else {
                    const errorEvent = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: resp.responseObj
                    });
                    this.dispatchEvent(errorEvent);
                    this.close();
                }
            })
            .catch(error => {
                const errorEvent = new ShowToastEvent({
                    title: 'Error',
                    variant: 'error',
                    message: "Error: " + error.body.message
                });
                this.dispatchEvent(errorEvent);
                this.close();
            })

    };

}