import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import StockCardHeader from './src/StockCardHeader';
import StockCardPrice from './src/StockCardPrice';
import React from 'react';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard = ({ id, onClick, price }: SymbolCardProps) => {
  const { trend, companyName, industry, marketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const { activeSymbol, showCardInfo } = useAppSelector((state) => state.store);
  const handleOnClick = () => {
    onClick(id);
  };
  return (
    <div onClick={handleOnClick} className="symbolCard">
      <StockCardHeader id={id} trend={trend} />
      <div className="symbolCard__content">
        <StockCardPrice activeSymbol={activeSymbol} price={price} />
        {showCardInfo && (
          <React.Fragment>
            <ListItem Icon={<CompanyIcon />} label={companyName} />
            <ListItem Icon={<IndustryIcon />} label={industry} />
            <ListItem Icon={<MarketCapIcon />} label={marketCap.toString()} />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
export default SymbolCard;
