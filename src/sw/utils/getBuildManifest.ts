declare const self: ServiceWorkerGlobalScope;

const getBuildManifest = (): NextBuildManifest => {
  const { __rewrites, sortedPages, ...manifest } = self.__BUILD_MANIFEST;

  return Object.entries(manifest).reduce<NextBuildManifest>(
    (manifest, [page, assets]) => ({
      ...manifest,
      [page]: assets.map(url => `/_next/${url}`)
    }), {}
  );
};

export default getBuildManifest;
