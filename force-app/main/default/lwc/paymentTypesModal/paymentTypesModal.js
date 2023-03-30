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
        console.log(label.value);
        console.log(type.value);
        console.log(this.content);
        if (this.isActive) {
            console.log('active');
        } else {
            console.log('not active')
        }
        saveRecord({ recordId: this.content, label: label.value, type: type.value, active: this.isActive })
            .then(resp => {
                if (resp.isSuccess) {
                    const successEvent = new ShowToastEvent({
                        title: 'Success',
                        variant: 'success',
                        message: 'New record is saved'
                    });
                    this.dispatchEvent(successEvent);
                } else {
                    const errorEvent = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: 'Not saved'
                    });
                    this.dispatchEvent(errorEvent);
                }
            })
            .catch(error => {
                const errorEvent = new ShowToastEvent({
                    title: 'Error',
                    variant: 'error',
                    message: "Error: " + error.body.message
                });
                this.dispatchEvent(errorEvent);
            })
    };

}