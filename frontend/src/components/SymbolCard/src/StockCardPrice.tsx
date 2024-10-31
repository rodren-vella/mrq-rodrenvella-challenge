import { memo } from 'react';
import './stockCardPrice.css';
import { formatCurrency } from '@/utils/priceFormatter';

type StockCardPriceProps = {
  price: number;
};

const StockCardPrice = ({ price }: StockCardPriceProps) => {
  return (
    <div className="stockCardPrice">
      <p className="stockCardPrice__label">Price:</p>
      <p className="stockCardPrice__price">{formatCurrency(price)}</p>
    </div>
  );
};

export default memo(StockCardPrice);
