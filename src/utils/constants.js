const PORT = 3000
const HTTP_400 = 404
const HTTP_500 = 404
const SOMETHING_WENT_WRONG = "Something went wrong"
const RETRY_DELAY_MS = 2000 // Initial retry delay (increases exponentially)
const DB_MAX_RETRY = 5 // Maximum reconnection attempts

module.exports = {PORT, HTTP_400, HTTP_500, SOMETHING_WENT_WRONG, RETRY_DELAY_MS, DB_MAX_RETRY}