export interface Props {
  productId: string;
}

export interface LikeResponse {
  total: number;
  product: number;
}

export default async function sendLike(
  props: Props,
  _req: Request,
  _ctx: unknown,
): Promise<LikeResponse | null> {
  const { productId } = props;

  const resp = await fetch("https://camp-api.deco.cx/event", {
    method: "POST",
    headers: {
      "x-api-key": "dm-camp",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  const data = await resp.json();

  if (resp.ok) {
    return data;
  }

  return null;
}
