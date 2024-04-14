export { default } from "../../components/product/HorizontalProductShelf.tsx";

export function LoadingFallback() {
  return (
    <div style={{ height: "716px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}

export function ErrorFallback() {
  return (
    <div style={{ height: "716px" }} class="flex justify-center items-center">
      <span>Erro</span>
    </div>
  );
}
