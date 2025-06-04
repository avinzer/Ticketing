import { Subject } from "./subject"
import { Publisher } from './base-publisher'
import { TicketUpdatedEvent } from "./ticket-updated-event"
import { Message } from "amqplib/properties"


export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subject.TicketUpdated = Subject.TicketUpdated
    onMessage(data: { id: string; title: string; price: number; userId: string; }, msg: Message): void {
        console.log(msg)
    }
}