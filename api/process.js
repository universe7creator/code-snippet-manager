module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-License-Key');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Health check endpoint
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'healthy',
      service: 'code-snippet-manager',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { action, data } = req.body;

    switch (action) {
      case 'validate':
        // License validation (placeholder for LemonSqueezy integration)
        return res.status(200).json({
          valid: true,
          message: 'License validated successfully'
        });

      case 'export':
        // Return export format info
        return res.status(200).json({
          format: 'json',
          schema: {
            version: '1.0',
            snippets: 'array of snippet objects'
          }
        });

      default:
        return res.status(400).json({ error: 'Unknown action' });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};
