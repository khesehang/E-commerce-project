const ProductModel = require("../../models/productModel");

const postProduct = async (req, res, next) => {
    try {
        const product = await ProductModel.create(req.body)
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch (error) {
        return next(error);
    }
}


const getProducts = async (req, res, next) => {
    try {
        const product = await ProductModel.find()
            .populate('ratings.userId', '_id fullname username email')

        res.status(201).json(product)
    } catch (error) {
        return next(error);
    }
}

const getProduct = async (req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.id)
            .populate('ratings.userId', '_id fullname username email')
            .lean()
        if (!product) return res.status(404).json({
            message: 'Product not found',
            status: 404
        })
        res.status(201).json(product)
    } catch (error) {
        return next(error);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        await ProductModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
            .then(product => {
                if (!product) return res.status(404).json({
                    message: 'Product not found',
                    status: 404
                });
                console.log('product to update', product)
                res.status(201).json(product)
            })
            .catch(err => {
                return res.status(404).send(err)
            })
    } catch (error) {
        throw new Error(error.message);
    }
}
const deleteProduct = async (req, res, next) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id)
        console.log('product to delelte', product)
        if (!product) {
            return res.status(404).json({
                message: 'Product not found',
                status: 404
            })
        }
        res.status(201).json(product)
    } catch (error) {
        return next('not found error');
    }
}

const rateProduct = async (req, res, next) => {
    console.log('to rate ', req.body)
    const userId = req.user._id

    const rate = {
        rating: req.body.rating,
        userId: userId,
    }
    try {
        const ratedProduct = await ProductModel.findByIdAndUpdate(req.params.id, {
            $set: { ratings: rate }
        }, { new: true })
        if (!ratedProduct) {
            return res.status(404).json({
                message: 'Product not found',
                status: 404
            })
        }
        res.status(200).json(ratedProduct)
    } catch (error) {
        return next(error)
    }
}

const reviewProduct = async (req, res, next) => {
    const userId = req.user._id
    const review = {
        userId,
        text: req.body.review,
    }
    try {
        const reviewedProduct = await ProductModel.findByIdAndUpdate(req.params.id, {
            $set: { reviews: review }
        }, { new: true })
        if (!reviewedProduct) {
            return res.status(404).json({ message: 'Prodct not found' })
        }
        res.status(200).json(reviewedProduct)
    } catch (error) {
        return next(error)
    }
}



module.exports = {
    getProducts,
    postProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    rateProduct,
    reviewProduct,
}