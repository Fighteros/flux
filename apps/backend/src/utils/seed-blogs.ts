import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { faker } from '@faker-js/faker/locale/en';
import { BlogsService } from '../blogs/blogs.service'; // Correct import path

async function seedBlogs() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const blogService = app.get(BlogsService);
  const userService = app.get(UsersService);
  const configService = app.get(ConfigService);

  const users = await userService.findAll({});
  if (users.data.length === 0) {
    console.error('No users found. Please seed users first.');
    await app.close();
    return;
  }
  // Generate 20 fake posts
  const fakeBlogs = Array.from({ length: 20 }, () => ({
    title: faker.lorem.words(3), // Generate a title with 3 random words
    content: faker.lorem.paragraph(), // Generate a random paragraph
    image: faker.image.url(), // Generate a random image URL
    author: users.data[Math.floor(Math.random() * users.data.length)].id, // Assign a random user,
    slug: faker.lorem.slug(), // Generate a slug based on a fake string
  }));

  for (const blog of fakeBlogs) {
    await blogService.createBlogSeed(blog); // Use your PostsService to create posts
    console.log(`✅ Blog created: ${blog.title} by ${blog.author}`);
  }

  console.log('🎉 Fake blogs seeding completed!');

  await app.close();
}

seedBlogs().catch((err) => {
  console.error('Error seeding posts:', err);
});
