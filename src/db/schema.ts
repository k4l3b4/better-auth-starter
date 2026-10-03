import { relations } from "drizzle-orm";
import {
	type AnyPgColumn,
	boolean,
	integer,
	json,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified")
		.$defaultFn(() => false)
		.notNull(),
	image: text("image"),
	createdAt: timestamp("created_at")
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: timestamp("updated_at")
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	role: text("role"),
	banned: boolean("banned"),
	banReason: text("ban_reason"),
	banExpires: timestamp("ban_expires"),
	trustPoints: integer("trust_points")
		.$defaultFn(() => 0)
		.notNull(),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	impersonatedBy: text("impersonated_by"),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").$defaultFn(
		() => /* @__PURE__ */ new Date(),
	),
	updatedAt: timestamp("updated_at").$defaultFn(
		() => /* @__PURE__ */ new Date(),
	),
});

export const category = pgTable("category", {
	id: text("id").primaryKey(),
	name: text("name").notNull().unique(),
	slug: text("slug").notNull().unique(),
});

export const tag = pgTable("tag", {
	id: text("id").primaryKey(),
	name: text("name").notNull().unique(),
	slug: text("slug").notNull().unique(),
});

export const post = pgTable("post", {
	id: text("id").primaryKey(),
	title: text("title").notNull(),
	slug: text("slug").notNull().unique(),
	content: json("content").notNull(),
	excerpt: text("excerpt"),
	coverImage: text("cover_image"),
	metaTitle: text("meta_title"),
	metaDescription: text("meta_description"),
	authorId: text("author_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	status: text("status")
		.notNull()
		.$defaultFn(() => "draft"),
	createdAt: timestamp("created_at")
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: timestamp("updated_at")
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
});

// Junction: post <-> category (many-to-many)
export const postCategory = pgTable("post_category", {
	postId: text("post_id")
		.notNull()
		.references(() => post.id, { onDelete: "cascade" }),
	categoryId: text("category_id")
		.notNull()
		.references(() => category.id, { onDelete: "cascade" }),
});

// Junction: post <-> tag (many-to-many)
export const postTag = pgTable("post_tag", {
	postId: text("post_id")
		.notNull()
		.references(() => post.id, { onDelete: "cascade" }),
	tagId: text("tag_id")
		.notNull()
		.references(() => tag.id, { onDelete: "cascade" }),
});

export const comment = pgTable("comment", {
	id: text("id").primaryKey(),
	content: text("content").notNull(),
	postId: text("post_id")
		.notNull()
		.references(() => post.id, { onDelete: "cascade" }),
	authorId: text("author_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	parentId: text("parent_id").references((): AnyPgColumn => comment.id, {
		onDelete: "cascade",
	}),
	createdAt: timestamp("created_at")
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: timestamp("updated_at")
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const reaction = pgTable(
	"reaction",
	{
		id: text("id").primaryKey(),
		type: text("type").notNull(),
		postId: text("post_id")
			.notNull()
			.references(() => post.id, { onDelete: "cascade" }),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		createdAt: timestamp("created_at")
			.$defaultFn(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => {
		return [
			uniqueIndex("unique_reaction_idx").on(
				table.postId,
				table.userId,
				table.type,
			),
		];
	},
);

export const newsletterSubscription = pgTable("newsletter_subscription", {
	id: text("id").primaryKey(),
	email: text("email").notNull().unique(),
	createdAt: timestamp("created_at")
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
});

// ─── Relations ──────────────────────────────────────────

export const userRelations = relations(user, ({ many }) => ({
	posts: many(post),
	comments: many(comment),
	reactions: many(reaction),
}));

export const postRelations = relations(post, ({ one, many }) => ({
	author: one(user, {
		fields: [post.authorId],
		references: [user.id],
	}),
	categories: many(postCategory),
	tags: many(postTag),
	comments: many(comment),
	reactions: many(reaction),
}));

export const categoryRelations = relations(category, ({ many }) => ({
	posts: many(postCategory),
}));

export const tagRelations = relations(tag, ({ many }) => ({
	posts: many(postTag),
}));

export const postCategoryRelations = relations(postCategory, ({ one }) => ({
	post: one(post, { fields: [postCategory.postId], references: [post.id] }),
	category: one(category, {
		fields: [postCategory.categoryId],
		references: [category.id],
	}),
}));

export const postTagRelations = relations(postTag, ({ one }) => ({
	post: one(post, { fields: [postTag.postId], references: [post.id] }),
	tag: one(tag, { fields: [postTag.tagId], references: [tag.id] }),
}));

export const commentRelations = relations(comment, ({ one, many }) => ({
	post: one(post, {
		fields: [comment.postId],
		references: [post.id],
	}),
	author: one(user, {
		fields: [comment.authorId],
		references: [user.id],
	}),
	parent: one(comment, {
		fields: [comment.parentId],
		references: [comment.id],
		relationName: "commentReplies",
	}),
	replies: many(comment, { relationName: "commentReplies" }),
}));

export const reactionRelations = relations(reaction, ({ one }) => ({
	post: one(post, {
		fields: [reaction.postId],
		references: [post.id],
	}),
	user: one(user, {
		fields: [reaction.userId],
		references: [user.id],
	}),
}));
