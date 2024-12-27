import MenuContentHeader from '../../../components/admin/cms/MenuContentHeader';
import Listing from './Listing';

export default function Index({
  items,
  headerTitle,
  emptyMessage,
  newButton,
  deleteUrl,
}) {
  return (
    <div>
      {newButton ? (
        <MenuContentHeader
          title={headerTitle}
          button={{ text: newButton.text || 'New', href: newButton.href }}
        />
      ) : (
        <></>
      )}
      <Listing
        items={items}
        emptyMessage={emptyMessage}
        deleteUrl={deleteUrl}
      />
    </div>
  );
}
