import './symbolCard.css';
import React, { memo, useMemo } from 'react';

import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import StockCardHeader from './src/StockCardHeader';
import StockCardPrice from './src/StockCardPrice';
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

  /** useMemo the SVG icons so when passed as props, that component won't get unnecessary re-renders */
  const memoCompanyIcon = useMemo(() => <CompanyIcon />, []);
  const memoIndustryIcon = useMemo(() => <IndustryIcon />, []);
  const memoMarketCapIcon = useMemo(() => <MarketCapIcon />, []);

  const { showCardInfo, activeSymbol } = useAppSelector((state) => state.store);
  const { trend, companyName, industry, marketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );

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
            <ListItem Icon={memoCompanyIcon} label={companyName} />
            <ListItem Icon={memoIndustryIcon} label={industry} />
            <ListItem Icon={memoMarketCapIcon} label={formatCurrency(marketCap)} />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default memo(SymbolCard);
