const Task = require('../Models/taskModel'); 
const User = require('../Models/userModel');

// Controller to create a task for the logged-in user
exports.createTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const user_id = req.user._id; 
    const task = await Task.create({ title, description, due_date, user_id , status: 'TODO' });
    res.status(201).json({ success: true, message: 'Task created successfully', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateTaskDueDate = async (req, res) => {
  try {
    const { due_date, status } = req.body;
    const taskId = req.params.taskId;
    const user_id = req.user._id; 
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user_id },
      { due_date, status }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }

    res.status(200).json({ success: true, message: 'Task due_date updated successfully', updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllUserTasks = async (req, res) => {
  try {
    const { priority, due_date, page, limit } = req.query;
    const filterCriteria = {};

    if (priority !== undefined) {
      filterCriteria.priority = priority;
    }

    if (due_date !== undefined) {
      filterCriteria.due_date = { $lte: new Date(due_date) };
    }

    const options = {
      page: page || 1,
      limit: limit || 10,
    };

    const userTasks = await Task.paginate(filterCriteria, options);
    res.status(200).json({ success: true, userTasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteTask = async (req, res) => {
  try{
    const taskId = req.params.taskId;
    const result = await Task.deleteOne({ _id: taskId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  }catch{
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.callTo = async (req, res) => {
  try {
    const accountSid = 'ACcdc75558a273591778aa7fb8e2cbc210';
    const authToken = '9841b548958cc01b2527445f5e994681';
    const client = require('twilio')(accountSid, authToken);
    const tasks = await Task.find({status:'TODO'}).sort({priority:1})
    console.log(tasks);
    for(const task of tasks){
      const user = await User.findById(task.user_id);
      const phone = await user.phone_number;
      
      client.calls
      .create({
         url: 'http://demo.twilio.com/docs/voice.xml',
         to: phone,
         from: '+12512208924'
       })
      .then(call => console.log(call.sid));
    }
    
    res.status(200).json({ success: true, message: 'Called Everyone' });
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
