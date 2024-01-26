const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const TaskSchema = new Schema({
  title: String,
  description: String,
  due_date: Date,
  priority: { type: Number, enum: [0, 1, 2, 3] },
  status: { type: String, enum: ['TODO', 'IN_PROGRESS', 'DONE'], default: 'TODO' },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  deleted_at: Date,
}, { timestamps: true });

// Calculate priority before saving the task
TaskSchema.pre('save', function (next) {
  this.priority = calculatePriority(this.due_date);
  next();
});

// Calculate priority before updating the task
TaskSchema.pre('findOneAndUpdate', function (next) {
  this._update.priority = calculatePriority(this._update.due_date);
  next();
});

// Function to calculate priority based on due date
const calculatePriority = (due_date) => {
  const today = new Date();
  const date = new Date(due_date);
  const diffTime = date - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) return 0;
  else if (diffDays <= 3) return 1;
  else if (diffDays <= 5) return 2;
  else return 3;
};

TaskSchema.plugin(mongoosePaginate);
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
