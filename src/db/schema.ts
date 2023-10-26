import { relations } from 'drizzle-orm';
import {
    text,
    timestamp,
    pgTable,
    boolean,
    serial,
    integer,
    primaryKey,
} from 'drizzle-orm/pg-core';
import type { AdapterAccount } from '@auth/core/adapters';

const date = new Date();

export const user = pgTable('user', {
    id: text('id').primaryKey().unique().notNull(),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
    image: text('image'),
    emailVerified: boolean('emailVerified').default(false),
    role: text('role').default('user').$type<'admin' | 'user'>().notNull(),
    createdAt: timestamp('created_at').default(date),
    updatedAt: timestamp('updated_at').default(date),
});
export const accounts = pgTable(
    'account',
    {
        userId: text('userId')
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
        type: text('type').$type<AdapterAccount['type']>().notNull(),
        provider: text('provider').notNull(),
        providerAccountId: text('providerAccountId').notNull(),
        refresh_token: text('refresh_token'),
        access_token: text('access_token'),
        expires_at: integer('expires_at'),
        token_type: text('token_type'),
        scope: text('scope'),
        id_token: text('id_token'),
        session_state: text('session_state'),
    },
    (account) => ({
        compoundKey: primaryKey(account.provider, account.providerAccountId),
    })
);

export const sessions = pgTable('session', {
    sessionToken: text('sessionToken').notNull().primaryKey(),
    userId: text('userId')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
    'verificationToken',
    {
        identifier: text('identifier').notNull(),
        token: text('token').notNull(),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey(vt.identifier, vt.token),
    })
);
export const usersRelations = relations(user, ({ many }) => ({
    posts: many(post),
}));

export const post = pgTable('post', {
    post_id: text('post_id').primaryKey().unique().notNull(),
    title: text('title').unique().notNull(),
    body: text('text').notNull(),
    image: text('image').notNull(),
    author_name: text('author_name').notNull(),
    author_id: text('author_id').notNull(),
    createdAt: timestamp('created_at').default(date),
    updatedAt: timestamp('updated_at').default(date),
});
export const postsRelations = relations(post, ({ one, many }) => ({
    author: one(user, {
        fields: [post.author_id],
        references: [user.id],
    }),
    comments: many(comment),
}));

export const comment = pgTable('comment', {
    comment_id: text('comment_id').primaryKey().unique().notNull(),
    text: text('text').notNull(),
    author_name: text('author_name').notNull(),
    author_id: text('author_id').notNull(),
    post_id: text('post_id').notNull(),
    createdAt: timestamp('created_at').default(date),
    updatedAt: timestamp('updated_at').default(date),
});
export const commentsRelations = relations(comment, ({ one }) => ({
    post: one(post, {
        fields: [comment.post_id],
        references: [post.post_id],
    }),
}));

export const likes = pgTable('likes', {
    author_name: text('author_name').notNull(),
    count: serial('count').notNull(),
    post_id: text('post_id').primaryKey(),
});

export const likesRelations = relations(likes, ({ one }) => ({
    post: one(post, {
        fields: [likes.post_id],
        references: [post.post_id],
    }),
}));
