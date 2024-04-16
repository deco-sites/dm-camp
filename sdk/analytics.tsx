import type { AnalyticsEvent } from "apps/commerce/types.ts";

export interface PostScore {
  name?: "post_score";
  params?: {
    productId?: string;
    score?: number;
  };
}

type CustomEvents = PostScore | AnalyticsEvent;

export const sendEvent = <E extends CustomEvents>(event: E) => {
  console.log(JSON.stringify(event, null, 2));
  globalThis.window.DECO.events.dispatch(event);
};
