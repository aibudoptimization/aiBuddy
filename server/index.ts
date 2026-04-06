import express from "express"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(__dirname, "..", "dist")

const app = express()
const port = Number(process.env.PORT) || 3000

app.use(express.static(dist))

app.use((_req, res) => {
  res.sendFile(path.join(dist, "index.html"))
})

app.listen(port, () => {
  console.log(`WorkflowWonder prototype at http://localhost:${port}`)
})
