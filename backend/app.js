if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(process.env.PORT || 3000, () => {
	console.log(`Listening at https://localhost:${process.env.PORT || 3000}/`);
});
