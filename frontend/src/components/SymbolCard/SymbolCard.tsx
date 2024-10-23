import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import TrendIcon from '../TrendIcon/TrendIcon';
import FormattedPrice from '../FromattedPrice/FromattedPrice';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard = ({ id, onClick, price }: SymbolCardProps) => {
  let formatter = Intl.NumberFormat('en', { notation: 'compact' });
  const { trend, companyName, industry, marketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const handleOnClick = () => {
    onClick(id);
  };
  return (
    <div onClick={handleOnClick} className="symbolCard">
      <div className="symbolCard__header">
        {id} <TrendIcon trend={trend} />
      </div>
      <FormattedPrice priceFromatted={price ? formatter.format(price) : '-'} />
      <ListItem Icon={<CompanyIcon />} label={companyName} spacing="space-between" />
      <ListItem Icon={<IndustryIcon />} label={industry} spacing="space-between" />
      <ListItem
        Icon={<MarketCapIcon />}
        label={'$' + formatter.format(marketCap)}
        spacing="space-between"
      />
    </div>
  );
};
export default SymbolCard;
