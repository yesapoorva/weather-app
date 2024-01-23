import mongoose from 'mongoose';

const transactionHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  queryTime: {
    type: Date,
    default: Date.now,
  },
});

const TransactionHistory = mongoose.model('TransactionHistory', transactionHistorySchema);

export default TransactionHistory;