import nats, {Message} from "node-nats-streaming"
import {randomBytes} from "crypto"

console.clear()


const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
    url: "http://localhost:4222"
})


stan.on("connect", () => {

    stan.on("close", () => {
        process.exit()
    })

    const options = stan.subscriptionOptions().setManualAckMode(true)
    const subscription = stan.subscribe(
        "ticket:created",
        "order-service-queue-group",
        options
    )
    subscription.on("message", (msg: Message) => {
        const data = msg.getData()

        if (typeof data === "string") {
            console.log("received")
        }
        msg.ack()
    })

})