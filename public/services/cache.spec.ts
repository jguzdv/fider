import { cache } from "./cache";

test("cache starts empty", () => {
  const value = cache.get("my-key");
  expect(value).toBeNull();
});

test("can set, remove and get from cache", () => {
  cache.set("my-key", "Hello World");
  const value = cache.get("my-key");
  expect(value).toBe("Hello World");

  cache.remove("my-key");
  const newValue = cache.get("my-key");
  expect(newValue).toBeNull();
});
