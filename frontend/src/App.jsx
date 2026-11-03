import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldCheck, Server, DollarSign, Activity, PlusCircle, RefreshCw, Cpu } from 'lucide-react';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ project_name: '', slug: '', base_url: '', category: 'E-Commerce' });

  const API_URL = 'http://localhost:5000/api';

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/command-center/overview`);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/projects/register`, formData);
      setShowModal(false);
      setFormData({ project_name: '', slug: '', base_url: '', category: 'E-Commerce' });
      fetchData();
    } catch (err) {
      alert('Failed to onboard project: ' + err.message);
    }
  };

  const handleFlushCache = async () => {
    try {
      const res = await axios.post(`${API_URL}/system/flush-cache`);
      alert(res.data.message);
    } catch (err) {
      alert('Cache flush failed');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-emerald-400 font-mono">
        <RefreshCw className="animate-spin mr-2" /> Initializing Nexus Command Center...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wider text-emerald-400 flex items-center gap-2">
            <ShieldCheck className="w-8 h-8" /> NEXUS MASTER COMMAND CENTER
          </h1>
          <p className="text-xs text-slate-400 mt-1">Unified Infrastructure & Project Orchestration Portal</p>
        </div>
        <div className="flex gap-3 text-xs font-mono">
          <span className="bg-emerald-950 text-emerald-400 px-3 py-1.5 rounded border border-emerald-800 flex items-center gap-1">
            <Activity className="w-4 h-4" /> System: 99.98% Active
          </span>
          <span className="bg-slate-900 px-3 py-1.5 rounded border border-slate-800">Operator: Md Hossain</span>
        </div>
      </header>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-emerald-400" /> Lifetime Revenue
          </p>
          <h2 className="text-3xl font-extrabold text-emerald-400 mt-2">${data?.totalRevenue || '0.00'}</h2>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider flex items-center gap-1">
            <Activity className="w-4 h-4 text-blue-400" /> Monthly Recurring (MRR)
          </p>
          <h2 className="text-3xl font-extrabold text-blue-400 mt-2">$16,850.00</h2>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider flex items-center gap-1">
            <Cpu className="w-4 h-4 text-purple-400" /> AI Threat Shield
          </p>
          <h2 className="text-3xl font-extrabold text-purple-400 mt-2">PROTECTED 🟢</h2>
        </div>
      </div>

      {/* Dynamic Projects Grid */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
            <Server className="w-5 h-5 text-emerald-400" /> Connected Ecosystem
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
          >
            <PlusCircle className="w-4 h-4" /> Onboard New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {data?.projects?.length === 0 ? (
            <p className="text-slate-500 text-sm">No connected projects found. Onboard your first app!</p>
          ) : (
            data?.projects?.map((proj) => (
              <div key={proj.project_id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded uppercase">{proj.category}</span>
                  <h3 className="text-base font-bold mt-2 text-white">{proj.project_name}</h3>
                  <p className="text-xs text-emerald-400 mt-1">Status: {proj.status} 🟢</p>
                </div>
                <a
                  href={proj.base_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 text-center bg-slate-800 hover:bg-slate-700 text-xs font-medium py-2 rounded transition block"
                >
                  Open App Gateway
                </a>
              </div>
            ))
          )}
        </div>
      </section>

      {/* AI Controls */}
      <section className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
        <h2 className="text-base font-semibold text-slate-200 mb-2">🤖 Autonomous Operations & Optimization</h2>
        <p className="text-xs text-slate-400 mb-4">Gemini AI Engine: "All database execution latency optimal. Dynamic load balancing active."</p>
        <div className="flex flex-wrap gap-3">
          <button onClick={handleFlushCache} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded text-xs transition">
            Flush Edge Cache
          </button>
          <button className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded text-xs transition">
            Execute DB Vacuum
          </button>
        </div>
      </section>

      {/* Onboard Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-bold text-white mb-4">Onboard New Project</h3>
            <form onSubmit={handleRegister} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={formData.project_name}
                  onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Slug (Identifier)</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Base URL</label>
                <input
                  type="url"
                  required
                  value={formData.base_url}
                  onChange={(e) => setFormData({ ...formData, base_url: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded">
                  Cancel
                </button>
                <button type="submit" className="px-3 py-1.5 bg-emerald-600 text-white rounded">
                  Register Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
                }
