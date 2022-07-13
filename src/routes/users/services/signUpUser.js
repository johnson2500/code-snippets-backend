/* eslint-disable import/no-unresolved */
import { userCollectionRef } from '../../../models/collectionRefs';
import { appLogger } from '../../../helpers/logger';
import Account from '../../../models/accounts';
import Project from '../../../models/project';

export default async (req, res) => {
  try {
    const { body, ownerId } = req;
    const account = new Account(ownerId);
    const project = new Project(ownerId);

    appLogger({ message: 'Initializing User' });

    const userDocRef = userCollectionRef.doc(ownerId);
    const accountRef = account.getAccountRef(ownerId);
    const projectRef = project.getUserProjectRef(ownerId);

    await userDocRef.set({
      ownerId,
      ...body,
    }, { merge: true });

    await accountRef.set({
      name: 'My Account',
    });

    await projectRef.collection('todoLists').add({
      name: 'My First Todo',
    });

    const projectData = await projectRef.get();
    const todoListsSnapshot = await projectRef.collection('todoLists').get();

    const todoListsResponse = [];
    todoListsSnapshot.forEach((doc) => {
      todoListsResponse.push(doc.data());
    });

    const responseObj = {
      project: {
        name: projectData.name,
        todoLists: todoListsResponse,
      },
    };

    res.send(responseObj);
  } catch (error) {
    console.log(error);

    res.status(500).send(error.message);
  }
};
