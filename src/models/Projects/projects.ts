import { getFirestore } from 'firebase-admin/firestore';
import { IProject } from './projectTypes'
import Account from '../Accounts/accounts';

export default class Projects extends Account {
  ownerId: string;
  projectId: string;
  projectCollectionName: string;
  projectRef: FirebaseFirestore.CollectionReference;

  constructor(ownerId: string, projectId:string = null) {
    super(ownerId);
    this.projectId = projectId;
    this.projectCollectionName = 'projects';
    this.projectRef = getFirestore().collection(this.projectCollectionName);
  }

  getProjectRef(): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return this.getAccountRef().collection(this.projectCollectionName);
  }

  getFullProjectRef(): FirebaseFirestore.DocumentData {
    return this.getProjectRef().doc(this.projectId);
  }

  // TODO type
  async addProject(data: Partial<IProject>): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>> {
    return this.getProjectRef().add(data);
  }

  async getProject(): Promise<FirebaseFirestore.DocumentData> {
    return this.getProjectRef().doc(this.projectId).get();
  }

  async getProjects(): Promise<IProject[]> {
    const projectsSnapshot: FirebaseFirestore.DocumentData = await this.getAccountRef()
      .collection(this.projectCollectionName).get();

    const projects: IProject[] = [];

    projectsSnapshot.forEach((projectDoc: FirebaseFirestore.DocumentData) => {
      const currentProject: IProject = {
        id: projectDoc.id,
        ...projectDoc.data()
      }
      projects.push(currentProject);
    });

    return projects;
  }
}
