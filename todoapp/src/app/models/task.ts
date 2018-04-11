import { Subtask } from './subtask';
export interface Task {
    title: string;
    status: string;
    due_date: string;
    subtasks: Array<Subtask>;
}
