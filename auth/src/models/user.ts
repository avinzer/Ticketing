import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserAttrs> {
  build(atrrs: UserAttrs): UserDocs;
}

interface UserDocs extends mongoose.Document {
  email: String;
  password: String;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function(done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get('password'))
    this.set("password", hashed)
    done()
  }
})

userSchema.statics.build = (atrrs: UserAttrs) => {
  return new User(atrrs);
};

const User = mongoose.model<UserDocs, UserModel>("User", userSchema);

export { User };
