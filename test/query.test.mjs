import { expect } from "chai";
import { GraphQLClient } from "graphql-request";
const endpoint = "https://streaming.bitquery.io/graphql";

const query1 = `
  {
    EVM {
      Blocks(limit: {count: 1}) {
        Block {
          Coinbase
                }
              }
            }
          }
`;

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: "Bearer YOUR_API_KEY",
  },
});

const data1 = await client.request(query1);

describe("Query 1", () => {
  it("should return the expected data", async () => {
    console.log(data1.EVM.Blocks[0].Block.Coinbase);
  });
  it("should have 'Coinbase' as a string", async () => {
    expect(data1.EVM.Blocks[0].Block.Coinbase).to.be.a("string");
  });
  it("should contain the 'Coinbase' property", async () => {
    expect(data1.EVM.Blocks[0].Block).to.have.property("Coinbase");
  });
  it("should contain the 'Block' property", async () => {
    expect(data1.EVM.Blocks[0]).to.have.property("Block");
  });
  it("should have 'Blocks' as an array", async () => {
    expect(data1.EVM.Blocks).to.be.an("array");
  });
  it("should contain the 'Blocks' property", async () => {
    expect(data1.EVM).to.have.property("Blocks");
  });
  it("should contain the 'EVM' property", async () => {
    expect(data1).to.have.property("EVM");
  });
  it("should have 'Coinbase' in the correct format", async () => {
    expect(data1.EVM.Blocks[0].Block.Coinbase).to.match(/^0x[a-fA-F0-9]{40}$/);
  });
  it("should handle errors", async () => {
    try {
      await client.request(query1);
    } catch (err) {
      expect(err.response.errors).to.exist;
    }
  });
});
