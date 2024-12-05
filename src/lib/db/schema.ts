import { integer, pgTable, text, timestamp, unique } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const reviews = pgTable('reviews', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  movieId: integer('movie_id').notNull(),
  rating: integer('rating').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
}, (t) => ({
  unq: unique().on(t.userId, t.movieId),
}));

export type User = typeof users.$inferSelect;
export type UserPublic = Pick<User, 'id' | 'name' | 'email' | 'createdAt'>;

export type Review = typeof reviews.$inferSelect;
export type ReviewWithUserName = Review & {
  userName: User['name'] | null;
};
