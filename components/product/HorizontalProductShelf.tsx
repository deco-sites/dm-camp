import HorizontalProductCard from "deco-sites/dm-camp/components/product/HorizontalProductCard.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Header from "../../components/ui/SectionHeader.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import type { Product } from "apps/commerce/types.ts";

type Size =
  | "max-w-xl"
  | "max-w-2xl"
  | "max-w-3xl"
  | "max-w-4xl"
  | "max-w-5xl"
  | "max-w-6xl"
  | "max-w-7xl"
  | "max-w-full";

export interface Props {
  products: Product[] | null;
  title?: string;
  description?: string;
  maxSize?: Size;
}

function HorizontalProductShelf(props: Props) {
  const { products, title, description, maxSize = "max-w-full" } = props;

  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      class={`w-full ${maxSize} container py-8 flex flex-col gap-6 lg:py-10`}
    >
      <Header
        title={title || ""}
        description={description || ""}
        fontSize="Large"
        alignment="center"
      />

      <div
        id={id}
        class="grid grid-cols-[48px_1fr_48px] px-0 md:px-5 container"
      >
        <Slider class="carousel carousel-center sm:carousel-end sm:gap-1 row-start-2 row-end-5">
          {products?.map((product, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <HorizontalProductCard product={product} />
            </Slider.Item>
          ))}
        </Slider>

        <>
          <div class="relative block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center">
              <Icon size={24} id="ChevronLeft" strokeWidth={3} class="w-5" />
            </Slider.PrevButton>
          </div>
          <div class="relative block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center">
              <Icon size={24} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        </>

        <SliderJS rootId={id} />
      </div>
    </div>
  );
}

export default HorizontalProductShelf;
