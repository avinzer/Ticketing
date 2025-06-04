import { TicketCreatedListener } from "./events/ticket-created-listener";
import amqp from "amqplib/callback_api"
import { TicketUpdatedListener } from "./events/ticket-updated-listener"



const consumer = async () => {
  await amqp.connect("amqp://localhost:5672", async (err, connection) => {
    if (err) {
      throw err
    }

    const listener = new TicketCreatedListener(connection)

    const updatedListener = new TicketUpdatedListener(connection)

    await listener.listen()
    await updatedListener.listen()
  })
}

consumer()