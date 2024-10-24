enum KEYS {
  success = "success",
  error = "error",
}

type ResponseTS<T extends string = keyof typeof KEYS> = {
  [KEYS in T]: string | null;
};

export type { ResponseTS };
