import mongoose from "mongoose";

interface TicketAttr {
  title: string;
  price: number;
  userId: string;
}

interface TicketModel extends mongoose.Model<TicketAttr> {
  build(attrs: TicketAttr): TicketDoc;
}

interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },

}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
});

ticketSchema.statics.build = (attrs: TicketAttr) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Tickets", ticketSchema);

export { Ticket };
