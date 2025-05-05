import {
  pgTable,
  serial,
  varchar,
  text,
  date,
  timestamp,
  integer,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull(),
  password: varchar('password', { length: 100 }).notNull(),
  sub: varchar('sub').notNull().unique(),
  nickname: text('nickname').notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  profilePic: varchar('profile_pic')
    .default(
      'https://pbs.twimg.com/profile_images/1545518896874242055/s8icSRfU_400x400.jpg',
    )
    .notNull(),
  personalInfo: text('personal_info').default(''),
  birthday: date('birthday', { mode: 'string' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const tweets = pgTable('tweets', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  content: varchar('content', { length: 400 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const retweets = pgTable('retweets', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  tweetId: integer('tweet_id')
    .notNull()
    .references(() => tweets.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const mentions = pgTable('mentions', {
  id: serial('id').primaryKey(),
  mention: varchar('mention', { length: 400 }).notNull(),
  tweetId: integer('tweet_id')
    .notNull()
    .references(() => tweets.id),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// export const usersRelations = relations(users, ({ many }) => ({
//   tweets: many(tweets),
// }));
// export const tweetsRelations = relations(tweets, ({ one }) => ({
//   user: one(users, {
//     fields: [tweets.id],
//     references: [users.id],
//   }),
// }));
