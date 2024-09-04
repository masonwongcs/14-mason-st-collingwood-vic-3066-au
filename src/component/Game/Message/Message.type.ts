interface MessageProps {
  title: string;
  message?: string;
  onOk?: () => void;
  okText?: string;
  show: boolean;
}

export type { MessageProps };
