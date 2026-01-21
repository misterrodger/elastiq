import { QueryState, QueryBuilder } from './types';
import { Monad } from './helpers/monad';
import { createBoolBuilder } from './bool-builder';

export const createQueryBuilder = <T>(
  state: QueryState = {}
): QueryBuilder<T> => ({
  bool: () => createBoolBuilder<T>(state),

  matchAll: () =>
    createQueryBuilder<T>({
      ...state,
      query: {
        match_all: {}
      }
    }),

  match: (field, value) =>
    createQueryBuilder<T>({
      ...state,
      query: {
        match: {
          [field]: value
        }
      }
    }),

  term: (field, value) =>
    createQueryBuilder<T>({
      ...state,
      query: { term: { [field]: value } }
    }),

  terms: (field, values) =>
    createQueryBuilder<T>({
      ...state,
      query: { terms: { [field]: values } }
    }),

  exists: (field) =>
    createQueryBuilder<T>({
      ...state,
      query: { exists: { field } }
    }),

  prefix: (field, value) =>
    createQueryBuilder<T>({
      ...state,
      query: { prefix: { [field]: value } }
    }),

  wildcard: (field, value) =>
    createQueryBuilder<T>({
      ...state,
      query: { wildcard: { [field]: value } }
    }),

  when: (condition, builder) =>
    condition ? builder : createQueryBuilder<T>(state),

  // sort: (field, direction) =>
  //   createQueryBuilder<T>(
  //     Monad<T>(state).map(s => ({
  //       ...s,
  //       sort: [...(s.sort || []), { [field]: direction }]
  //     })).fold()
  //   ),

  from: (n) =>
    createQueryBuilder<T>(
      Monad<T>(state)
        .map((s) => ({ ...s, from: n }))
        .fold()
    ),

  size: (n) =>
    createQueryBuilder<T>(
      Monad<T>(state)
        .map((s) => ({ ...s, size: n }))
        .fold()
    ),

  source: (fields) =>
    createQueryBuilder<T>(
      Monad<T>(state)
        .map((s) => ({ ...s, _source: fields }))
        .fold()
    ),

  build: () => state
});

export type { QueryBuilder } from './types';
