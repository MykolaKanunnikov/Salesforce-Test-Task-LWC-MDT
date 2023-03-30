import { api } from 'lwc';
import LightningModal from 'lightning/modal';
import saveRecord from '@salesforce/apex/LocationController.saveRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PaymentTypesModal extends LightningModal {

    //recieves recordId
    @api
    content;

    //represents checkbox state
    isActive = false;

    //toast
    variant = 'error';
    message = '';

    handleChange(event) {
        this.isActive = event.target.checked;
    }

    handleSave() {
        let label = this.template.querySelector('.label');
        let type = this.template.querySelector('.type');
        saveRecord({ recordId: this.content, label: label.value, type: type.value, active: this.isActive })
            .then(resp => {
                if (resp.isSuccess) {
                    this.message = 'To be saved if input is valid. ' + resp.responseObj;
                    this.variant = 'info'
                    this.showToast();
                    this.close(true);
                } else {
                    this.message = resp.responseObj;
                    this.showToast();
                    this.close();
                }
            })
            .catch(error => {
                this.message = error.body.message;
                this.showToast();
                this.close();
            })

    };

    showToast() {
        const event = new ShowToastEvent({
            title: 'Status',
            variant: this.variant,
            message: this.message,
        });
        this.dispatchEvent(event);
    }
}