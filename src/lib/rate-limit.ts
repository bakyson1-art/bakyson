import { LRUCache } from 'lru-cache';

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export function rateLimit(options?: Options) {
  const tokenCache = new LRUCache<string, number>({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60 * 1000,
  });

  return {
    check: (res: any, limit: number, token: string) => {
      const tokenCount = (tokenCache.get(token) as number) || 0;
      if (tokenCount >= limit) {
        res.status = 429;
        return false;
      }
      tokenCache.set(token, tokenCount + 1);
      return true;
    },
  };
}
