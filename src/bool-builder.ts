import { BoolBuilder, QueryState } from './types';
import { Monad } from './helpers/monad';
import { createQueryBuilder } from './query-builder';

export const createBoolBuilder = <T>(
  state: QueryState = {}
): BoolBuilder<T> => ({
  must: (fn) => {
    const innerBuilder = fn(createQueryBuilder<T>({}));
    const innerState = innerBuilder.build();

    return createBoolBuilder<T>(
      Monad<T>(state)
        .map((s) => ({
          ...s,
          query: {
            bool: {
              ...s.query?.bool,
              must: [...(s.query?.bool.must || []), innerState.query]
            }
          }
        }))
        .fold()
    );
  },

  should: (fn) => {
    const innerBuilder = fn(createQueryBuilder<T>({}));
    const innerState = innerBuilder.build();

    return createBoolBuilder<T>(
      Monad<T>(state)
        .map((s) => ({
          ...s,
          query: {
            bool: {
              ...s.query?.bool,
              should: [...(s.query?.bool.should || []), innerState.query]
            }
          }
        }))
        .fold()
    );
  },

  mustNot: (fn) => {
    const innerBuilder = fn(createQueryBuilder<T>({}));
    const innerState = innerBuilder.build();

    return createBoolBuilder<T>(
      Monad<T>(state)
        .map((s) => ({
          ...s,
          query: {
            bool: {
              ...s.query?.bool,
              must_not: [...(s.query?.bool.must_not || []), innerState.query]
            }
          }
        }))
        .fold()
    );
  },

  filter: (fn) => {
    const innerBuilder = fn(createQueryBuilder<T>({}));
    const innerState = innerBuilder.build();

    return createBoolBuilder<T>(
      Monad<T>(state)
        .map((s) => ({
          ...s,
          query: {
            bool: {
              ...s.query?.bool,
              filter: [...(s.query?.bool.filter || []), innerState.query]
            }
          }
        }))
        .fold()
    );
  },

  minimumShouldMatch: (n) =>
    createBoolBuilder<T>(
      Monad<T>(state)
        .map((s) => ({
          ...s,
          query: {
            bool: {
              ...s.query.bool,
              minimum_should_match: n
            }
          }
        }))
        .fold()
    ),

  build: () => state
});
