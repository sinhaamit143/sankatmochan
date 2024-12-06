const createError = require('http-errors')
const Model = require('../Models/contact.model')
const mongoose = require('mongoose')
const ModelName =  'Role'

module.exports = {

  create: async (req, res, next) => {
    try {
      const data = req.body;
      // Validate schedule_date
      if (!data.schedule_date) {
        throw createError.BadRequest('Schedule date is required');
      }
      data.created_by = req.user ? req.user._id : 'unauth';
      data.updated_by = req.user ? req.user._id : 'unauth';
      data.created_at = Date.now();
      const newData = new Model(data);
      const result = await newData.save();
      res.json(newData);
      res.json(result);
      return
    } catch (error) {
      next(error)
    }
  },
  get: async (req, res, next) => {
    try {
      const { id } = req.params
      if (!id) {
        throw createError.BadRequest('Invalid Parameters')
      }
      const result = await Model.findById({ _id: mongoose.Types.ObjectId(id) })
      if (!result) {
        throw createError.NotFound(`No ${ModelName} Found`)
      }
      res.send({
        success: true, data: result,
      })
      return
    } catch (error) {
      next(error)
    }
  },
  list: async (req, res, next) => {
    try {
      const { name, page, limit, sort, schedule_date } = req.query;
      const _page = page ? parseInt(page) : 1;
      const _limit = limit ? parseInt(limit) : 20;
      const _skip = (_page - 1) * _limit;
      const _sort = sort ? sort : '+name';
      const query = {};
      if (name) {
        query.name = new RegExp(name, 'i');
      }
      if (schedule_date) {
        query.schedule_date = { $eq: new Date(schedule_date) };
      }
      query.is_active = true;
      const result = await Model.aggregate([
        {
          $match: query
        },
        {
          $skip: _skip
        },
        {
          $limit: _limit
        }
      ]);
  
      res.json(result);
      return;
    } catch (error) {
      next(error);
    }
  },
  
  update: async (req, res, next) => {
    try {
      const { id } = req.params
      const data = req.body

      if (!id) {
        throw createError.BadRequest('Invalid Parameters')
      }
      if (!data) {
        throw createError.BadRequest('Invalid Parameters')
      }
      if (!data.schedule_date) {
        throw createError.BadRequest('Schedule date is required');
      }
      data.updated_at = Date.now()
      const result = await Model.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: data })
      res.json(result)
      return
    } catch (error) {
      next(error)
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params
      if (!id) {
        throw createError.BadRequest('Invalid Parameters')
      }
      const deleted_at = Date.now()
      const result = await Model.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: { is_active: false, deleted_at } })
      res.json(result)
      return
    } catch (error) {
      next(error)
    }
  },
  restore: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw createError.BadRequest('Invalid Parameters');
      }
      const dataToBeRestored = await Model.findOne({ _id: mongoose.Types.ObjectId(id), is_active: false }).lean();
      if (!dataToBeRestored) {
        throw createError.NotFound(`${ModelName} Not Found or Already Active`);
      }
      const restored_at = Date.now();
      const result = await Model.updateOne(
        { _id: mongoose.Types.ObjectId(id) },
        { $set: { is_active: true, restored_at } }
      );
      res.json({ success: true, message: `${ModelName} restored successfully`, result });
      return;
    } catch (error) {
      next(error);
    }
  },
  

}
