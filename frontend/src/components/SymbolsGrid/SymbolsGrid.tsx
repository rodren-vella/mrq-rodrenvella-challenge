import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';
import React from 'react';
type SymbolsGridProps = {
  onSymbolClick: (symbolId: string) => void;
};

const SymbolsGrid = ({ onSymbolClick }: SymbolsGridProps) => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const prices = useAppSelector((state) => state.prices);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  return (
    <React.Fragment>
      {stockSymbols.map((id, i) => (
        <SymbolCard price={prices[id]} onClick={onSymbolClick} key={i} id={id} />
      ))}
    </React.Fragment>
  );
};

export default SymbolsGrid;
