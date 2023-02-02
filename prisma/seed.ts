// prisma/seed.ts
import { Category, PrismaClient, Product } from '@prisma/client';
import { faker } from '@faker-js/faker';
// initialize Prisma Client
const prisma = new PrismaClient();

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
  for (let index = 0; index < 5; index++) {
    const radomIndexCategory = Math.floor(Math.random() * categories.length);
    productsPromise.push(
      prisma.product.create({
        data: {
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
  console.info(`Run Seed Successfully`);
}

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
