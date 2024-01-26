const mongoose = require('mongoose');

const SubTaskSchema = new mongoose.Schema({
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  status: { type: Number, enum: [0, 1] },
  created_at: { type: Date, default: Date.now },
  updated_at: Date,
  deleted_at: Date
});

const SubTask = mongoose.model('SubTask', SubTaskSchema);

module.exports = SubTask;
