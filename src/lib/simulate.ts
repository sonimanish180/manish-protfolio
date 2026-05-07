/**
 * simulateApiCall — mimics a real network call for Optimistic UI demos.
 * Resolves after `latency` ms with `successRate` probability.
 * On failure, throws an Error so optimistic state auto-reverts.
 */
export function simulateApiCall(
  successRate = 0.9,
  latency = 1000
): Promise<void> {
  return new Promise((resolve, reject) =>
    setTimeout(
      () =>
        Math.random() < successRate
          ? resolve()
          : reject(new Error("Simulated server error")),
      latency
    )
  )
}
