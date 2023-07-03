import swaggerUi from 'swagger-ui-express'
import bodyParser from 'body-parser'
import express from 'express'
import endpoints from './src/endpoints.js'
import { readFile } from 'fs/promises'

const outputFile = './swagger-output.json'
const swaggerFile = JSON.parse(await readFile(outputFile, 'utf-8'))

const app = express()
app.use(bodyParser.json())
app.use('/doc', swaggerUi.serve)
app.get('/doc', swaggerUi.setup(swaggerFile))

const ctx = { app }
endpoints(ctx)

app.listen(3000, () => {
  console.log("Server is running!\nAPI documentation: http://localhost:3000/doc")
})
