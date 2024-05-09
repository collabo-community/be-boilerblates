const Demo = require('../models/demo.model');

/* eslint-disable no-extra-semi */ // Note: only cjs api template needs this particular eslint comment

exports.getDemoItemsService = async () => {
  const query = await Demo.find().select('_id name age').exec();
  return query;
};

exports.createDemoItemService = async (requestBody) => {
  const demo = new Demo({
    name: requestBody.name,
    age: requestBody.age,
  });
  const save = await demo.save();
  return save;
};


exports.getOneDemoItemService = async (paramsId) => {
  const query = Demo.findById(paramsId).select('_id name age').exec();
  return query;
};

exports.deleteDemoItemService = async (paramsId) => {
  const query = await Demo.deleteOne({ _id: paramsId }).exec();
  return query;
};

exports.updateOneDemoItemPropertyValueService = async (paramsId, requestBody) => {
  const updateOps = {};
  for (const ops of requestBody) {
    updateOps[ops.propName] = ops.value;
  }
  const query = await Demo.updateOne({ _id: paramsId }, { $set: updateOps }).exec();
  return query;
};

exports.updateDemoItemPropertyValuesService = async (paramsId, requestBody) => {
  const resetItem = {
    name: requestBody.name,
    age: requestBody.age,
  };
  const query = await Demo.findByIdAndUpdate(paramsId, { $set: resetItem }, { new: true }).exec();
  return query;
};

// module.exports = {
//   getDemoItemsService,
//   createDemoItemService,
//   getOneDemoItemService,
//   deleteDemoItemService,
//   updateOneDemoItemPropertyValueService,
//   updateDemoItemPropertyValuesService,
// };
