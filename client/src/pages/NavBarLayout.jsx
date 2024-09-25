// NavBarLayout.js
import { Outlet, Link } from "react-router-dom";
import "../styles/Layout.css"; // Import the CSS file

const NavBarLayout = () => {
	return (
		<div className="layout">
			<nav className="navbar">
				<ul className="nav-list">
					<li className="nav-item">
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/authors" className="nav-link">
							Authors
						</Link>
					</li>
				</ul>
				<h1 className="navbar-title">Books Store</h1>
				<ul className="nav-list">
					<li className="nav-item">
						<Link to="/books" className="nav-link">
							Books
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/orders" className="nav-link">
							Orders
						</Link>
					</li>
				</ul>
			</nav>
			<main className="content">
				<Outlet />
			</main>
		</div>
	);
};

export default NavBarLayout;
