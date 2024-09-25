import React, { useState, useEffect } from "react";
import { useAppContext } from "../context";
import Author from "../components/author/Author";
import List from "../components/List";
import AddAuthor from "../components/author/AddAuthor";
import PagesNavBar from "../components/PagesNavBar";
import "../styles/Authors.css"; // Assuming you'll add a new CSS file

function AuthorsPage() {
	const initialAuthorState = {
		name: "",
		country: "",
	};

	const { authors, getAuthors } = useAppContext();
	const [addOpen, setAddOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState(false);
	const [newAuthor, setNewAuthor] = useState(initialAuthorState);
	const [currentPage, setCurrentPage] = useState(1);
	const [limit, setLimit] = useState(10);

	useEffect(() => {
		getAuthors(currentPage, limit);
	}, [currentPage, limit]);

	const openUpdate = (author) => {
		setAddOpen(true);
		setUpdateOpen(true);
		setNewAuthor(author);
	};

	const cancel = () => {
		setAddOpen(false);
		setUpdateOpen(false);
		setNewAuthor(initialAuthorState);
	};

	return (
		<div className="authors-page">
			<div className="form-column">
				<header className="page-header">
					<h1>Manage Authors</h1>
				</header>
				<button
					className="toggle-button"
					onClick={addOpen ? cancel : () => setAddOpen(!addOpen)}
				>
					{addOpen || updateOpen ? "Cancel" : "Add Author"}
				</button>
				{(addOpen || updateOpen) && (
					<AddAuthor
						addOpen={addOpen}
						updateOpen={updateOpen}
						newAuthor={newAuthor}
						setNewAuthor={setNewAuthor}
						cancel={cancel}
					/>
				)}
			</div>

			<div className="list-column">
				<header className="page-header">
					<h1>Authors List</h1>
				</header>
				{authors.data && authors.data.length > 0 && (
					<List
						items={authors.data}
						ItemComponent={Author}
						funcs={[openUpdate]}
					/>
				)}
				<PagesNavBar
					currentPage={currentPage}
					totalPages={authors.totalPages}
					onPageChange={setCurrentPage}
				/>
			</div>
		</div>
	);
}

export default AuthorsPage;
