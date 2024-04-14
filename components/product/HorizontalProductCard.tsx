import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { relative } from "../../sdk/url.ts";

interface Props {
  product: Product;
}

const WIDTH = 211;
const HEIGHT = 140;

function HorizontalProductCard({ product }: Props) {
  const { url, name, image: images, offers, isVariantOf } = product;
  const description = product.description || isVariantOf?.description;
  const [front] = images ?? [];
  const { listPrice, price } = useOffer(offers);

  return (
    <div class="flex justify-center p-8">
      <div class="card w-full bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex">
            <a
              href={url && relative(url)}
              aria-label="view product"
              class="w-full lg:w-1/4 xl:w-1/4 mb-4 lg:mb-0"
            >
              <div class="card-image">
                <Image
                  src={front.url!}
                  alt={front.alternateName}
                  width={WIDTH}
                  height={HEIGHT}
                  class="bg-base-100 col-span-full row-span-full rounded w-full duration-100 transition-scale scale-100 lg:group-hover:scale-125"
                  sizes="(max-width: 640px) 50vw, 20vw"
                  preload={true}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </a>
            <div class="flex flex-col md:flex-row">
              <div class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                <h2
                  class="card-title"
                  dangerouslySetInnerHTML={{ __html: name ?? "" }}
                />
                <p
                  class="text-base"
                  dangerouslySetInnerHTML={{ __html: description ?? "" }}
                />
              </div>
              <div class="w-full md:w-1/2 lg:w-1/4 xl:w-1/4">
                <div class="flex items-center mb-1">
                  <h3 class="text-xl font-bold">
                    {formatPrice(listPrice, offers?.priceCurrency)}
                  </h3>
                  <span class="text-base line-through ml-2">
                    {formatPrice(price, offers?.priceCurrency)}
                  </span>
                </div>
                <div class="mt-4">
                  <button class="btn btn-primary">Adicionar ao Carrinho</button>
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
