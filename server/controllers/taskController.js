import Task from "../models/Task.js";

class TaskController {
  async getTask(req, res, next) {
    try {
      const { userId } = req.params;
      const tasks = await Task.find({ user: userId });
      res.json(tasks);
    } catch (e) {
      next(e);
    }
  }
  async addTask(req, res, next) {
    try {
      const { userId } = req.params;
      const { text, todoTask, dateCompletion } = req.body;
      const tasks = await Task.create({
        user: userId,
        task: text,
        todoTask,
        dateCompletion,
      });
      res.json(tasks);
    } catch (e) {
      next(e);
    }
  }
  async removeTask(req, res, next) {
    try {
      const { id, userId } = req.query;
      await Task.deleteOne({ user: userId, _id: id });
      res.json("remove succuss");
    } catch (e) {
      next(e);
    }
  }
  async updateTask(req, res, next) {
    try {
      const {
        text,
        userId,
        id,
        isCompleted,
        todoTaskName,
        dateCompletion,
        priority,
      } = req.body;

      if (isCompleted !== undefined) {
        console.log("1");
        await Task.updateOne(
          { _id: id, user: userId },
          {
            isCompleted: isCompleted,
            todoTask: isCompleted ? "completed" : todoTaskName,
          }
        );
      }  else {
        await Task.updateOne(
          { _id: id, user: userId },
          {
            task: text,
            todoTask: todoTaskName,
            dateCompletion: dateCompletion,
            priority:priority
          }
        );
      }

      res.json("succuss update task");
    } catch (e) {
      next(e);
    }
  }
}
export default new TaskController();
