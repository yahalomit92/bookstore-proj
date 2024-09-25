import React from "react";
import "../../styles/Authors.css"; // Reuse existing styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../../context";

const Author = ({ item, funcs, options = true }) => {
	const { name, country } = item;
	const { deleteAuthor } = useAppContext();
	const openUpdate = options && funcs[0];

	const handleDelete = (e) => {
		e.preventDefault();
		deleteAuthor(item._id);
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		openUpdate(item);
	};

	return (
		<div className="author-item">
			<div className="author-header">
				<h2 className="author-name">{name}</h2>
				{options && (
					<div className="author-actions">
						<button onClick={handleDelete} className="icon-button">
							<FontAwesomeIcon icon={faTrash} />
						</button>
						<button onClick={handleUpdate} className="icon-button">
							<FontAwesomeIcon icon={faEdit} />
						</button>
					</div>
				)}
			</div>
			<p className="author-detail">
				<strong>Country:</strong> {country}
			</p>
		</div>
	);
};

export default Author;
