import { Publisher } from "./base-publisher";
import { TicketCreatedEvent } from "./ticket-created-event"
import { Subject } from "./subject";
import { Message } from "amqplib/properties";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subject.TicketCreated = Subject.TicketCreated

    onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
        console.log(data)
    }
}