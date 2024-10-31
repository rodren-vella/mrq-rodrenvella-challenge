import { memo } from 'react';
import './stockCardPrice.css';

type StockCardPriceProps = {
  currency: string;
  price: number;
};

const StockCardPrice = ({ currency, price }: StockCardPriceProps) => {
  return (
    <div className="stockCardPrice">
      <p className="stockCardPrice__label">Price:</p>
      <p className="stockCardPrice__price">
        {price ? (currency ? currency + price : price) : '--'}
      </p>
    </div>
  );
};

export default memo(StockCardPrice);
