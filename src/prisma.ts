import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const main = async () => {
  const post = await client.post.findFirst({
    where: { text: "test post 1" },
    include: { author: true, comments: true },
  });

  console.log(post);

  if (post) {
    const newPost = await client.post.update({
      data: { title: "New title" },
      where: { id: post?.id },
    });

    console.log(newPost);
  }

  client.$disconnect();
};

main();
