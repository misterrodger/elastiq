import { query } from "..";

type TestIndex = {
  title: string;
  price: number;
};

describe("QueryBuilder", () => {
  it("should build a top-level match query", () => {
    const result = query<TestIndex>().match("title", "test title").build();

    expect(result).toMatchInlineSnapshot(`
     {
       "query": {
         "match": {
           "title": "test title",
         },
       },
     }
    `);
  });

  it("should build a bool.must query", () => {
    const result = query<TestIndex>()
      .bool()
      .must((q) => q.match("title", "test title"))
      .build();

    expect(result).toMatchInlineSnapshot(`
     {
       "query": {
         "bool": {
           "must": [
             {
               "match": {
                 "title": "test title",
               },
             },
           ],
         },
       },
     }
    `);
  });

  it("should build a bool.should query", () => {
    const result = query<TestIndex>()
      .bool()
      .should((q) => q.match("title", "test title"))
      .build();

    expect(result).toMatchInlineSnapshot(`
     {
       "query": {
         "bool": {
           "should": [
             {
               "match": {
                 "title": "test title",
               },
             },
           ],
         },
       },
     }
    `);
  });

  it("should build a bool.mustNot query", () => {
    const result = query<TestIndex>()
      .bool()
      .mustNot((q) => q.match("title", "test title"))
      .build();

    expect(result).toMatchInlineSnapshot(`
     {
       "query": {
         "bool": {
           "must_not": [
             {
               "match": {
                 "title": "test title",
               },
             },
           ],
         },
       },
     }
    `);
  });

  it("should build a bool.filter query", () => {
    const result = query<TestIndex>()
      .bool()
      .filter((q) => q.match("title", "test title"))
      .build();

    expect(result).toMatchInlineSnapshot(`
     {
       "query": {
         "bool": {
           "filter": [
             {
               "match": {
                 "title": "test title",
               },
             },
           ],
         },
       },
     }
    `);
  });

  it("should build a bool.minimumShouldMatch query", () => {
    const result = query<TestIndex>()
      .bool()
      .must((q) => q.match("title", "test title"))
      .must((q) => q.match("price", 42))
      .minimumShouldMatch(1)
      .build();

    expect(result).toMatchInlineSnapshot(`
     {
       "query": {
         "bool": {
           "minimum_should_match": 1,
           "must": [
             {
               "match": {
                 "title": "test title",
               },
             },
             {
               "match": {
                 "price": 42,
               },
             },
           ],
         },
       },
     }
    `);
  });
});
