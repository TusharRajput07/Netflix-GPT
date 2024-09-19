import OpenAI from "openai";

const client = new OpenAI({
  apiKey:
    "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", // This is the default and can be omitted
  dangerouslyAllowBrowser: true,
});

export default client;
