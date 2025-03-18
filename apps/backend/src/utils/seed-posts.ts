import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { PostsService } from '../posts/posts.service';
import { faker } from '@faker-js/faker/locale/en'; // Correct import path

async function seedPosts() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const postService = app.get(PostsService);
  const userService = app.get(UsersService);
  const configService = app.get(ConfigService);

  const users = await userService.findAll({});
  if (users.data.length === 0) {
    console.error('No users found. Please seed users first.');
    await app.close();
    return;
  }
  // Generate 10 fake posts
  const fakePosts = Array.from({ length: 10 }, () => ({
    title: faker.lorem.words(3), // Generate a title with 3 random words
    content: faker.lorem.paragraph(), // Generate a random paragraph
    image: faker.image.url(), // Generate a random image URL
    user: users.data[Math.floor(Math.random() * users.data.length)], // Assign a random user,
    slug: faker.lorem.slug(), // Generate a slug based on a fake string
  }));

  for (const post of fakePosts) {
    await postService.createPostSeed(post); // Use your PostsService to create posts
    console.log(`✅ Post created: ${post.title} by ${post.user.email}`);
  }

  console.log('🎉 Fake posts seeding completed!');

  await app.close();
}

seedPosts().catch((err) => {
  console.error('Error seeding posts:', err);
});
