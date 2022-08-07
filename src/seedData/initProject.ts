import { v4 as uuidv4 } from 'uuid';
import moment, {Moment} from 'moment'
import { IProject, ITimestamps } from '../types/projectTypes'

export const placeholder = {}

export const defaultProject = (ownerId: string): IProject => {
    const rightNow: Moment = moment.utc()

    const timestamps: ITimestamps = {
        createdAt: rightNow,
        updatedAt: rightNow
    }
    return {
        id: uuidv4(),
        name: 'My First Project',
        ownerId,
        timestamps,
        taskList: {
            id: uuidv4(),
            name: 'My First Task List',
            timestamps,
            taskItems: [
                {
                    id: uuidv4(),
                    title: 'My First Task',
                    description: 'Add your description here!',
                    dueDate: null,
                    timestamps,
                }
            ]
        }
    }
}