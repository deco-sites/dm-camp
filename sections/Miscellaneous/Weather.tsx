import { Temperature } from "apps/weather/loaders/temperature.ts";

interface Props {
  temperature: Temperature | null;
}

export default function Weather({
  temperature,
}: Props) {
  if (!temperature?.celsius) return null;

  return (
    <div>
      Temperatura atual: {temperature.celsius}
    </div>
  );
}
