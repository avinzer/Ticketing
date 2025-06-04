import { Subject, Publisher, TicketCreatedEvent } from "@avinzer21/common";
import { Message } from "amqplib";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subject.TicketCreated = Subject.TicketCreated

    onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
        
    }
}