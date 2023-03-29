import { api } from 'lwc';
import LightningModal from 'lightning/modal';

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


    };

}