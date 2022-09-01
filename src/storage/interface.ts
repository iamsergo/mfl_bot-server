import { TgUser } from "../bot/types";

export interface IStorage {
  updateUser(user: TgUser): Promise<void>
}
