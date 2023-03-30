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
    closedModal = false;

    connectedCallback() {
        this.getRecordsToLWC();
    }

    getRecordsToLWC() {
        getRecords({ recordId: this.recordId })
            .then(resp => {
                if (resp.isSuccess) {
                    if (this.data === [] || this.data.length != resp.responseObj.length) {
                        this.data = resp.responseObj;
                        this.closedModal = false;
                    }
                } else {
                    const errorEvent = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: resp.responseObj
                    });
                    this.dispatchEvent(errorEvent);
                    this.closedModal = false;
                }
            })
            .catch(error => {
                const errorEvent = new ShowToastEvent({
                    title: 'Error',
                    variant: 'error',
                    message: "Error: " + error.body.message
                });
                this.dispatchEvent(errorEvent);
                this.closedModal = false;
            })

    }

    async handleClick() {
        this.closedModal = await PaymentTypesModal.open({
            size: 'large',
            content: this.recordId,
        });
        if (this.closedModal) {
            this.updateDatatable();
        }
    }

    updateDatatable() {
        setTimeout(()=> {
            this.getRecordsToLWC();
        }, 5000);
    }

}