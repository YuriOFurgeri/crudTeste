import  express  from "express";
import cors from "cors";
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import loginRoutes from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use(cors())
//vai pegar a rota do userRoutes e no user routes há um get
app.use("/", userRoutes)

app.use("/products", productRoutes);

app.use("/login", loginRoutes);

app.listen(8800)