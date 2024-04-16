import { useSignal } from "@preact/signals";
import { useCallback, useEffect } from "preact/hooks";
import { toast } from "react-toastify";
import { invoke } from "../runtime.ts";
import Icon from "../components/ui/Icon.tsx";
import { sendEvent } from "../sdk/analytics.tsx";

interface Props {
  productId: string;
}

export default function LikeButton({ productId }: Props) {
  const count = useSignal(0);
  const liked = useSignal(false);

  const getLikes = async () => {
    const data = await invoke["deco-sites/dm-camp"].loaders.likesByProduct({
      productId,
    });
    count.value = data.product;
  };

  useEffect(() => {
    setInterval(getLikes, 1000 * 30);
  }, []);

  const sendLike = useCallback(async () => {
    const data = await invoke["deco-sites/dm-camp"].actions.sendLike({
      productId,
    });

    if (data) {
      // total return total votes on site?
      // count.value = data.total;
      count.value = count.value + 1;
      liked.value = true;

      toast.success("Voto registrado! 👍", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      sendEvent({
        name: "post_score",
        params: {
          productId,
          score: data.total,
        },
      });
    }
  }, []);

  return (
    <div>
      <div class="indicator">
        <span class="indicator-item badge badge-secondary">{count}</span>
        {!liked.value && (
          <Icon id="MoodSmile" size={24} strokeWidth={2} onClick={sendLike} />
        )}
        {liked.value && <Icon id="MoodCheck" size={24} strokeWidth={2} />}
      </div>
    </div>
  );
}
