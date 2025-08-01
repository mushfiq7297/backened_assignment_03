
import dotenv from "dotenv"
dotenv.config();

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    database_url: process.env.DATABASE_URL,
}
 