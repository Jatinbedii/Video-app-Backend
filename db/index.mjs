import mongoose from "mongoose";
export default function connecttoDB() {
  mongoose
    .connect(
      "mongodb+srv://jatinbedi733:jatinbedi733@cluster0.f64udjn.mongodb.net/?retryWrites=true&w=majority"
    )
    .then((res) => console.log("connected to DB"))
    .catch((err) => console.log(err));
}
