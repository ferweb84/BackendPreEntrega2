
import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
 
  products:[ {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
     
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
});
cartSchema.pre("findOne", function () {
  this.populate("products.productId");
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export { cartModel };