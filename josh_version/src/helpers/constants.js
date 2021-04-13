// moved this here so if it ever needs to be updated you only have to do it in one place
export const URL_BASE = "https://pokeapi.co/api/v2";
export const fetchURL = async (url) => {
	try {
		const res = await fetch(url);
		if (!res.ok) throw new Error("could not get poke data");
		const json = await res.json();
		return json;
	} catch (err) {
		console.log(err);
	}
};
