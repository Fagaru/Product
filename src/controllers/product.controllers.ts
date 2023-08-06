import { Request, Response, NextFunction } from "express";
import Product from "../models/product.model";

export const create = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const newProduct = new Product(req.body);
        console.log(req.body);
        console.log("Product");
        console.log(newProduct);

        const savedOrder = await newProduct.save();
        res.json({
            status: "success",
            data: { ...newProduct },
            message: 'Product created Succesfully',
        });
    } catch(error) {
        next(error);
    }

};

export const createMerchant = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const newProduct = new Product(req.body);
        console.log(req.body);
        console.log("Product");
        console.log(newProduct);
        if (req.body.typeProduct == "parapharmacy") {
            const savedOrder = await newProduct.save();
            res.json({
                status: "success",
                data: { ...newProduct },
                message: 'Product created Succesfully',
            });
        } else {
            res.json({
                status: "failed",
                data: {},
                message: 'You are not authorized to perform this action',
            });
        }
    } catch(error) {
        next(error);
    }

};

export const findOne = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const filter = {_id: req.params.id};
        const product = await Product.findOne(filter);
        res.json({
            status: "success",
            data: { ...product },
            message: 'Product found Succesfully',
        });
    } catch(error) {
        next(error);
    }
};

export const updateOne = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const filter = {_id: req.params.id};
        // const update = {updateAt: Date.now()}
        // const order = await Product.findOneAndUpdate(filter, req.body);
        // const orderU = await Product.findOneAndUpdate(filter, update);
        const product = await Product.updateOne(filter, { ...req.body, _id: req.params.id, updateAt: Date.now()});
        res.json({
            status: "success",
            data: { ...product },
            message: 'Product updated Succesfully',
        });
    } catch(error) {
        next(error);
    }   
};

export const all = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const allProducts = await Product.find();
        res.json({
            status: "success",
            data: { ...allProducts },
            message: 'Products found Succesfully',
        });
    } catch(error) {
        next(error);
    }   
};

export const deleteAsk = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const filter = {_id: req.params.id};
        const deletedProduct = await Product.findOne(filter);
        if (deletedProduct?.typeProduct == "parapharmacy") {
            const product = await Product.updateOne(filter, { deleted: true, updateAt: Date.now()});
            res.json({
                status: "success",
                data: { ...product },
                message: 'Your request will be taken into account',
            });
        } else {
            res.json({
                status: "failed",
                data: {...deletedProduct},
                message: 'You are not authorized to perform this action',
            });
        }
    } catch(error) {
        next(error);
    }   
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const filter = {_id: req.params.id};
        const deletedProduct = await Product.findOne(filter);
        if (deletedProduct?.deleted == true) { 
            const deleteProduct = await Product.deleteOne(filter);
            res.json({
                status: "success",
                data: { ...deleteProduct },
                message: 'Product deleted Succesfully, you can no longer retrieve this data',
            });
        } else {
            res.json({
                status: "success",
                data: { ...deletedProduct },
                message: 'Please request deletion before taking this action.',
            })
        }
    } catch(error) {
        next(error);
    }   
};

export const deleteOneSudo = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const filter = {_id: req.params.id};
        const deleteProduct = await Product.deleteOne(filter);
        res.json({
            status: "success",
            data: { ...deleteProduct },
            message: 'Product deleted Succesfully with sudo command, you can no longer retrieve this data',
        });
    } catch(error) {
        next(error);
    }   
};

// export const historyUser = async (req: Request, res: Response, next: NextFunction) =>{
//     try{
//         const filter = {user: req.params.user};
//         const product = await Product.find(filter);
//         res.json({
//             status: "success",
//             data: { ...product },
//             message: 'history products found Succesfully',
//         });
//     } catch(error) {
//         next(error);
//     }   
// };