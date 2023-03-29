import { LightningElement } from 'lwc';

const columns = [
    { label: 'Active', fieldName: 'active', type: 'boolean'},
    { label: 'Payment Type Label', fieldName: 'label', type: 'text' },
    { label: 'Payment Type', fieldName: 'type', type: 'text' },
];

export default class PaymentTypes extends LightningElement {

    data = [];
    columns = columns;
    rowOffset = 0;


    handleClick(){
        this.rowOffset += 1;
    }
}