import getBuildManifest from './getBuildManifest';

const getBuildManifestPages = (): string[] => {
  const { sortedPages, __rewrites, ...manifest } = getBuildManifest();

  return Object.keys(manifest).filter(url => !url.includes('/_'));
};

export default getBuildManifestPages;
