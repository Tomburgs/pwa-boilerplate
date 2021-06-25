import { useRouter } from 'next/router';

const usePageId = (): string => {
  const { query } = useRouter();
  const page = query.page as string || 'home';

  return page;
};

export default usePageId;
