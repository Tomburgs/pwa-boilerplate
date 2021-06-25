import getBuildManifestPages from './getBuildManifestPages';

const getRequestedPageFromURL = (url: string): string | undefined => {
  const { pathname } = new URL(url);
  const manifest = getBuildManifestPages();

  /*
     * If URL is not dynamic.
     */
  if (manifest.indexOf(pathname) > -1) {
    return pathname;
  }

  /*
     * The URL might be dynamic,
     * try to find page by going through
     * manifest page paths.
     */
  const requestedPage = pathname.split('/');

  return manifest.find(
    page => {
      const manifestPage = page.split('/');

      if (manifestPage.length !== requestedPage.length) {
        return false;
      }

      return manifestPage.every(
        (manifestPathPiece, index) => {
          const requestedPathPiece = requestedPage[index];

          return (
            manifestPathPiece === requestedPathPiece
                        || (manifestPathPiece.startsWith('[') && manifestPathPiece.endsWith(']'))
          );
        }
      );
    }
  );
};

export default getRequestedPageFromURL;
