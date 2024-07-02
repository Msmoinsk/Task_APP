const Task = require("../Models/task-model")
const asyncWrapper = require("../middleware/async")
const { createCustomError } = require("../errors/custom-error")
// The work flow goo like 
// [ Controller => asyncM => Controller =(if err)> asyncM => errorM ]

exports.getAllTasks = asyncWrapper( async(req, res) => {
    const tasks = await Task.find()
    res.status(200).json({tasks})
})

exports.createTask = asyncWrapper( async(req, res) => {
    const tasks = await Task.create(req.body)
    res.status(200).json({tasks})
})

exports.getTask = asyncWrapper( async(req, res, next) => {
    const singleTask = await Task.findOne({_id: req.params.id})
    if(!singleTask){
        return next(createCustomError("to task with id.", 404))
    }
    res.status(200).json({tasks: singleTask})
})

exports.deleteTask = asyncWrapper( async (req, res) => {
    const delete_task = await Task.findOneAndDelete({_id: req.params.id})
    if(!delete_task){
        return next(createCustomError("to task with id.", 404))
    }
    res.status(200).json({tasks: delete_task})
})

exports.updateTask = asyncWrapper( async(req, res) => {
    const { id } = req.params
    const tasks = await Task.findOneAndUpdate({
        _id: id
    }, req.body, {
        new: true,
        runValidators:true,
    })
    if(!tasks){
        return next(createCustomError("to task with id.", 404))
    }
    res.status(200).json({tasks})
})

// exports.putMethodDemonstration = async(req, res) => {
// [ This Controller will delete all data in object and over Write (req.body) in the existing data ]
//     try {
//         const { id } = req.params
//         const tasks = await Task.findOneAndUpdate({
//             _id: id
//         }, req.body, {
//             new: true,
//             runValidators:true,
//             overwrite: true,   <= This property allow you do to that
//         })
//         if(!tasks){
//             return res.status(404).json({msk: "no data been upddated."})
//         }

//         res.status(200).json({tasks})
//     } catch (error) {
//         res.status(500).json({msg: error}).send("Item Deleted")
//     }
// }
// -------------------------------------------------------------------------------------------------------
// exports.createTask = async(req, res) => {
//     try {
//         const tasks = await Task.create(req.body)
//         res.status(200).json({tasks})
//     } catch (error) {
//         res.status(500).json({msg: error})
//     }
// }

// exports.getTask = async(req, res) => {
//     try {
//         const singleTask = await Task.findOne({_id: req.params.id})
//         if(!singleTask){
//             return res.status(404).json({msg: "to task with id."})
//         }
//         res.status(200).json({tasks: singleTask})
//     } catch (error) {
//         res.status(500).json({msg: error})
//     }
// }

// exports.deleteTask = async (req, res) => {
//     try {
//         const delete_task = await Task.findOneAndDelete({_id: req.params.id})
//         if(!delete_task){
//             return res.status(404).json({msk: "no data been deleted."})
//         }
//         res.status(200).json({tasks: delete_task})
//     } catch (error) {
//         res.status(500).json({msg: error}).send("Item Deleted")
//     }
// }

// exports.updateTask = async(req, res) => {
//     try {
//         const { id } = req.params
//         const tasks = await Task.findOneAndUpdate({
//             _id: id
//         }, req.body, {
//             new: true,
//             runValidators:true,
//         })
//         if(!tasks){
//             return res.status(404).json({msk: "no data been upddated."})
//         }

//         res.status(200).json({tasks})
//     } catch (error) {
//         res.status(500).json({msg: error}).send("Item Deleted")
//     }
// }

