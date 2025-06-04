import { Message } from "amqplib/properties";
import { Listener } from "./base-listener";
import { TicketUpdatedEvent } from "./ticket-updated-event";
import { Subject } from "./subject";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {

  subject: Subject.TicketUpdated = Subject.TicketUpdated
  // queueGroupName = "khalild";


  onMessage(data: TicketUpdatedEvent["data"], msg: Message): void {
    console.log(data);
    console.log(this.subject)
  }


}
