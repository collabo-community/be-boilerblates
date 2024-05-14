const Demo = require('../models/demo.model');

/* eslint-disable no-extra-semi */ // Note: only cjs api template needs this particular eslint comment

const getDemoItemsService = async () => {
  const query = await Demo.find().select('_id name age').exec();
  return query;
};

const createDemoItemService = async function(requestBody) {
  const demo = new Demo({
    name: requestBody.name,
    age: requestBody.age,
  });
  const save = await demo.save();
  return save;
};


const getOneDemoItemService = async function(paramsId) {
  const query = Demo.findById(paramsId).select('_id name age').exec();
  return query;
};

const deleteDemoItemService = async function(paramsId) {
  const query = await Demo.deleteOne({ _id: paramsId }).exec();
  return query;
};

const updateOneDemoItemPropertyValueService = async function(paramsId, requestBody) {
  const updateOps = {};
  for (const ops of requestBody) {
    updateOps[ops.propName] = ops.value;
  }
  const query = await Demo.updateOne({ _id: paramsId }, { $set: updateOps }).exec();
  return query;
};

const updateDemoItemPropertyValuesService = async function(paramsId, requestBody) {
  const resetItem = {
    name: requestBody.name,
    age: requestBody.age,
  };
  const query = await Demo.findByIdAndUpdate(paramsId, { $set: resetItem }, { new: true }).exec();
  return query;
};

 module.exports = {
  getDemoItemsService,
  createDemoItemService,
  getOneDemoItemService,
  deleteDemoItemService,
  updateOneDemoItemPropertyValueService,
  updateDemoItemPropertyValuesService,
 };
