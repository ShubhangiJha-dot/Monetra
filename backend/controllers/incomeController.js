// const User=require("../models/User")
const xlsx=require('xlsx')
const path = require("path")
const Income=require("../models/Income")

//add income src
exports.addIncome=async(req,res)=>{
    const userId=req.user._id

    try{
        const{icon, source, amount,date}=req.body;

        //validation check for missing fields
        if(!source || !amount||!date){
            return res.status(400).json({message:"All fields are required"})
        }
        const newIncome=new Income({
            userId,
            icon,
            source,
            amount,
            date:new Date(date)
        })
        await newIncome.save()
        res.status(200).json(newIncome);
    } catch(error){

        res.status(500).json({message:"Server Error"})
    }
}



exports.getAllIncome = async (req, res) => {
    try {
        const incomes = await Income.find({
            userId: req.user._id
        }).sort({ createdAt: -1 })

        res.status(200).json(incomes)
    } catch (error) {
        console.error("Get income error:", error)
        res.status(500).json({ message: "Server Error" })
    }
}



//dlt income src
exports.deleteIncome=async(req,res)=>{
    try{
        await Income.findByIdAndDelete(req.params.id)
        res.json({message:"Income deleted successfully"})
    } catch(error){
        res.status(500).json({message:"Server Error"})
    }
}



exports.downloadIncomeExcel = async (req, res) => {
    try {
        const userId = req.user._id

        const income = await Income.find({ userId }).sort({ date: -1 })

        const data = income.map(item => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date
        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, "Income")

        const filePath = path.join(__dirname, "..", "income_details.xlsx")

        xlsx.writeFile(wb, filePath)

        return res.download(filePath)

    } catch (error) {
        console.error("DOWNLOAD EXCEL ERROR:", error)
        res.status(500).json({ message: "Server Error" })
    }
}
