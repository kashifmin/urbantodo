import { Subtask } from './subtask';
export interface Task {
    id: number;
    title: string;
    status: string;
    due_date: string;
    subtasks: Array<Subtask>;
}
