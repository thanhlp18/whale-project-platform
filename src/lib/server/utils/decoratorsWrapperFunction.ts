import { logger } from "@/lib/common/logger";

type Run<T> = () => Promise<T>;
/**
 * Runs multiple asynchronous functions sequentially until one of them succeeds.
 * @param runs An array of functions (of type Run<T>) to be executed sequentially.
 * @returns A Promise that resolves to the result of the first successful function, or rejects if all functions fail.
 */
export async function runWithFallback<T>(...runs: Run<T>[]) {
  for (const run of runs) {
    const { status, response }: { status: boolean; response: T | null } =
      await run()
        .then((response) => ({ response, status: true }))
        .catch((err) => {
          logger.error("unable to get response", { err });
          return { status: false, response: null };
        });
    if (!!status) {
      return Promise.resolve(response);
    }
  }
  return Promise.reject("unable to get response for all runners");
}

/**
 * Runs an asynchronous function with retry logic.
 * @param run The function (of type Run<T>) to be executed.
 * @param maxRetry The maximum number of retries.
 * @returns A Promise that resolves to the result of the function after successful execution or rejects if all retries fail.
 */
export async function runWithRetry<T>(run: Run<T>, maxRetry: number, serviceName?: string) {
  for (const retry of Array(maxRetry)
    .fill(0)
    .map((_, idx) => idx + 1)) {
    retry > 1 && logger.info("Retry: " + (retry - 1));

    const { status, response }: { status: boolean; response: T | null } =
      await run()
        .then((response) => ({ response, status: true }))
        .catch((err) => {
          logger.error("unable to get response", { err, retry });
          return { status: false, response: null };
        });
    if (!!status) {
      return Promise.resolve(response);
    }
  }
  return Promise.reject("unable to get response for " + (serviceName ? serviceName : ""));
}

/**
 * Runs an asynchronous function with caching logic.
 * @param run The function (of type Run<T>) to be executed to fetch the data if not available in the cache.
 * @param getter The function responsible for retrieving the data from the cache.
 * @param setter The function responsible for setting the data into the cache.
 * @returns A Promise that resolves to the cached data if available, or the latest data fetched by the run function.
 */
export async function runWithCaching<T>(
  run: Run<T>,
  getter: () => Promise<T>,
  setter: (val: T) => Promise<any>
) {
  return await getter()
    .then((res) => {
      // logger.info("got data from cache");
      return res;
    })
    .catch(async (error) => {
      // logger.info("unable to get data from cache", { error });
      // logger.info("getting real data");
      const val = await run();
      try {
        setter(val)
          .catch(err => logger.error("error while saving cached to db", err));
        return val;
      } catch {
        return val;
      }
    });
}

/**
 * Runs an asynchronous function with caching logic for cv.
 * @param run The function (of type Run<T>) to be executed to fetch the data if not available in the cache.
 * @param getter The function responsible for retrieving the data from the cache.
 * @param setter The function responsible for setting the data into the cache.
 * @returns A Promise that resolves to the cached data if available, or the latest data fetched by the run function.
 */
export async function runWithCachingForCVAwaitSetter<T>(
  run: Run<T>,
  getter: () => Promise<T>,
  setter: (val: T) => Promise<any>
) {
  return await getter()
    .then((res) => {
      // logger.info("got data from cache");
      return res;
    })
    .catch(async (error) => {
      // logger.info("unable to get data from cache", { error });
      // logger.info("getting real data");
      const val = await run();
      try {
        await setter(val);
        return val;
      } catch {
        return val;
      }
    });
}
