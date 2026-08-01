interface Props {
  message: string;
}

export function SuccessMessage({ message }: Props) {
  return <p className="small-text text-green-400">{message}</p>;
}
