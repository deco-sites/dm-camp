import { FnContext } from "deco/mod.ts";

export interface LikesResponse {
  total: number;
}

const likesTotal = async (
  _props: unknown,
  _req: Request,
  _ctx: FnContext,
): Promise<LikesResponse> => {
  const response = await fetch("https://camp-api.deco.cx/events", {
    headers: {
      "x-api-key": "dm-camp",
    },
  });

  if (!response.ok) return { total: 0 };

  const likes = await response.json();

  return likes;
};

export default likesTotal;
