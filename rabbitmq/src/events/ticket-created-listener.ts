import { Message } from "amqplib/properties";
import { Listener } from "./base-listener";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subject } from "./subject";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {

  subject: Subject.TicketCreated = Subject.TicketCreated
  // queueGroupName = "khalild";


  onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
    console.log(data);
    console.log(this.subject)
  }

}
