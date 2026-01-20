import { QueryState, QueryBuilder } from './types';

const Monad = <T>(state: QueryState) => ({
  map: (fn: (s: QueryState) => QueryState) => Monad<T>(fn(state)),
  fold: () => state
})

export const createQueryBuilder = <T>(state: QueryState = {}): QueryBuilder<T> => ({
  match: (field, value) =>
    createQueryBuilder<T>(
      Monad<T>(state).map(s => ({
        ...s,
        query: { 
          match: { 
            [field]: value 
          } 
        }
      })).fold()
    ),

    build: () => state
})

export type {
  QueryBuilder
} from './types'
