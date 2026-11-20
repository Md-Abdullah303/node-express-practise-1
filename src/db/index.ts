import { Pool } from "pg";



export const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_o34zvLjbMiGm@ep-quiet-boat-ao5kw90i.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=true&channel_binding=require"
})

export const initDB = async () => {
    try {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        age INT,
        is_active BOOLEAN DEFAULT true,
        
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        );
        `)
        console.log("Database Connected!")
    } catch (error) {
        console.log(error)
    }
}