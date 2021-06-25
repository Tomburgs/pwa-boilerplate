const deleteEntriesForCache = (CACHE_NAME: string) => (
  async (): Promise<void> => {
    const cache = await self.caches.open(CACHE_NAME);
    const cachedRequests = await cache.keys();

    for (const entry of cachedRequests) {
      await cache.delete(entry);
    }
  }
);

export default deleteEntriesForCache;
