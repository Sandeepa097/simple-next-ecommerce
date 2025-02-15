import MenuContentHeader from '../../../components/admin/cms/MenuContentHeader';
import Listing from './Listing';
import ListingSearch from './ListingSearch';

export default function Index({
  items,
  headerTitle,
  emptyMessage,
  newButton,
  actionUrl,
  search = false,
  initialSearch = '',
  path = '',
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
      {search && <ListingSearch path={path} initialSearch={initialSearch} />}
      <Listing
        items={items}
        emptyMessage={emptyMessage}
        actionUrl={actionUrl}
      />
    </div>
  );
}
