import { ObjectId } from "mongodb";
import MongoDB from "../db/mongodb.js";

class BooksCollection {
	constructor() {
		this.booksCollection = null;
	}

	async initialize() {
		if (!this.booksCollection) {
			const db = await MongoDB.instance().db();
			this.booksCollection = db.collection("books");
		}
	}

	static instance() {
		if (!this._instance) {
			this._instance = new BooksCollection();
		}
		return this._instance;
	}

	// Add book to database
	static async add(book) {
		await this.instance().initialize(); // Ensure initialization
		const result = await this.instance().booksCollection.insertOne(book);
		return result.insertedId;
	}

	// Get all books
	static async getAll(page = 1, limit = 10) {
		await this.instance().initialize(); // Ensure initialization
		const booksCollection = this.instance().booksCollection;

		// Calculate the number of documents to skip based on the current page and limit
		const skip = (page - 1) * limit;

		// Retrieve the total count of documents
		const total = await booksCollection.countDocuments();

		// Retrieve the paginated results with author details
		const books = await booksCollection
			.aggregate([
				{ $skip: skip },
				{ $limit: limit },
				{
					$lookup: {
						from: "authors",
						localField: "author",
						foreignField: "_id",
						as: "author",
					},
				},
				{
					$unwind: {
						path: "$author",
						preserveNullAndEmptyArrays: true,
					},
				},
			])
			.toArray();

		// Calculate total pages
		const totalPages = Math.ceil(total / limit);

		// Return results along with pagination metadata
		return {
			total,
			page,
			limit,
			totalPages,
			data: books,
		};
	}

	// Get book by id
	static async get(id) {
		await this.instance().initialize(); // Ensure initialization
		const booksCollection = this.instance().booksCollection;

		const book = await booksCollection
			.aggregate([
				{ $match: { _id: new ObjectId(id) } }, // Ensure the id is converted to ObjectId
				{
					$lookup: {
						from: "authors",
						localField: "author",
						foreignField: "_id",
						as: "author",
					},
				},
				{
					$unwind: {
						path: "$author",
						preserveNullAndEmptyArrays: true,
					},
				},
			])
			.next();

		return book;
	}

	// Get books by genre
	static async getByGenre(genre, page = 1, limit = 10) {
		await this.instance().initialize(); // Ensure initialization
		const booksCollection = this.instance().booksCollection;

		// Calculate the number of documents to skip based on the current page and limit
		const skip = (page - 1) * limit;

		// Retrieve the total count of documents matching the genre
		const total = await booksCollection.countDocuments({ genres: genre });

		// Retrieve the paginated results with author details
		const books = await booksCollection
			.aggregate([
				{ $match: { genres: genre } },
				{ $skip: skip },
				{ $limit: limit },
				{
					$lookup: {
						from: "authors",
						localField: "author",
						foreignField: "_id",
						as: "author",
					},
				},
				{
					$unwind: {
						path: "$author",
						preserveNullAndEmptyArrays: true,
					},
				},
			])
			.toArray();

		// Return results along with pagination metadata
		return {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
			data: books,
		};
	}

	// Get books by ids
	static async getBooks(ids) {
		await this.instance().initialize(); // Ensure initialization
		// Convert ids to ObjectId
		ids = ids.map((id) => new ObjectId(id));
		// Retrieve books with author details
		const books = await this.instance()
			.booksCollection.aggregate([
				{ $match: { _id: { $in: ids } } },
				{
					$lookup: {
						from: "authors",
						localField: "author",
						foreignField: "_id",
						as: "author",
					},
				},
				{
					$unwind: {
						path: "$author",
						preserveNullAndEmptyArrays: true,
					},
				},
			])
			.toArray();

		return books;
	}

	// Delete book by id
	static async delete(id) {
		await this.instance().initialize(); // Ensure initialization
		await this.instance().booksCollection.deleteOne({
			_id: new ObjectId(id),
		});
	}

	// Update book by id
	static async update(id, book) {
		await this.instance().initialize(); // Ensure initialization
		await this.instance().booksCollection.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: book }
		);
	}

	// Get all books genres
	static async getGenres() {
		await this.instance().initialize(); // Ensure initialization
		const booksCollection = this.instance().booksCollection;

		// Retrieve distinct genres
		const genres = await booksCollection.distinct("genres");

		return genres;
	}
}

export default BooksCollection;
