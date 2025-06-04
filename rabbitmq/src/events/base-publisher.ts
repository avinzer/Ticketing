import amqp from "amqplib/callback_api";
import { Subject } from "./subject";

interface Event {
  subject: Subject;
  data: {
    id: string,
    title: string,
    price: number,
    userId: string
  }
}

export abstract class Publisher<T extends Event> {
  abstract subject: T["subject"];

  abstract onMessage(data: T["data"], msg: amqp.Message): void;
  private publisher: amqp.Connection;

  constructor(publisher: amqp.Connection) {
    this.publisher = publisher;
  }

  async publish(data: T['data']) {
    await this.publisher.createChannel(async (err, channel) => {
      if (err) {
        throw err;
      }

      await channel.assertQueue(this.subject, { durable: true });

      channel.sendToQueue(this.subject, Buffer.from(JSON.stringify(data)), {persistent: true});
    });
  }
}
