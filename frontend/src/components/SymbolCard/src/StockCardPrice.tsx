import { memo } from 'react';
import './stockCardPrice.css';
import { PriceSymbol } from '@/lib/types/stockTypes';

type StockCardPriceProps = {
  activeSymbol: PriceSymbol;
  price: number;
};

const StockCardPrice = ({ activeSymbol, price }: StockCardPriceProps) => {
  return (
    <div className="stockCardPrice">
      <p className="stockCardPrice__label">Price:</p>
      <p className="stockCardPrice__price">
        {price ? (activeSymbol ? activeSymbol + price : price) : '--'}
      </p>
    </div>
  );
};

export default memo(StockCardPrice);
