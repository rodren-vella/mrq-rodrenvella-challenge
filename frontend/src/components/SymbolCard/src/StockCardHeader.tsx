import { memo } from 'react';
import { Trend } from '@/lib/types/stockTypes';
import './stockCardHeader.css';

type StockCardHeaderProps = {
  id: string;
  trend: Trend;
};

const StockCardHeader = ({ id, trend }: StockCardHeaderProps) => {
  return (
    <div className="stockCardHeader">
      <h4>{id}</h4>
      {trend && (
        <span className={'stockCardHeader__trend stockCardHeader__trend--' + trend?.toLowerCase()}>
          {/**/}
        </span>
      )}
    </div>
  );
};

export default memo(StockCardHeader);
