import { Request, Response, NextFunction } from "express";
import Product from "../models/product.model";
import { logger } from "../logging/logger"

export const create = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const filter = {id: req.body.id};
        const product = await Product.findOne(filter).select("name").lean()
        if (product) {
            res.json({
                status: "success",
                data: { ...product },
                message: 'Product already exist',
            });
            logger.info("Created failed, Product already exist");
        } else {
            const newProduct = new Product(req.body);

            const savedOrder = await newProduct.save();
            res.json({
                status: "success",
                data: { ...newProduct },
                message: 'Product created Succesfully',
            });
            logger.info("New product created", newProduct.id);
        }
    } catch(error) {
        logger.error("Erreur ",error);
        next(error);
    }

};

export const createMerchant = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const filter = {id: req.body.id};
        const product = await Product.findOne(filter).select("name").lean()
        if (product) {
            res.json({
                status: "success",
                data: { ...product },
                message: 'Product already exist',
            });
            logger.info("Created failed, Product already exist");
        } else {
            const newProduct = new Product(req.body);
            if (req.body.typeProduct == "parapharmacy") {
                const savedOrder = await newProduct.save();
                res.json({
                    status: "success",
                    data: { ...newProduct },
                    message: 'Product created Succesfully',
                });
                logger.info("New product created", newProduct.id);
            } else {
                res.json({
                    status: "failed",
                    data: {},
                    message: 'You are not authorized to perform this action',
                });
                logger.warn("Action not authorized for this user");
            }
        }
    } catch(error) {
        logger.error("Erreur ",error);
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
        logger.info("Product found Succesfully");
    } catch(error) {
        logger.error("Erreur ",error);
        next(error);
    }
};

export const getTypeProduct = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const filter = {typeProduct: req.params.typeProduct};
        const product = await Product.find(filter);
        res.json({
            status: "success",
            data: { ...product },
            message: 'Products found Succesfully',
        });
        logger.info("Products found Succesfully");
    } catch(error) {
        logger.error("Erreur ",error);
        next(error);
    }
};


export const updateOne = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const filter = {_id: req.params.id};
        // const update = {updateAt: Date.now()}
        // const order = await Product.findOneAndUpdate(filter, req.body);
        // const orderU = await Product.findOneAndUpdate(filter, update);
        if (req.body.typeProduct == "parapharmacy") {
            const product = await Product.updateOne(filter, { ...req.body, _id: req.params.id, updateAt: Date.now()});
            res.json({
                status: "success",
                data: { ...product },
                message: 'Product updated Succesfully',
            });
            logger.info("Product updated Succesfully");
        } else {
            res.json({
                status: "failed",
                data: {},
                message: 'You are not authorized to perform this action',
            });
            logger.warn("Action not authorized for this user");
        }
    } catch(error) {
        logger.error("Erreur ",error);
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
        logger.info("Products found Succesfully");
    } catch(error) {
        logger.error("Erreur ",error);
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
            logger.info("Ask to delete product ", req.params.id);
        } else {
            res.json({
                status: "failed",
                data: {...deletedProduct},
                message: 'You are not authorized to perform this action',
            });
            logger.warn("Action not authorized for this user");
        }
    } catch(error) {
        logger.error("Erreur ",error);
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
            logger.info("Product deleted succesfully");
        } else {
            res.json({
                status: "success",
                data: { ...deletedProduct },
                message: 'Please request deletion before taking this action.',
            })
            logger.warn("Action not authorized for this user, user tries to delete a product before applying");
        }
    } catch(error) {
        logger.error("Erreur ",error);
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
        logger.warn("Product deleted succesfully by using sudoDelete");
    } catch(error) {
        logger.error("Erreur ",error);
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