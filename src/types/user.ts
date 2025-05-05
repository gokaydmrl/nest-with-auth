import { InferInsertModel } from 'drizzle-orm';
import { users } from '../../drizzle/schema';
export type UserSave = InferInsertModel<typeof users>;
