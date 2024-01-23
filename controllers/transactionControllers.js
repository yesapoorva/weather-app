import TransactionHistory from "../models/transactionHistoryModel.js";

const transactionHistory = async (req, res) => {
try{  
    const allTransactionHistory = await TransactionHistory.find();

    res.json(allTransactionHistory);
}catch(err) {
    console.log("something went wrong")
  }
};

export default transactionHistory;