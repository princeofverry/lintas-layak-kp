const mongoose = require('mongoose');
const validator = require('validator');

const reportSchema = new mongoose.Schema({
  email: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  address: { type: String, required: true },
  fileUrl: { type: String, required: true },
  uniqueCode: { type: String, required: true, unique: true },
  status: { type: String, default: "" },
  stage: { type: String, default: "" },
  priority: { type: String, default: "" },
  action: { type: String, default: "" },
  responsible: { type: String, default: "" },
  estimate: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
}, { collection: "ImageDetails" });

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
