import amqp from "amqplib/callback_api";

class AmqpWrapper {
  private _client?: amqp.Connection;

  get client() {
    if (!this._client) {
      throw new Error("Cannot access amqp client before connecting");
    }
    return this._client;
  }

  // connect(url: string): Promise<void> {
  //     return new Promise((resolve, reject) => {
  //         amqp.connect(url, (err, connection) => {
  //             if (err) {
  //                 console.log(err)
  //                 reject()
  //             }
  //             this._client = connection;
  //             console.log("Connected to Amqp");
  //             resolve();
  //         });
  //     });
  // }

  connect = async (url: string) => {
    await amqp.connect(url, (err, connection) => {
      if (err) {
        throw err;
      }

      this._client = connection;
      console.log("Connected to amqp");
    });
  };
}

export const amqpWrapper = new AmqpWrapper();
