import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { relative } from "../../sdk/url.ts";
import AddToCartButton from "../../islands/AddToCartButton/vtex.tsx";
import LikeButton from "../../islands/LikeButton.tsx";

interface Props {
  product: Product;
  animateImage?: boolean;
}

const WIDTH = 211;
const HEIGHT = 140;

function HorizontalProductCard({ product, animateImage }: Props) {
  const { url, name, image: images, offers, isVariantOf, productID } = product;
  const description = product.description || isVariantOf?.description;
  const [front] = images ?? [];
  const { listPrice, price, seller } = useOffer(offers);

  const eventParams = {
    items: [
      {
        quantity: 1,
        item_id: productID,
      },
    ],
  };

  return (
    <div class="flex justify-center lg:p-8">
      <div class="card w-full bg-base-100 shadow-xl">
        <div class="card-body">
          <LikeButton productId={productID} />
          <div class="flex">
            <a
              href={url && relative(url)}
              aria-label="view product"
              class="w-1/4 md:w-full lg:w-1/4 xl:w-1/4 mb-4 lg:mb-0 group"
            >
              <div class="card-image overflow-hidden">
                <Image
                  src={front.url!}
                  alt={front.alternateName}
                  width={WIDTH}
                  height={HEIGHT}
                  class={`bg-base-100 col-span-full row-span-full rounded w-full ${
                    animateImage
                      ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
                      : ""
                  }`}
                  sizes="(max-width: 640px) 50vw, 20vw"
                  preload={true}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </a>
            <div class="flex flex-col justify-around w-3/4 px-3 md:w-full md:flex-row">
              <div class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                <h2
                  class="card-title"
                  dangerouslySetInnerHTML={{ __html: name ?? "" }}
                />
                <p
                  class="text-base truncate"
                  dangerouslySetInnerHTML={{ __html: description ?? "" }}
                />
              </div>
              <div class="w-full md:w-1/2 lg:w-1/4 xl:w-1/4">
                <div class="flex flex-col mb-1">
                  <span class="text-base line-through">
                    {formatPrice(price, offers?.priceCurrency)}
                  </span>
                  <h3 class="text-xl font-bold">
                    {formatPrice(listPrice, offers?.priceCurrency)}
                  </h3>
                </div>
                <div class="mt-4">
                  <AddToCartButton
                    seller={seller!}
                    productID={productID}
                    eventParams={eventParams}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorizontalProductCard;
