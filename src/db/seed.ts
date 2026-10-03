import "dotenv/config";
import { parseArgs } from "node:util";
import { faker } from "@faker-js/faker";
import { hashPassword } from "better-auth/crypto";
import { db } from "./index";
import {
	account,
	category,
	comment,
	post,
	postCategory,
	postTag,
	tag,
	user,
} from "./schema";

const options = {
	users: { type: "string", default: "25" },
	posts: { type: "string", default: "20" },
	categories: { type: "string", default: "5" },
	tags: { type: "string", default: "10" },
	clear: { type: "boolean", default: false },
} as const;

// Pre-hashed bcrypt password for "password".
// This will be inserted into the `account` table.

async function run() {
	const { values } = parseArgs({ options, args: process.argv.slice(2) });

	const numUsers = parseInt(values.users as string, 10);
	const numPosts = parseInt(values.posts as string, 10);
	const numCategories = parseInt(values.categories as string, 10);
	const numTags = parseInt(values.tags as string, 10);
	const shouldClear = values.clear as boolean;
	console.log("Hashing dummy password...");
	const DUMMY_PASSWORD_HASH = await hashPassword("password");

	console.log("Seeding database with:", {
		users: numUsers,
		posts: numPosts,
		categories: numCategories,
		tags: numTags,
		clear: shouldClear,
	});

	await db.transaction(async (tx) => {
		if (shouldClear) {
			console.log("Clearing existing dummy data...");
			await tx.delete(postCategory);
			await tx.delete(postTag);
			await tx.delete(comment);
			await tx.delete(post);
			await tx.delete(tag);
			await tx.delete(category);
			await tx.delete(user);
			console.log("Data cleared.");
		}

		// 1. Generate Categories
		console.log(`Generating ${numCategories} categories...`);
		const newCategories = Array.from({ length: numCategories }).map(() => {
			const name = faker.commerce.department();
			return {
				id: faker.string.uuid(),
				name: `${name} ${faker.string.nanoid(4)}`,
				slug: `${faker.helpers.slugify(name).toLowerCase()}-${faker.string.nanoid(4)}`,
			};
		});
		let categoryIds: string[] = [];
		if (newCategories.length > 0) {
			const insertedCats = await tx
				.insert(category)
				.values(newCategories)
				.returning({ id: category.id });
			categoryIds = insertedCats.map((c) => c.id);
		}

		// 2. Generate Tags
		console.log(`Generating ${numTags} tags...`);
		const newTags = Array.from({ length: numTags }).map(() => {
			const name = faker.word.adjective();
			return {
				id: faker.string.uuid(),
				name: `${name} ${faker.string.nanoid(4)}`,
				slug: `${faker.helpers.slugify(name).toLowerCase()}-${faker.string.nanoid(4)}`,
			};
		});
		let tagIds: string[] = [];
		if (newTags.length > 0) {
			const insertedTags = await tx
				.insert(tag)
				.values(newTags)
				.returning({ id: tag.id });
			tagIds = insertedTags.map((t) => t.id);
		}

		// 3. Generate Users & Accounts
		console.log(`Generating 1 admin user and ${numUsers} dummy users...`);

		const usersToInsert = [];
		const accountsToInsert = [];

		// --- CREATE THE ADMIN USER ---
		const adminId = faker.string.uuid();
		const adminEmail = "admin@example.com";

		usersToInsert.push({
			id: adminId,
			name: "Admin User",
			email: adminEmail,
			emailVerified: true,
			image: faker.image.avatar(),
			role: "admin",
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		accountsToInsert.push({
			id: faker.string.uuid(),
			accountId: adminEmail,
			providerId: "credential", // Typical provider ID for email/password auth
			userId: adminId,
			password: DUMMY_PASSWORD_HASH,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		// --- CREATE DUMMY USERS ---
		for (let i = 0; i < numUsers; i++) {
			const uId = faker.string.uuid();
			const uEmail = faker.internet.email();

			usersToInsert.push({
				id: uId,
				name: faker.person.fullName(),
				email: uEmail,
				emailVerified: true,
				image: faker.image.avatar(),
				role: "user",
				createdAt: faker.date.past(),
				updatedAt: faker.date.recent(),
			});

			accountsToInsert.push({
				id: faker.string.uuid(),
				accountId: uEmail,
				providerId: "credential",
				userId: uId,
				password: DUMMY_PASSWORD_HASH,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		let userIds: string[] = [];
		if (usersToInsert.length > 0) {
			const insertedUsers = await tx
				.insert(user)
				.values(usersToInsert)
				.returning({ id: user.id });
			userIds = insertedUsers.map((u) => u.id);

			// Insert their credential accounts so you can log into them!
			await tx.insert(account).values(accountsToInsert);
		}

		// 4. Generate Posts
		console.log(`Generating ${numPosts} posts...`);
		const newPosts = Array.from({ length: numPosts }).map(() => {
			const title = faker.lorem.sentence();
			return {
				id: faker.string.uuid(),
				title,
				slug: `${faker.helpers.slugify(title).toLowerCase()}-${faker.string.nanoid(4)}`,
				content: {
					type: "doc",
					content: [
						{
							type: "paragraph",
							content: [{ type: "text", text: faker.lorem.paragraphs(3) }],
						},
					],
				},
				excerpt: faker.lorem.paragraph(),
				coverImage: faker.image.urlPicsumPhotos(),
				authorId: faker.helpers.arrayElement(userIds),
				status: faker.helpers.arrayElement(["published", "draft"]),
				createdAt: faker.date.past(),
				updatedAt: faker.date.recent(),
			};
		});

		let postIds: string[] = [];
		if (newPosts.length > 0) {
			const insertedPosts = await tx
				.insert(post)
				.values(newPosts)
				.returning({ id: post.id });
			postIds = insertedPosts.map((p) => p.id);
		}

		// 5. Generate Relations and Comments
		console.log(`Generating comments and relations...`);
		const newPostCategories = [];
		const newPostTags = [];
		const newComments = [];

		for (const postId of postIds) {
			if (categoryIds.length > 0) {
				const numPostCats = faker.number.int({
					min: 1,
					max: Math.min(2, categoryIds.length),
				});
				const selectedCats = faker.helpers.arrayElements(
					categoryIds,
					numPostCats,
				);
				for (const catId of selectedCats) {
					newPostCategories.push({ postId, categoryId: catId });
				}
			}

			if (tagIds.length > 0) {
				const numPostTags = faker.number.int({
					min: 1,
					max: Math.min(4, tagIds.length),
				});
				const selectedTags = faker.helpers.arrayElements(tagIds, numPostTags);
				for (const tagId of selectedTags) {
					newPostTags.push({ postId, tagId: tagId });
				}
			}

			const numComments = faker.number.int({ min: 0, max: 3 });
			for (let c = 0; c < numComments; c++) {
				newComments.push({
					id: faker.string.uuid(),
					content: faker.lorem.sentences(2),
					postId: postId,
					authorId: faker.helpers.arrayElement(userIds),
					createdAt: faker.date.recent(),
					updatedAt: faker.date.recent(),
				});
			}
		}

		if (newPostCategories.length > 0)
			await tx
				.insert(postCategory)
				.values(newPostCategories)
				.onConflictDoNothing();
		if (newPostTags.length > 0)
			await tx.insert(postTag).values(newPostTags).onConflictDoNothing();
		if (newComments.length > 0) await tx.insert(comment).values(newComments);
	});

	console.log("Seeding complete!");
	console.log("-----------------------------------------");
	console.log("🟢 Admin Email: admin@example.com");
	console.log("🔑 Admin Password: password");
	console.log("-----------------------------------------");
}

run()
	.then(() => {
		process.exit(0);
	})
	.catch((e) => {
		console.error("Seeding failed:");
		console.error(e);
		process.exit(1);
	});
