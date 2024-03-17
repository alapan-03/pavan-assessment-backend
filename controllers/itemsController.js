const Item = require("./../models/itemModel")


exports.addItem = async (req, res, next) => {
    try{
        const items = await Item.create(req.body);

        items.user = req.user._id;
        await items.save();

        res.status(201).json({
            status: "success",
            items
        })
    }
    catch(err){
        res.status(500).json({
            status: "fail",
            message: err.message
        })
    }
}


exports.getItemByUser = async (req, res, next) => {
    try{
        console.log(req.user._id)
        const items = await Item.find({user: req.user._id});

        res.status(200).json({
            status: "success",
            items
        })
    }
    catch(err){
        res.status(500).json({
            status: "success",
            message: err.message
        })    
    }
}

exports.deleteItems = async (req, res, next) => {
    try{
        await Item.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: "success"
        })
    }
    catch(err){
        res.status(500).json({
            status: "fail",
            message: err.message
        })
    }
}