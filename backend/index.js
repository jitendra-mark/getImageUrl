import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { upload } from "./src/s3Client/s3Client.js"

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


app.post("/upload", upload.array("file", 10), (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }
        const urls = files.map((file) => file.location);
        res.status(201).json({ message:"succuessfully Uploaded" , urls });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


