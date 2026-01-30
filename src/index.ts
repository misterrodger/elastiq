import { createQueryBuilder } from './query-builder';
import { createAggregationBuilder } from './aggregation-builder';

export const query = <T>() => createQueryBuilder<T>();
export const aggregations = <T>() => createAggregationBuilder<T>();
