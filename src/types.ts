export interface QueryState {
  query?: any
}

export type QueryBuilder<T> = {
  match: <K extends keyof T>(field: K, value: T[K]) => QueryBuilder<T>;

  build: () => any;
}
