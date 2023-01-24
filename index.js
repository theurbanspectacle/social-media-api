const express = require('express');
const userRoutes = require('./routes/user');
const thoughtRoutes = require('./routes/thought');

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

app.use((req, res) => {
    res.status(404).send("404: Route not found.")
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})