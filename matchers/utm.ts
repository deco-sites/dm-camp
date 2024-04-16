import { MatchContext } from "deco/blocks/matcher.ts";

type UtmType =
  | "utm_source"
  | "utm_medium"
  | "utm_campaign"
  | "utm_term"
  | "utm_content";

interface Utm {
  type: UtmType;
  value: string;
}

export interface Props {
  utms: Utm[];
}

const MatchUtm = (
  props: Props,
  { request }: MatchContext,
) => {
  let matches = true;
  const url = new URL(request.url);

  props.utms.forEach((utm) => {
    const param = url.searchParams.get(utm.type);
    if (!param) {
      matches = false;
      return;
    }

    matches = matches && utm.value === param;
  });

  return matches;
};

export default MatchUtm;
