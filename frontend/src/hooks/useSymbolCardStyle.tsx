import { percentageChangeCalc } from '@/utils/percentageCalc';
import { useEffect, useRef, useState } from 'react';

type TrendClassName =
  | ''
  | 'symbolCard--smaller'
  | 'symbolCard--bigger'
  | 'symbolCard--smaller-shakefx'
  | 'symbolCard--bigger-shakefx';

/**
 *
 * Custom hook which compares the new symbol price to the previous one
 *
 * If the new price is bigger than the old it return a className which adds a green glow
 * If the new price is smaller than the old it return a className which adds a red glow
 *
 * If the above, and the change is bigger than 25% it also includes a className which adds a shake effect to the card
 *
 * @param {number} newPrice
 * @returns {TrendClassName} Based on the checks within the custom hook, the correct class fx for the symbol card is returned
 */

const useSymbolCardTrendStyle = (newPrice: number): TrendClassName => {
  const [trend, setTrend] = useState<TrendClassName>(''); // "bigger", "smaller", or null
  const prevPriceRef = useRef<number>(0);

  //Based on how much the price's fluctuation, if it's over 25% this function returns a class which adds a shake effect to the card
  const shakeFxCheck = (
    trendClassPrefix: TrendClassName,
    prevPrice: number,
    newPrice: number
  ): TrendClassName => {
    return percentageChangeCalc(prevPrice, newPrice) > 25
      ? (`${trendClassPrefix}-shakefx` as TrendClassName)
      : trendClassPrefix;
  };

  useEffect(() => {
    const prevPrice = prevPriceRef.current;

    //Check price went up/down and if over 25% change add Shake effect
    if (prevPrice === 0 || prevPrice === undefined) {
    } else if (newPrice > prevPrice) {
      setTrend(`${shakeFxCheck('symbolCard--bigger', prevPrice, newPrice)}`);
    } else if (newPrice < prevPrice) {
      setTrend(`${shakeFxCheck('symbolCard--smaller', prevPrice, newPrice)}`);
    }

    // Store the new price to be used as previous price next time round
    prevPriceRef.current = newPrice;

    // Set a timeout to reset the card trend className after 1.2 seconds
    const trendTimeout = setTimeout(() => {
      prevPrice !== 0 && prevPrice !== undefined && setTrend('');
    }, 1200);

    // Cleanup function to clear the timeout
    return () => clearTimeout(trendTimeout);
  }, [newPrice]);

  return trend;
};

export default useSymbolCardTrendStyle;
