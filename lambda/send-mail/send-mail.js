// eslint-disable-next-line
exports.handler = async (event, context) => {
  try {
    const { name, email, message } = JSON.parse(event.body)
    return {
      statusCode: 200,
      body: JSON.stringify({ name, email, message }),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
