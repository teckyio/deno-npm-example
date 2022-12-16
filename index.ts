import { Client, Express, express, pg, dotenv } from "./deps.ts";

dotenv.config()

const app:Express = express()
const config = {
    database: Deno.env.get('POSTGRES_DB'),
    user: Deno.env.get('POSTGRES_USER'),
    password: Deno.env.get('POSTGRES_PASSWORD')
}
const client: Client = new pg.Client(config)

await client.connect()

app.use(express.json())


app.get('/todos', async(req, res)=>{
    const data = (await client.query("SELECT * from todos")).rows
    res.json(data)
})

app.post('/todos',async (req ,res)=>{
    const content = req.body.content
    await client.query("INSERT INTO todos (content) values ($1)",[content])
    res.json("Hello World")
})


app.listen(8080, ()=>{
    console.log("Listening at http://localhost:8080")
})