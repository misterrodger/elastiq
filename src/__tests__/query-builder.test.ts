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
});
