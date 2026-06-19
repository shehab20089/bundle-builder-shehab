import { formatCurrency } from "../utils/formatters";

type ProductPriceProps = {
  price: number;
  compareAt?: number;
};

export function ProductPrice({ price, compareAt }: ProductPriceProps) {
  return (
    <div className="text-right leading-none">
      {price > 0 && compareAt && compareAt > price ? (
        <div className="text-bundle-danger mb-[3px] text-base leading-none line-through">
          {formatCurrency(compareAt)}
        </div>
      ) : null}
      <div className="text-bundle-price text-base leading-none">
        {price === 0 ? "FREE" : formatCurrency(price)}
      </div>
    </div>
  );
}
