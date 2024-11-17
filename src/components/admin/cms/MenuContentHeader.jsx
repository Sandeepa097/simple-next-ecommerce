import MenuContentHeaderButton from './MenuContentHeaderButton';
import MenuContentHeaderTitle from './MenuContentHeaderTitle';

export default function MenuContentHeader({ title, button }) {
  return (
    <div
      className={`flex flex-row ${
        button ? 'justify-between' : 'justify-start'
      } items-center`}>
      <MenuContentHeaderTitle title={title} />
      {button ? (
        <MenuContentHeaderButton text={button.text} href={button.href} />
      ) : (
        <></>
      )}
    </div>
  );
}
