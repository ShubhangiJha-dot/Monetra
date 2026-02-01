// const User=require("../models/User")
const xlsx=require('xlsx')
const path = require("path")
const Expense=require("../models/Expense")

//add income src
exports.addExpense=async(req,res)=>{
    const userId=req.user._id

    try{
        const{icon, category, amount,date}=req.body;

        //validation check for missing fields
        if(!category || !amount||!date){
            return res.status(400).json({message:"All fields are required"})
        }
        const newExpense=new Expense({
            userId,
            icon,
            category,
            amount,
            date:new Date(date)
        })
        await newExpense.save()
        res.status(200).json(newExpense);
    } catch(error){

        res.status(500).json({message:"Server Error"})
    }
}



exports.getAllExpense = async (req, res) => {
    try {
        const expenses = await Expense.find({
            userId: req.user._id
        }).sort({ createdAt: -1 })

        res.status(200).json(expenses)
    } catch (error) {
        console.error("Get expense error:", error)
        res.status(500).json({ message: "Server Error" })
    }
}



//dlt income src
exports.deleteExpense=async(req,res)=>{
    try{
        await Expense.findByIdAndDelete(req.params.id)
        res.json({message:"Expense deleted successfully"})
    } catch(error){
        res.status(500).json({message:"Server Error"})
    }
}



exports.downloadExpenseExcel = async (req, res) => {
    try {
        const userId = req.user._id

        const expense = await Expense.find({ userId }).sort({ date: -1 })

        const data = expense.map(item => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date
        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, "Expense")

        const filePath = path.join(__dirname, "..", "expense_details.xlsx")

        xlsx.writeFile(wb, filePath)

        return res.download(filePath)

    } catch (error) {
        console.error("DOWNLOAD EXCEL ERROR:", error)
        res.status(500).json({ message: "Server Error" })
    }
}
