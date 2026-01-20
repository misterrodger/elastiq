import { QueryState, QueryBuilder } from './types';
import { Monad } from './helpers/monad';
import { createBoolBuilder } from './bool-builder';

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

    bool: () => createBoolBuilder<T>(state),

    build: () => state
})

export type {
  QueryBuilder
} from './types'
