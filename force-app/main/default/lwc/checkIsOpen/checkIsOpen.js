import { LightningElement, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

import checkIsOpen from "@salesforce/apex/CheckLeadStatusController.checkIsOpen";
export default class CheckIsOpen extends LightningElement {
  @api recordId;
  @api invoke() {
    this.dispatchEvent(
      new ShowToastEvent({
        title: "Started Lead Check...",
        message: ""
      })
    );

    checkIsOpen({ leadId: this.recordId })
      .then((result) => {
        console.log(result);
        if (result) {
          this.dispatchEvent(
            new ShowToastEvent({
              title: "Lead is Open",
              variant: "success"
            })
          );
        } else {
          this.dispatchEvent(
            new ShowToastEvent({
              title: "Lead is not Open",
              variant: "warning"
            })
          );
        }

        this.dispatchEvent(new RefreshEvent());
      })
      .catch((error) => {
        console.error(error);
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error",
            message: `${error.body.message}`,
            variant: "error"
          })
        );
      });
  }
}
