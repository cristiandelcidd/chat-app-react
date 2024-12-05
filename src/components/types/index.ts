export interface MessageType {
  avatar: string;
  createdAt: number;
  id: string;
  name: string;
  text: string;
  uid: string;
}

export interface SendMessageProps {
  scroll: React.RefObject<HTMLElement>;
}
