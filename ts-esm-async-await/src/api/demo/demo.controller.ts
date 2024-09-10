import { NextFunction, Request, Response } from 'express';
import {
  getDemoItemsService,
  createDemoItemService,
  getOneDemoItemService,
  deleteDemoItemService,
  updateOneDemoItemPropertyValueService,
  updateDemoItemPropertyValuesService,
} from '../services/demo.service';
import { success } from '../../lib/helpers';

const routeName = 'demo';
const item = `${routeName}-item`;

let response: { [key: string]: unknown } = {};

export const getDemoItemsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await getDemoItemsService();
    response = {
      count: docs.length,
      items: docs.map(doc => {
        return {
          _id: doc._id,
          name: doc.name,
          age: doc.age,
          request: {
            type: 'GET',
            url: `http://localhost:3000/${routeName}/${doc._id}`
          }
        }
      })
    };
    success(`GET request successful!`);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

export const createDemoItemController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await createDemoItemService(req.body);
    response = {
      message: `${item} created successfully!`,
      newItem: {
        _id: doc._id,
        name: doc.name,
        age: doc.age,
        request: {
          type: 'GET',
          url: `http://localhost:3000/${routeName}/${doc._id}`,
        },
      },
    }
    success(`${item} CREATED successfully!`);
    return res.status(201).json(response);  
  } catch (err) {
    next(err);
  }
}

export const getOneDemoItemController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await getOneDemoItemService(req.params.demoId);
    response = {
      _id: doc._id,
      name: doc.name,
      age: doc.age,
      request: {
        type: 'GET',
        description: `Url link to all ${item}s`,
        url: `http://localhost:3000/${routeName}/`,
      },
    }
    success(`GET request successful!`);
    return res.status(200).json(response);  
  } catch (err) {
    next(err);
  }
}

export const deleteDemoItemController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteDemoItemService(req.params.demoId);
    response = {
      message: `${item} deleted successfully!`,
      request: {
        type: 'POST',
        description: 'Url link to make post request to',
        url: `http://localhost:3000/${item}/`,
        body: {
          name: 'String',
          age: 'Number',
        },
      },
    }
    success(`${item} DELETED successfully!`);
    return res.status(200).json(response); 
  } catch (err) {
    next(err);
  }
};

export const updateOneDemoItemPropertyValueController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.demoId;
    await updateOneDemoItemPropertyValueService(id, req.body);
    response = {
      message: 'Patch request successful!',
      request: {
        type: 'GET',
        description: `Url link to updated ${item}`,
        url: `http://localhost:3000/${routeName}/${id}`,
      },
    };
    success(`PATCH request for ID ${id} successful!`);
    return res.status(200).json(response); 
  } catch (err) {
    next(err);
  }
};

export const updateDemoItemPropertyValuesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    await updateDemoItemPropertyValuesService(id, req.body);
    response = {
      message: `Put request successful!`,
      request: {
        type: 'GET',
        description: `Url link to updated ${item}`,
        url: `http://localhost:3000/${routeName}/${id}`,
      },
    };
    success(`PUT request for ID ${id} successful!`);
    return res.status(200).json(response); 
  } catch (err) {
    next(err);
  }
};
