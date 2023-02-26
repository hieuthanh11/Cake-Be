// prisma/seed.ts
import { Account, Category, PrismaClient, Product } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
// initialize Prisma Client
const prisma = new PrismaClient();
const defaultPassword = '123456';
const saltOrRounds = 10;

async function seedAccountRole() {
  const ROLE_ADMIN = await prisma.role.create({ data: { name: 'admin' } });
  const ROLE_USER = await prisma.role.create({ data: { name: 'user' } });
  const hashPassWord = await bcrypt.hash(defaultPassword, saltOrRounds);
  const usersPromise: Promise<Account>[] = [];

  for (let index = 0; index < 10; index++) {
    usersPromise.push(
      prisma.account.create({
        data: {
          username: index === 9 ? 'admin' + (index + 1) : 'user' + (index + 1),
          password: hashPassWord,
          phone: faker.phone.number(),
          roleId: index === 9 ? ROLE_ADMIN.id : ROLE_USER.id,
        },
      }),
    );
  }
  await Promise.all(usersPromise);
  console.info(`Run Seed Account Successfully`);
}

async function main() {
  const categoriesData = ['Sweet', 'Salty', 'Spicy'];
  // insert categories
  const categoriesPromise: Promise<Category>[] = [];
  for (const item of categoriesData) {
    categoriesPromise.push(
      prisma.category.create({
        data: { name: item },
      }),
    );
  }
  // insert products
  await Promise.all(categoriesPromise);
  const categories = await prisma.category.findMany();

  const productsPromise: Promise<Product>[] = [];
  for (let index = 0; index < 100; index++) {
    const radomIndexCategory = Math.floor(Math.random() * categories.length);
    productsPromise.push(
      prisma.product.create({
        data: {
          quantity: 100,
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: 2000,
          category: {
            connect: { id: categories[radomIndexCategory].id },
          },
        },
      }),
    );
  }

  await Promise.all(productsPromise);
  // create two dummy articles
  console.info(`Run Seed Product Successfully`);
}

seedAccountRole()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
