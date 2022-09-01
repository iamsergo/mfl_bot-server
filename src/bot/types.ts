export type TgUser = {
  id: number;
  name: string;
  username: string;
}

export type CommandMessage = {
  chatId: number;
  text: string;
  user: TgUser;
}
