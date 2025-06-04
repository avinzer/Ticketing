import amqp, { Message } from "amqplib/callback_api"
import { Subject } from "./subject"


interface Event {
    subject: Subject
    data: {
    id: string,
    title: string,
    price: number,
    userId: string
  }
}


export abstract class Listener<T extends Event> {
    abstract subject: T["subject"]
    // abstract queueGroupName: string
    abstract onMessage(data: T["data"], msg: Message): void;
    private client: amqp.Connection
    protected ackwait = 5 * 1000

    constructor (client: amqp.Connection) {
        this.client = client
    }

    async listen() {
        await this.client.createChannel((err, channel) => {
            if(err) {
                throw err
            }

            channel.assertQueue(this.subject, { durable: true })

            channel.consume(this.subject, (msg: amqp.Message | null) => {

                if (msg) {
                    const data = this._parseMessage(msg)
                    this.onMessage(data, msg)
                    channel.ack(msg)
                }

            }, {noAck: false})
        })

    }

    private _parseMessage(msg: amqp.Message) {
        const data = msg.content.toString()
        return JSON.parse(data)
    }
}

