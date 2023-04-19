
import CartManager from "../dao/fileManagers/CartManager.js";
import CartdbManager from "../dao/dbManagers/cartdbManager.js";
import { Router } from "express";
import { cartModel } from "../dao/models/cart.model.js";

const router = Router();


const cartdbmanager = new CartdbManager();

//METODOS GET 

router.get("/", async (req, res) => {
    try {
        const consulta = await cartdbmanager.getCarts();
        return res.send({ status: "Success", payload: consulta });
    } catch (error) {
        console.log(error)
    }
});

router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const findcart = await cartdbmanager.getCartsbyId(cid);

        if (!findcart) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart does not exists" });
        }
        return res.send({ status: "success", payload: findcart });
        // if (typeof(cart)==="string") {
        //     return res.status(404).send({
        //         status: "error",
        //         message: { error:cart},
        //     });
        // }

        // return res.status(200).send({
        //     status: "success",
        //     message: { cart: cart },
        // });
    } catch (error) {
        console.log(error)
    }
});


//METODOS POST 

router.post("/", async (req, res) => {
    try {
        let cart = req.body;
        const createCart = await cartdbmanager.createCart(cart);
        console.log(createCart)
        if (!createCart) {
            return res
                .status(400)
                .send({ status: "error", error: "Cart already exists" });
        }
        return res.send({ status: "success", payload: createCart });
        // await cartmanager.createCart();
        // return res.status(201).send({
        //     status: "success",
        //     message: {
        //         success: "Cart created",
        //     },
        // });
    } catch (error) {
        console.log(error)
    }
})


router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cId = req.params.cid
        const pId = req.params.pid
        const { quantity } = req.body
        console.log(cId, pId)

        let result = await cartdbmanager.addProducttoCart(cId, pId, quantity);
        if (!result) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart does not exists" });
        }
        return res.send({ status: "success", payload: result });

    } catch (error) {
        console.log(error)
    }
})

//METODO PUT 

router.put("/:cid",async (req,res)=>{
    try {
        const id=req.params.cid
        const valor=req.body;
        const result = await cartdbmanager.updateCart(id,valor)
        if (!result) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart can not be updated" });
        }
        return res.send({ status: "success", payload: result});
    } catch (error) {
        console.log(error)
    }
})


router.put("/:cid/product/:pid", async (req, res) => {
    try {
        const cId = req.params.cid
        const pId = req.params.pid
        const { quantity } = req.body
        console.log(cId, pId)

        let result = await cartdbmanager.updateProductFromCart(cId, pId, quantity);
        if (!result) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart does not exists" });
        }
        return res.send({ status: "success", payload: result });

    } catch (error) {
        console.log(error)
    }
})

//METODOS DELETE 

router.delete("/:cid",async(req,res)=>{
    try {
        const cId= req.params.cid;
        let result= await cartdbmanager.deleteCart(cId);
        if (!result) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart can not be eliminated" });
        }
        return res.send({ status: "success", payload: result });
    } catch (error) {
        console.log(error)
    }
})

router.delete("/:cid/product/:pid", async (req, res) => {
    try {
       const { cid,pid }=req.params
   
        console.log(req.params)

        let result = await cartdbmanager.deleteproductfromCart(cid, pid);
        if (!result) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart does not exists" });
        }
        return res.send({ status: "success", payload: result });

    } catch (error) {
        console.log(error)
    }
})
export default router;
