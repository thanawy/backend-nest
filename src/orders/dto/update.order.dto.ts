import { PartialType } from '@nestjs/mapped-types';
import { Order } from '@orders/entities/order.entity';
import { IsBoolean, IsJSON, IsOptional, IsString } from 'class-validator';
export class UpdateOrderDto extends PartialType(Order) {

    constructor({recurringToken, tokenObject, transactionDetails, status, ...rest}) {
        super();
        this.recurringToken = recurringToken;
        this.tokenObject = tokenObject;
        this.transactionDetails = transactionDetails;
        this.status = status;
        Object.assign(this, rest);
    }

}
