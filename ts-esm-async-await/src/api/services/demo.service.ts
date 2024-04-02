import { badRequestErr, notFoundErr } from '../../lib/errors/Errors';
import { DemoDocument, DemoModel as Demo } from '../models/demo.model';

export const getDemoItemsService = async () => {
  const query = await Demo.find().select('_id name age').exec();
  return query;
}

export const createDemoItemService = async (requestBody: DemoDocument): Promise<DemoDocument> => {
  const demo = new Demo({
    name: requestBody.name,
    age: requestBody.age
  });
  const save = await demo.save();
  return save;
}

export const getOneDemoItemService = async (paramsId: string) => {
  const query = await Demo.findById(paramsId).select('_id name age').exec();
  if(!query){
    notFoundErr('No record found for provided ID');
  }
  return query;
}

export const deleteDemoItemService = async (paramsId: string) => {
  const query = await Demo.deleteOne({ _id: paramsId }).exec();
  if (query.deletedCount < 1){
    notFoundErr('No record found for provided ID to be deleted')
  }
  return query;
}

export const updateOneDemoItemPropertyValueService = async (paramsId: string, requestBody: { propName: string, value: string }[]) => {
  const query = await Demo.findById(paramsId).select('_id name age').exec();
  if(!query){
    notFoundErr('No record found for provided ID');
  }

  for (const ops of requestBody) {
    if(!(ops.propName in query)){
      badRequestErr(`invalid property: ${ops.propName}`);
    }
    query[ops.propName as keyof DemoDocument] = ops.value as never;
  }

  const updatedQuery = await query.save();
  return updatedQuery;
};

export const updateDemoItemPropertyValuesService = async (paramsId: string, requestBody: DemoDocument) => {
  const query = await Demo.findById(paramsId).select('_id name age').exec();
  if(!query){
    notFoundErr('No record found for provided ID');
  }

  query.name = requestBody.name;
  query.age = requestBody.age;

  const updatedQuery = await query.save();
  return updatedQuery;
};
