const handleRequest = async (req, res, fn) => {
  try {
    const result = await fn();
    if (!res.headersSent) {
      return res.status(200).json(result);
    }
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = { handleRequest };
