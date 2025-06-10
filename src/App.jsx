import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";

const App = () => {
	const [data, setData] = useState("Click to Generate Fact");

	const [personName, setPersonName] = useState("");
	const [personData, setPersonData] = useState(null);

	// const fetchData = async () => {
	// 	const response = await fetch("https://catfact.ninja/fact");
	// 	const data = await response.json();
	// 	setData(data.fact);
	// };

	const fetchData = async () => {
		const response = await Axios.get("https://catfact.ninja/fact");
		setData(response.data.fact);
	};

	useEffect(() => {
		fetchData();
	}, []);

	// Predict Age using external API
	const fetchAge = async (event) => {
		event.preventDefault();
		try {
			const response = await Axios.get(
				`https://api.agify.io?name=${personName}`
			);
			setPersonData(response.data);
			setPersonName("");
		} catch (error) {
			console.log(error.message);
		}
	};

	// Excercise

	const [excuseData, setExcuseData] = useState(null);

	const fetchExcuse = async (category) => {
		try {
			const response = await Axios.get(
				`https://excuser-three.vercel.app/v1/excuse/${category}/`
			);
			setExcuseData(response.data[0]);
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<div>
				<h1>Get Cat Fact</h1>

				<h2>{data}</h2>
				<button onClick={fetchData}>Fetch Data</button>
			</div>

			{/* Predict Age */}
			<div>
				<h1>Predict Age</h1>
				{/* Add form and API call here */}
				<form action="" onSubmit={fetchAge}>
					<label htmlFor="user">Person Name</label>
					<input
						type="text"
						name="user"
						id="user"
						value={personName}
						placeholder="Ex. John"
						required
						onChange={(e) => setPersonName(e.target.value)}
					/>

					<button type="submit">Get Age</button>
				</form>
				<p>Name: {personData?.name}</p>
				<p>Age: {personData?.age}</p>
				<p>Count: {personData?.count}</p>
			</div>

			<div className="exercise">
				<h1>Exercise</h1>
				<div className="buttons-container">
					<button type="button" onClick={() => fetchExcuse("family")}>
						Family
					</button>
					<button type="button" onClick={() => fetchExcuse("office")}>
						Office
					</button>
					<button type="button" onClick={() => fetchExcuse("party")}>
						Party
					</button>
					<button
						type="button"
						onClick={() => fetchExcuse("college")}
					>
						College
					</button>
				</div>
				<div className="excuse-container">
					<p>
						<strong>ID: </strong>
						{excuseData?.id}
					</p>
					<p>
						<strong>Excuse: </strong>
						{excuseData?.excuse}
					</p>
					<p>
						<strong>Category: </strong>
						{excuseData?.category}
					</p>
				</div>
			</div>
		</>
	);
};

export default App;
