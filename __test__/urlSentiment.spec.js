import { urlSentiment } from "../src/server/index"

describe("Testing the form submit functionality", () => {
    test("Testing the function exists", () => {
           expect(urlSentiment).toBeDefined();
    })

    test("If errors produced when fetching API", () => {
        return getWebData("www.", "Wrong URL", null)
            .catch(e => expect(e.message)
            .toBe("Only support absolute URLs"));
    })
});