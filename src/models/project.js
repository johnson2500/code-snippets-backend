// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';
import Account from './accounts';

export default class Project extends Account {
  constructor(ownerId, projectId) {
    super(ownerId);
    this.projectId = projectId;
    this.projectCollectionName = 'projects';
    this.projectRef = getFirestore().collection(this.projectCollectionName);
  }

  getProjectRef() {
    return this.getAccountRef(this.ownerId).collection(this.projectCollectionName);
  }

  getFullProjectRef() {
    return this.getProjectRef().doc(this.projectId);
  }

  async addProject(data) {
    return this.getProjectRef().add(data);
  }

  async getProject() {
    return this.getProjectRef().doc(this.projectId).get();
  }

  async getProjects() {
    const projectsSnapshot = await this.getAccountRef()
      .collection(this.projectCollectionName).get();
    const projects = [];
    projectsSnapshot.forEach((projectDoc) => {
      const projectId = projectDoc.id;
      projects.push({
        id: projectId,
        ...projectDoc.data(),
      });
    });

    return projects;
  }
}
