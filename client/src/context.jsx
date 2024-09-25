import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const apiUrl = "http://localhost:3001/api";

const context = createContext();

export const AppProvider = ({ children }) => {
	const [books, setBooks] = useState([]);
	const [authors, setAuthors] = useState([]);
	const [orders, setOrders] = useState([]);
	const [genres, setGenres] = useState([]);
	const [totalProfit, setTotalProfit] = useState(0);
	const [mostPopularBook, setMostPopularBook] = useState({});
	const [mostPopularAuthor, setMostPopularAuthor] = useState({});
	const [mostPopularGenres, setMostPopularGenres] = useState([]);
	const [highestProfitDay, setHighestProfitDay] = useState({});

	useEffect(() => {
		getBooks();
		getGenres();
		getAuthors();
		getOrders();
		getByMostPopularBook();
		getByMostPopularAuthor();
		getByMostPopularGenres();
		getByHighestProfitDay();
	}, []);

	// Books
	const getBooks = async (page = 1, limit = 10) => {
		try {
			const response = await axios.get(
				`${apiUrl}/books?page=${page}&limit=${limit}`
			);
			setBooks(response.data);
		} catch (error) {
			console.error("Failed to fetch books", error);
		}
	};

	const addBook = async (book) => {
		try {
			await axios.post(`${apiUrl}/books`, book);
			getBooks();
			alert("Book added successfully");
		} catch (error) {
			console.error("Failed to add book", error);
			alert(`Error: ${error.response?.data?.error || error.message}`);
		}
	};

	const deleteBook = async (id) => {
		try {
			await axios.delete(`${apiUrl}/books/${id}`);
			getBooks();
			alert("Book deleted successfully");
		} catch (error) {
			console.error("Failed to delete book", error);
			alert(`Error: ${error.response?.data?.error || error.message}`);
		}
	};

	const updateBook = async (book, id) => {
		try {
			await axios.put(`${apiUrl}/books/${id}`, book);
			getBooks();
			alert("Book updated successfully");
		} catch (error) {
			console.error("Failed to update book", error);
			alert(`Error: ${error.response?.data?.error || error.message}`);
		}
	};

	const getGenres = async () => {
		try {
			const response = await axios.get(`${apiUrl}/books/by/genre`);
			setGenres(response.data);
		} catch (error) {
			console.error("Failed to fetch genres", error);
		}
	};

	const fetchByGenre = async (genre, page, limit) => {
		try {
			const response = await axios.get(
				`${apiUrl}/books/by/genre/${genre}?page=${page}&limit=${limit}`
			);
			setBooks(response.data);
		} catch (error) {
			console.error("Failed to fetch books by genre", error);
		}
	};

	// Authors
	const getAuthors = async (page = 1, limit = 10) => {
		try {
			const response = await axios.get(
				`${apiUrl}/authors?page=${page}&limit=${limit}`
			);
			setAuthors(response.data);
		} catch (error) {
			console.error("Failed to fetch authors", error);
		}
	};

	const addAuthor = async (author) => {
		try {
			await axios.post(`${apiUrl}/authors`, author);
			getAuthors();
			alert("Author added successfully");
		} catch (error) {
			console.error("Failed to add author", error);
			alert(`Error: ${error.response?.data?.error || error.message}`);
		}
	};

	const deleteAuthor = async (id) => {
		try {
			await axios.delete(`${apiUrl}/authors/${id}`);
			getAuthors();
			alert("Author deleted successfully");
		} catch (error) {
			console.error("Failed to delete author", error);
			alert(`Error: ${error.response?.data?.error || error.message}`);
		}
	};

	const updateAuthor = async (id, author) => {
		try {
			await axios.put(`${apiUrl}/authors/${id}`, author);
			getAuthors();
			alert("Author updated successfully");
		} catch (error) {
			console.error("Failed to update author", error);
			alert(`Error: ${error.response?.data?.error || error.message}`);
		}
	};

	// Orders
	const getOrders = async (page = 1, limit = 10) => {
		try {
			const response = await axios.get(
				`${apiUrl}/orders?page=${page}&limit=${limit}`
			);
			setOrders(response.data);
		} catch (error) {
			console.error("Failed to fetch orders", error);
		}
	};

	const addOrder = async (order) => {
		try {
			await axios.post(`${apiUrl}/orders/`, order);
			getOrders();
			getByMostPopularAuthor();
			getByMostPopularBook();
			getByMostPopularGenres();
			getByHighestProfitDay();
			getTotalProfitBetweenDates();
			alert("Order added successfully");
		} catch (error) {
			console.error("Failed to add order", error);
			alert(`Error: ${error.response?.data?.error || error.message}`);
		}
	};

	const deleteOrder = async (id) => {
		try {
			await axios.delete(`${apiUrl}/orders/${id}`);
			getOrders();
			alert("Order deleted successfully");
		} catch (error) {
			console.error("Failed to delete order", error);
			alert(`Error: ${error.response?.data?.error || error.message}`);
		}
	};

	const getOrdersBetweenDates = async (from, to, page = 1, limit = 10) => {
		try {
			const response = await axios.get(
				`${apiUrl}/orders/by/betweenDates?from=${from}&to=${to}&page=${page}&limit=${limit}`
			);
			setOrders(response.data);
		} catch (error) {
			console.error("Failed to fetch orders between dates", error);
		}
	};

	// Home
	const getTotalProfitBetweenDates = async (from, to) => {
		try {
			const response = await axios.get(
				`${apiUrl}/orders/by/profitBetweenDates?from=${from}&to=${to}`
			);
			setTotalProfit(response.data.totalProfit);
		} catch (error) {
			console.error("Failed to fetch total profit between dates", error);
		}
	};

	const getByMostPopularBook = async () => {
		try {
			const response = await axios.get(
				`${apiUrl}/orders/by/mostPopularBook`
			);
			setMostPopularBook(response.data);
		} catch (error) {
			console.error("Failed to fetch most popular book", error);
		}
	};

	const getByMostPopularAuthor = async () => {
		try {
			const response = await axios.get(
				`${apiUrl}/orders/by/mostPopularAuthor`
			);
			setMostPopularAuthor(response.data);
		} catch (error) {
			console.error("Failed to fetch most popular author", error);
		}
	};

	const getByMostPopularGenres = async (from, to) => {
		try {
			const response = await axios.get(
				`${apiUrl}/orders/by/mostPopularGenres?from=${from}&to=${to}`
			);
			console.log(response);
			setMostPopularGenres(response.data);
		} catch (error) {
			console.error("Failed to fetch most popular genres", error);
		}
	};

	const getByHighestProfitDay = async () => {
		try {
			const response = await axios.get(
				`${apiUrl}/orders/by/highestProfitDay`
			);
			setHighestProfitDay(response.data);
		} catch (error) {
			console.error("Failed to fetch highest profit day", error);
		}
	};

	return (
		<context.Provider
			value={{
				books,
				authors,
				orders,
				genres,
				totalProfit,
				mostPopularBook,
				mostPopularAuthor,
				mostPopularGenres,
				highestProfitDay,
				getBooks,
				addBook,
				deleteBook,
				updateBook,
				getGenres,
				fetchByGenre,
				getAuthors,
				addAuthor,
				deleteAuthor,
				updateAuthor,
				getOrders,
				addOrder,
				deleteOrder,
				getOrdersBetweenDates,
				getTotalProfitBetweenDates,
				getByMostPopularGenres,
			}}
		>
			{children}
		</context.Provider>
	);
};

export const useAppContext = () => {
	return useContext(context);
};
