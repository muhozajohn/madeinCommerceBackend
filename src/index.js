import app from './app';


const PORT = process.env.PORT || 2800;

app.listen(process.env.PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});

