export enum EStatus {
  PLANNING = "Planning",
  IN_PROGRESS = "In progress",
  READY_FOR_TESTING = "Ready for testing",
  COMPLETED = "Completed",
  CANCELED = "Canceled",
}

export interface IComponent {
  id: string;
  name: string;
  phase: EStatus;
  spentTime: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  estimatedTime: number;
  deletedAt: string | null;
}
