import { Subject, Publisher, TicketUpdatedEvent } from "@avinzer21/common";
import { Message } from "amqplib";


export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subject.TicketUpdated = Subject.TicketUpdated

    onMessage(data: TicketUpdatedEvent['data'], msg: Message): void {
        
    }
}