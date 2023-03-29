import { LightningElement, api } from 'lwc';
import getRecords from '@salesforce/apex/LocationController.getRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import PaymentTypesModal from 'c/paymentTypesModal';


const columns = [
    { label: 'Active', fieldName: 'active', type: 'boolean' },
    { label: 'Payment Type Label', fieldName: 'label', type: 'text' },
    { label: 'Payment Type', fieldName: 'type', type: 'text' },
];

export default class PaymentTypes extends LightningElement {

    @api
    recordId;

    data = [];
    columns = columns;
    rowOffset = 0;

    connectedCallback() {
        getRecords({ recordId: this.recordId })
            .then(resp => {
                if (resp.isSuccess) {
                    this.data = resp.responseObj;
                } else {
                    const errorEvent = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: resp.responseObj
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

    }


    /* handleClick() {
         this.rowOffset += 1;
     }*/

    async handleClick() {
        await PaymentTypesModal.open({
            size: 'large',
            content: this.recordId,
        });

    }
}