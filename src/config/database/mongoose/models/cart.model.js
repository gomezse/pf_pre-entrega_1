import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Products",
      },
      quantity: {
        type: Number,
      },
      _id: false
    },
  ],
});

cartsSchema.methods.toJSON = function () {
  const { __v, ...cart } = this.toObject();
  return cart;
}

export const cartsModel = mongoose.model("Carts", cartsSchema);