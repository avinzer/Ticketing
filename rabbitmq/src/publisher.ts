import { TicketCreatedPublisher } from "./events/ticket-created-publisher";
import { TicketUpdatedPublisher } from "./events/ticket-updated-publisher";
import amqp from "amqplib/callback_api";

const data = {
  id: "465",
  title: "khalid",
  price: 20,
  userId: "kdajf",
};

const publish = async () => {
  await amqp.connect("amqp://localhost:5672", async (err, connection) => {
    if (err) {
      throw err;
    }

    const publisher = new TicketCreatedPublisher(connection);
    const updatePublisher = new TicketUpdatedPublisher(connection);

    await publisher.publish(data);
    await updatePublisher.publish(data);
  });
};

publish();
