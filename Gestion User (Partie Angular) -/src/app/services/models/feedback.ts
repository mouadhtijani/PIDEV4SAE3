import { User } from "./user";

export interface Feedback {
    description?: string;
    FeedbackId?: number;
    creationDate?: any;
    user?: User;
  }