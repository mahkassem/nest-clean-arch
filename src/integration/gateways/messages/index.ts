export interface SocketMessage {
  from: MessageSender;
  action: string;
}

export enum MessageSender {
  ANY = 'ANY',
}
