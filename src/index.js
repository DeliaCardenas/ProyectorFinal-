//Aqui arrancaremos toda la plicacion
import app from "./app.js";
import { connectDB } from "./database/db.js";

connectDB(); 
app.listen(4000)
console.log('Server on port', 4000) 