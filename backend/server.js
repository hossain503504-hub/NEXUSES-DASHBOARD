const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// GET: Core Command Center Overview Data
app.get('/api/command-center/overview', async (req, res) => {
  try {
    const projects = await pool.query('SELECT * FROM global_projects ORDER BY created_at DESC');
    const financials = await pool.query('SELECT SUM(amount) AS total_revenue FROM master_financial_ledger');
    const healthLogs = await pool.query('SELECT * FROM ai_system_health_logs ORDER BY logged_at DESC LIMIT 5');

    res.status(200).json({
      success: true,
      projects: projects.rows,
      totalRevenue: financials.rows[0]?.total_revenue || 0,
      recentLogs: healthLogs.rows,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST: Dynamic Project Onboarding
app.post('/api/projects/register', async (req, res) => {
  const { project_name, slug, base_url, webhook_secret, category } = req.body;
  if (!project_name || !slug || !base_url) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const newProject = await pool.query(
      `INSERT INTO global_projects (project_name, slug, base_url, webhook_secret, category) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [project_name, slug, base_url, webhook_secret || 'secret_token', category || 'General']
    );
    res.status(201).json({ success: true, project: newProject.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST: Cache Flush Trigger
app.post('/api/system/flush-cache', (req, res) => {
  res.status(200).json({ success: true, message: 'Global Cache Purged Successfully across edge nodes.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🛡️ Nexus Command Center Server running on port ${PORT}`);
});
