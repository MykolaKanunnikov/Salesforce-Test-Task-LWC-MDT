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

    //datatable
    data = [];
    columns = columns;
    rowOffset = 0;

    //modal
    isModalJustClosed = false;

    //toast
    variant = 'error';
    message = '';

    connectedCallback() {
        this.getRecordsToLWC();
    }

    getRecordsToLWC() {
        getRecords({ recordId: this.recordId })
            .then(resp => {
                if (resp.isSuccess) {
                    if (this.data === [] || this.data.length != resp.responseObj.length) {
                        this.data = resp.responseObj;
                        this.isModalJustClosed = false;
                    }
                } else {
                    this.message = resp.responseObj;
                    this.showToast();
                    this.isModalJustClosed = false;
                }
            })
            .catch(error => {
                this.message = error.body.message;
                this.showToast();
                this.isModalJustClosed = false;
            })

    }

    async handleClick() {
        this.isModalJustClosed = await PaymentTypesModal.open({
            size: 'medium',
            content: this.recordId,
        });
        if (this.isModalJustClosed) {
            this.refreshDatatable();
        }
    }

    // let asycn jobs to complete (5 sec)
    refreshDatatable() {
        setTimeout(() => {
            this.getRecordsToLWC();
        }, 5000);
    }

    showToast() {
        const event = new ShowToastEvent({
            title: 'Status',
            variant: this.variant,
            message: this.message,
        });
        this.dispatchEvent(event);
    }


}