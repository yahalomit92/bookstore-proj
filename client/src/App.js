import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthorsPage from "./pages/AuthorsPage";
import BooksPage from "./pages/BooksPage";
import NavBarLayout from "./pages/NavBarLayout";
import NoPageFound from "./pages/NoPageFound";
import OrdersPage from "./pages/OrdersPage";
import HomePage from "./pages/HomePage";
import { AppProvider } from "./context";

function App() {
	return (
		<AppProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<NavBarLayout />}>
						<Route index element={<HomePage />} />
						<Route path="authors" element={<AuthorsPage />} />
						<Route path="books" element={<BooksPage />} />
						<Route path="orders" element={<OrdersPage />} />
						<Route path="*" element={<NoPageFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AppProvider>
	);
}

export default App;
