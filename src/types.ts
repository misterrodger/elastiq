export type QueryState = {
  query?: any
}

export type QueryBuilder<T> = {
  match: <K extends keyof T>(field: K, value: T[K]) => QueryBuilder<T>;

  bool: () => BoolBuilder<T>;

  build: () => any;
}

export type BoolBuilder<T> = {
  must: (fn: (q: QueryBuilder<T>) => QueryBuilder<T>) => BoolBuilder<T>;
  should: (fn: (q: QueryBuilder<T>) => QueryBuilder<T>) => BoolBuilder<T>;
  mustNot: (fn: (q: QueryBuilder<T>) => QueryBuilder<T>) => BoolBuilder<T>;
  filter: (fn: (q: QueryBuilder<T>) => QueryBuilder<T>) => BoolBuilder<T>;
  minimumShouldMatch: (n: number) => BoolBuilder<T>;

  build: () => any;
} 
