import getWindowProperty from 'utils/browser/getWindowProperty';

type BrowserStorageEntryName = string;
type BrowserStorageEntryValue = any;
type BrowserStorageEntryTTL = number;
type BrowserStorageEntryCreatedAt = number;

interface BrowserStorageEntry {
    value: BrowserStorageEntryValue,
    ttl: BrowserStorageEntryTTL,
    createdAt: BrowserStorageEntryCreatedAt 
}

export class BrowserStorage {
  private get _storage(): Storage {
    return getWindowProperty().localStorage || {};
  }

  getItem(name: BrowserStorageEntryName): any {
    try {
      const entry = this._storage.getItem(name) || '';
      const { value, ttl, createdAt }: BrowserStorageEntry = JSON.parse(entry);

      if (ttl && Date.now() > createdAt + ttl) {
        this._storage.removeItem(name);

        return null;
      }

      return value;
    } catch {
      return null;
    }
  }

  setItem(
    name: BrowserStorageEntryName,
    value: BrowserStorageEntryValue,
    ttl: BrowserStorageEntryTTL = 0
  ): void | Error {
    if (!this._storage) {
      throw new Error('setItem called outside of window scope!');
    }

    const createdAt = Date.now() as BrowserStorageEntryCreatedAt;

    this._storage.setItem(name, JSON.stringify({
      value,
      ttl,
      createdAt
    }));
  }
}

export default new BrowserStorage();
