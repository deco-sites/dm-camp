import { FnContext } from "deco/mod.ts";

interface RegisterLikeResponse {
  product: number;
}

interface Props {
  productId: string;
}

const likesByProduct = async (
  props: Props,
  _req: Request,
  _ctx: FnContext,
): Promise<RegisterLikeResponse> => {
  const { productId } = props;

  const response = await fetch(`https://camp-api.deco.cx/event/${productId}`, {
    headers: {
      "x-api-key": "dm-camp",
    },
  });

  if (!response.ok) return { product: 0 };

  const data = await response.json();

  return data;
};

export default likesByProduct;
