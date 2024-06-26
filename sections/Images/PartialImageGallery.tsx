import { Picture } from "apps/website/components/Picture.tsx";
import Header from "../../components/ui/SectionHeader.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export interface Image {
  src: ImageWidget;
  alt: string;
  href: string;
}

export interface Props {
  title?: string;
  description?: string;
  /**
   * @minItems 3
   */
  images?: Image[];
  btnText?: string;
  line?: number;
}

function ImageItem(props: Image) {
  const { src, alt } = props;

  return (
    <a href={props.href} class="overflow-hidden">
      <Picture>
        <img
          width={150}
          class="w-full h-full object-cover"
          src={src}
          alt={alt}
          title={alt}
          decoding="async"
          loading="lazy"
        />
      </Picture>
    </a>
  );
}

export default function PartialImageGallery(props: Props) {
  const { title, description, images, btnText, line = 1 } = props;
  const total = images?.length ? images?.length / line : 3;

  return (
    <section class="container px-4 py-8 flex flex-col gap-8 lg:gap-10 lg:py-10 lg:px-0">
      <Header
        title={title}
        description={description}
        alignment="center"
        fontSize="Normal"
      />
      <ul class={`grid grid-cols-3 grid-rows-${total} gap-4 list-none`}>
        {images?.slice(0, line * 3)?.map((image) => (
          <li>
            <ImageItem {...image} />
          </li>
        ))}
      </ul>
      {btnText && line < total && (
        <div class="flex justify-center col-span-full">
          <button
            class="btn btn-secondary cursor-pointer"
            {...usePartialSection<typeof PartialImageGallery>({
              props: { line: line + 1 },
            })}
          >
            {btnText}
          </button>
        </div>
      )}
    </section>
  );
}
