const SubTask = require('../Models/subTaskModel');

// Controller to create a subtask
exports.createSubTask = async (req, res) => {
  try {
    const { task_id } = req.body;
    const subTask = await SubTask.create({ task_id, status: 0 });
    res.status(201).json({ success: true, message: 'Subtask created successfully', subTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to update a subtask
exports.updateSubTask = async (req, res) => {
  try {
    const { status } = req.body;
    const subTaskId = req.params.subTaskId;
    const updatedSubTask = await SubTask.findOneAndUpdate(
      { _id: subTaskId },
      { status, updated_at: Date.now() },
      { new: true }
    );

    if (!updatedSubTask) {
      return res.status(404).json({ error: 'Subtask not found or unauthorized' });
    }

    res.status(200).json({ success: true, message: 'Subtask updated successfully', updatedSubTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to delete a subtask (soft deletion)
exports.deleteSubTask = async (req, res) => {
  try {
    const subTaskId = req.params.subTaskId;
    const deletedSubTask = await SubTask.findOneAndUpdate(
      { _id: subTaskId },
      { deleted_at: Date.now() },
      { new: true }
    );

    if (!deletedSubTask) {
      return res.status(404).json({ error: 'Subtask not found or unauthorized' });
    }

    res.status(200).json({ success: true, message: 'Subtask deleted successfully', deletedSubTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
