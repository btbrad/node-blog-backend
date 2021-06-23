const http = require('http')
const chalk = require('chalk')
const ora = require('ora')
const cliSpinners = require('cli-spinners')
const serverHandler = require('../app')

const PORT = 9527

const server = http.createServer(serverHandler)

server.listen(PORT, () => {
  const spinner = ora({
    spinner: cliSpinners.material,
  }).start()

  setTimeout(() => {
    spinner.text = chalk.blue.bold(
      `Server is running at http://localhost:${PORT}`
    )
  }, 1000)
})
