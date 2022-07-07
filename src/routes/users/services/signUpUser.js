/* eslint-disable import/no-unresolved */
import { projectCollectionRef, userCollectionRef } from '../../../models/collectionRefs';
import { appLogger } from '../../../helpers/logger';

export default async (req, res) => {
  try {
    const { body, ownerId } = req;
    appLogger({ message: 'Initializing User' });

    const userDocRef = userCollectionRef.doc(ownerId);
    const projectRef = projectCollectionRef.doc(ownerId);

    await userDocRef.set({
      ownerId,
      ...body,
    }, { merge: true });

    await projectRef.set({
      name: 'My Project',
    });

    await projectRef.collection('todoLists').add({
      name: 'My First Todo',
    });

    const project = await projectRef.get();
    const todoListsSnapshot = await projectRef.collection('todoLists').get();

    const todoListsResponse = [];
    todoListsSnapshot.forEach((doc) => {
      todoListsResponse.push(doc.data());
    });

    const responseObj = {
      project: {
        name: project.name,
        todoLists: todoListsResponse,
      },
    };

    res.send(responseObj);
  } catch (error) {
    console.log(error);

    res.status(500).send(error.message);
  }
};
