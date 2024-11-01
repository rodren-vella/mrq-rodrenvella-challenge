import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import StockCardHeader from './src/StockCardHeader';
import StockCardPrice from './src/StockCardPrice';
import React from 'react';
import { formatCurrency } from '@/utils/priceFormatter';
import { saveActiveSymbol } from '@/store/dashboardOptionsSlice';
import useSymbolCardStyle from '@/hooks/useSymbolCardStyle';

type SymbolCardProps = {
  id: string;
  price: number;
};

type SymbolCardSelectionClassType = '' | 'symbolCard--selected' | 'symbolCard--not-selected';

const SymbolCard = ({ id, price }: SymbolCardProps) => {
  const dispatch = useAppDispatch();

  const { trend, companyName, industry, marketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const { showCardInfo, activeSymbol } = useAppSelector((state) => state.store);
  const handleOnClick = () => {
    dispatch(saveActiveSymbol(id !== activeSymbol ? id : ''));
  };

  /** Assigns the correct className to the symbol card depending if
   * there is a selection, and if so if this actual card is selected or not */
  const symbolCardSelectionClassName = (): SymbolCardSelectionClassType =>
    activeSymbol === ''
      ? ''
      : activeSymbol === id
      ? 'symbolCard--selected'
      : 'symbolCard--not-selected';

  return (
    <div
      onClick={handleOnClick}
      className={`${
        'symbolCard ' + symbolCardSelectionClassName() + ' ' + useSymbolCardStyle(price)
      }`}
    >
      <StockCardHeader id={id} trend={trend} />
      <div className="symbolCard__content">
        <StockCardPrice price={price} />
        {showCardInfo && (
          <React.Fragment>
            <ListItem Icon={<CompanyIcon />} label={companyName} />
            <ListItem Icon={<IndustryIcon />} label={industry} />
            <ListItem Icon={<MarketCapIcon />} label={formatCurrency(marketCap)} />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
export default SymbolCard;
