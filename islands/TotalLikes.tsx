import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { invoke } from "../runtime.ts";
import Icon from "../components/ui/Icon.tsx";

export default function likesTotal() {
  const count = useSignal(0);

  const getLikes = async () => {
    const data = await invoke["deco-sites/dm-camp"].loaders.likesTotal();
    count.value = data?.total;
  };

  useEffect(() => {
    setInterval(getLikes, 1000 * 30);
  }, []);

  return (
    <div class="indicator">
      <span class="indicator-item badge badge-secondary">{count}</span>
      <Icon id="Friends" size={24} strokeWidth={1.5} class="z-10" />
    </div>
  );
}
