import { Prisma, PrismaClient, user, post } from "@prisma/client";

const client = new PrismaClient();

const getUsers = (): Prisma.userCreateInput[] => [
  {
    email: "test@mail.com",
    name: "Bob",
  },
  {
    email: "test1@mail.com",
    name: "Steve",
  },
  {
    email: "test2@mail.com",
    name: "Charly",
  },
];

const getPosts = (users: user[]): Prisma.postCreateInput[] => [
  {
    author: {
      connect: {
        id: users[0].id,
      },
    },
    text: "test post 1",
    title: "Test title 1",
  },
  {
    author: {
      connect: {
        id: users[1].id,
      },
    },
    text: "test post 2",
    title: "Test title 2",
  },
];

const getComments = (
  users: user[],
  posts: post[]
): Prisma.commentCreateInput[] => [
  {
    creator: { connect: { id: users[0].id } },
    post: { connect: { id: posts[0].id } },
    text: "this is a test comment",
  },
];

const main = async () => {
  const users = await Promise.all(
    getUsers().map((user) => client.user.create({ data: user }))
  );
  const posts = await Promise.all(
    getPosts(users).map((post) => client.post.create({ data: post }))
  );
  const comments = await Promise.all(
    getComments(users, posts).map((comment) =>
      client.comment.create({ data: comment })
    )
  );
};

main();
