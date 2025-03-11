import express from "express"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import { Bun } from "bun" // Import Bun

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = 3000

// Servește fișierele statice din directorul curent
app.use(express.static(__dirname))

// Ruta principală
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"))
})

// Pornește serverul
app.listen(port, () => {
  console.log(`Serverul rulează la adresa http://localhost:${port}`)
})

// Afișează conținutul fișierelor pentru preview
console.log("Conținutul fișierului index.html:")
try {
  console.log(await Bun.file("index.html").text())
} catch (error) {
  console.error("Error reading index.html:", error)
}

console.log("\nConținutul fișierului styles.css:")
try {
  console.log(await Bun.file("styles.css").text())
} catch (error) {
  console.error("Error reading styles.css:", error)
}

console.log("\nConținutul fișierului script.js:")
try {
  console.log(await Bun.file("script.js").text())
} catch (error) {
  console.error("Error reading script.js:", error)
}

