import { RootState } from 'stores';
import { PageDetails } from 'stores/pages';
import { useSelector } from 'react-redux';
import { usePageId } from 'hooks/page';

const usePageDetails = (): PageDetails => {
  const pageId = usePageId();
  const {
    pages: { [pageId]: pageDetailsContent },
    schema: { [pageId]: pageDetailsSchema }
  } = useSelector((state: RootState) => state.pages);

  return pageDetailsContent || pageDetailsSchema || {};
};

export default usePageDetails;
