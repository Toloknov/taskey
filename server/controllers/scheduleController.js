import Schedule from "../models/Schedule.js";

class ScheduleController {
  async getSchedule(req, res, next) {
    try {
      const { userId } = req.params;
      const schedule = await Schedule.find({ user: userId }).sort({
        order: 1,
      });
      res.json(schedule);
    } catch (e) {
      next(e);
    }
  }

  async addSchedule(req, res, next) {
    try {
      const { color, userId, text, time } = req.body;
      console.log(color);
      const scheduleOne = await Schedule.findOne({ user: userId })
        .sort({ order: -1 })
        .limit(1);
      const schedule = await Schedule.create({
        user: userId,
        bg: color,
        text,
        time,
        order: scheduleOne ? scheduleOne.order + 1 : 1,
      });
      res.json(schedule);
    } catch (e) {
      next(e);
    }
  }
  async removeSchedule(req, res, next) {
    try {
      const { id, userId } = req.query;
      await Schedule.deleteOne({
        user: userId,
        _id: id,
      });
      res.json("Success remove");
    } catch (e) {
      next(e);
    }
  }
  async updateSchedule(req, res, next) {
    try {
      const { id, userId, color, text, time, currentCard } = req.body;

      if (currentCard) {
        const oldCard = await Schedule.findOne({
          user: userId,
          _id: id,
        });

        await Schedule.updateOne(
          {
            user: userId,
            _id: id,
          },
          { order: currentCard.order }
        );

        await Schedule.updateOne(
          {
            user: userId,
            _id: currentCard._id,
          },
          { order: oldCard.order }
        );
      } else {
        console.log(color, text, time);
        await Schedule.updateOne(
          {
            user: userId,
            _id: id,
          },
          { bg: color, text, time }
        );
      }

      res.json("Success update");
    } catch (e) {
      next(e);
    }
  }
}

export default new ScheduleController();
