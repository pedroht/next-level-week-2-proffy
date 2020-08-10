import { Request, Response, response } from "express";

import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(req: Request, res: Response) {
    const filters = req.query;

    const week_day = filters.week_day as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    if (!week_day || !subject || !time) {
      return response
        .json({
          error: "Missing filters to search classes",
        })
        .status(400);
    }

    const timeInMinutes = convertHourToMinutes(time);

    try {
      const classes = await db("classes")
        .whereExists(function () {
          this.select("class_schedule.*")
            .from("class_schedule")
            .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
            .whereRaw("`class_schedule`.`week_day` = ??", [Number(week_day)])
            .whereRaw("`class_schedule`.`from` <= ??", [timeInMinutes])
            .whereRaw("`class_schedule`.`to` > ??", [timeInMinutes]);
        })
        .where("classes.subject", "=", subject)
        .join("users", "classes.user_id", "=", "users.id")
        .select(["classes.*", "users.*"]);

      return res.json(classes);
    } catch (error) {
      return res.json({ error: error.message }).status(400);
    }
  }

  async create(req: Request, res: Response) {
    const { cost, schedule, subject } = req.body;

    const user_id = req.userId as Number;

    const trx = await db.transaction();

    try {
      let class_id = await trx("classes").where("user_id", user_id);

      if (subject) {
        if (class_id[0].subject_id !== subject) {
          await trx("classes").where("user_id", user_id).del();

          class_id = await trx("classes").insert({
            user_id,
            subject_id: subject,
            cost: Number(cost),
          });
        }
      }

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      await trx("class_schedule").insert(classSchedule);

      await trx.commit();

      return;
    } catch (error) {
      await trx.rollback();

      return res.json({ error: error.message }).status(400);
    }

    return res.json();
  }
}
