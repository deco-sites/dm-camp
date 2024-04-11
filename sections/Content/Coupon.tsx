export interface Props {
  code?: string;
  description?: string;
}

export default function Coupon(props: Props) {
  const {
    code = "couponCode",
    description = "describe the benefits of the coupon here",
  } = props;

  return (
    <div>
      <p>{code}</p>
      <p>{description}</p>
    </div>
  );
}
