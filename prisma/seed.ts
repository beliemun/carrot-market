import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const main = async () => {
  await [...Array.from(Array(100).keys())].reduce(async (prev, item) => {
    try {
      await prev;
      await client.stream.create({
        data: {
          name: String(item),
          description: String(item),
          price: item,
          user: {
            connect: {
              id: 1,
            },
          },
        },
      });
      console.log(`${item + 1}/100`);
    } catch {}
  }, Promise.resolve());
  console.log("Done");
};

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());
