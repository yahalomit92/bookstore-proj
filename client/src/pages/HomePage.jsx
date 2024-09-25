import React from "react";
import { useAppContext } from "../context";
import FilterDates from "../components/FilterDates";
import Author from "../components/author/Author";
import Book from "../components/book/Book";
import "../styles/Home.css";

function HomePage() {
	const {
		totalProfit,
		mostPopularBook,
		mostPopularAuthor,
		mostPopularGenres,
		highestProfitDay,
		getTotalProfitBetweenDates,
		getByMostPopularGenres,
	} = useAppContext();

	const handleFilterSubmit = (startDate, endDate) => {
		getTotalProfitBetweenDates(startDate, endDate);
		getByMostPopularGenres(startDate, endDate);
	};

	const clearFilters = () => {
		getTotalProfitBetweenDates();
		getByMostPopularGenres();
	};

	return (
		<div className="home-container">
			<header className="home-header">
				<h1>Dashboard Overview</h1>
				<p>Explore the latest stats and insights</p>
			</header>

			{/* Filter by Dates */}
			<div className="filter-section">
				<h2>Filter by Dates</h2>
				<FilterDates
					onFilter={handleFilterSubmit}
					onClear={clearFilters}
				/>
			</div>

			<div className="stats-grid">
				{/* Total Profit */}
				<div className="stat-card profit-card">
					<h3>Total Profit Between Dates</h3>
					<p className="stat-value">{totalProfit}₪</p>
				</div>

				{/* Highest Profit Day */}
				<div className="stat-card highest-profit-card">
					<h3>All Time Highest Profit Day</h3>
					<p className="stat-value">
						{highestProfitDay.day
							? `Date: ${highestProfitDay.day}, Profit: ${highestProfitDay.profit}₪`
							: "No data available"}
					</p>
				</div>

				{/* Most Popular Genres */}
				<div className="stat-card genres-card">
					<h3>Most Popular Genres Between Dates</h3>
					<ul>
						{mostPopularGenres.length > 0 ? (
							mostPopularGenres.map((genre) => (
								<li key={genre.genre}>
									<span className="genre-name">
										{genre._id}
									</span>
									<span className="genre-quantity">
										{genre.totalQuantity}
									</span>
								</li>
							))
						) : (
							<li>No data available</li>
						)}
					</ul>
				</div>

				{/* Most Popular Book */}
				<div className="stat-card book-card">
					<h3>All Time Most Popular Book</h3>
					{mostPopularBook.book ? (
						<Book
							item={mostPopularBook.book}
							funcs={[]}
							options={false}
						/>
					) : (
						<p>No data available</p>
					)}
				</div>

				{/* Most Popular Author */}
				<div className="stat-card author-card">
					<h3>All Time Mosdt Popular Author</h3>
					{mostPopularAuthor.author ? (
						<Author
							item={mostPopularAuthor.author}
							funcs={[]}
							options={false}
						/>
					) : (
						<p>No data available</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default HomePage;
