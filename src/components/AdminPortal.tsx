import { useState } from 'react';
import { Search, Trash2, Check, PhoneCall, Download, X, HelpCircle, ShieldCheck, MapPin, Sparkles, Filter } from 'lucide-react';
import { Language, BookingRequest } from '../types';
import { TRANSLATIONS } from '../data';

interface AdminPortalProps {
  language: Language;
  requests: BookingRequest[];
  onUpdateStatus: (id: string, status: 'pending' | 'approved' | 'contacted') => void;
  onDeleteRequest: (id: string) => void;
  onClose: () => void;
}

export default function AdminPortal({
  language,
  requests,
  onUpdateStatus,
  onDeleteRequest,
  onClose
}: AdminPortalProps) {
  const t = TRANSLATIONS[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'contacted'>('all');
  const [accommodationFilter, setAccommodationFilter] = useState<'all' | 'standard' | 'premium' | 'luxury'>('all');

  const filteredRequests = requests.filter(req => {
    const matchesSearch =
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.phone.includes(searchTerm) ||
      req.departureCity.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    const matchesAccommodation = accommodationFilter === 'all' || req.accommodationClass === accommodationFilter;

    return matchesSearch && matchesStatus && matchesAccommodation;
  });

  const getStats = () => {
    const totalRequestsCount = requests.length;
    const pendingCount = requests.filter(r => r.status === 'pending').length;
    const totalPipelineRevenue = requests.reduce((sum, r) => sum + r.totalPrice, 0);
    const averagePassengers = totalRequestsCount > 0 
      ? Math.round((requests.reduce((sum, r) => sum + r.passengers, 0) / totalRequestsCount) * 10) / 10 
      : 0;

    return { totalRequestsCount, pendingCount, totalPipelineRevenue, averagePassengers };
  };

  const stats = getStats();

  const handleExportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["ID,Date,Client,Phone,Comments,Outbound,Accommodation,Size,Revenue,Status"]
        .concat(requests.map(r => `"${r.id}","${r.createdAt}","${r.name}","${r.phone}","${r.comment.replace(/"/g, '""')}","${r.departureCity}","${r.accommodationClass}",${r.passengers},${r.totalPrice},"${r.status}"`))
        .join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Japan_Tours_Requests_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: language === 'fr' ? 'EUR' : 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-neutral-900 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl space-y-8 animate-fade-in relative text-white">
      {/* Absolute top Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
        title="Close View"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 pr-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-amber-500 mb-1">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span>{language === 'fr' ? 'ESPACE AGENT SÉCURISÉ' : 'SECURE OPERATOR TERMINAL'}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black font-sans tracking-wide">
            {t.dbRequestsTitle}
          </h3>
        </div>

        <button
          onClick={handleExportData}
          disabled={requests.length === 0}
          className="px-4 py-2 bg-white/10 hover:bg-white/15 disabled:bg-white/5 disabled:text-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-white/10 flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{language === 'fr' ? 'Exporter CSV' : 'Export CSV'}</span>
        </button>
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="bg-neutral-950/40 p-4 rounded-2xl border border-white/5">
          <span className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">{language === 'fr' ? 'Demandes' : 'Total Pipeline'}</span>
          <span className="block text-2xl font-black">{stats.totalRequestsCount}</span>
          <span className="text-[10px] text-amber-500 font-mono">
            {stats.pendingCount} {language === 'fr' ? 'en attente' : 'pending'}
          </span>
        </div>

        {/* KPI 2 */}
        <div className="bg-neutral-950/40 p-4 rounded-2xl border border-white/5">
          <span className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">{language === 'fr' ? 'Budget Estimé' : 'Pipeline Revenue'}</span>
          <span className="block text-2xl font-black text-amber-400">{formatCurrency(stats.totalPipelineRevenue)}</span>
          <span className="text-[10px] text-green-500 font-mono">✓ {language === 'fr' ? 'Simulation active' : 'Simulated value'}</span>
        </div>

        {/* KPI 3 */}
        <div className="bg-neutral-950/40 p-4 rounded-2xl border border-white/5">
          <span className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">{language === 'fr' ? 'Groupe Moyen' : 'Avg Group Size'}</span>
          <span className="block text-2xl font-black">{stats.averagePassengers}</span>
          <span className="text-[10px] text-white/40 font-mono">{language === 'fr' ? 'voyageurs' : 'travelers per request'}</span>
        </div>

        {/* KPI 4 */}
        <div className="bg-neutral-950/40 p-4 rounded-2xl border border-white/5">
          <span className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">{language === 'fr' ? 'Statut Base' : 'Secure SandBox'}</span>
          <span className="block text-2xl font-black flex items-center gap-2 text-green-400">
            100%
          </span>
          <span className="text-[10px] text-white/40 font-mono">{language === 'fr' ? 'Chiffré localement' : 'Stored in browser'}</span>
        </div>

      </div>

      {/* Filters Area */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
          />
        </div>

        {/* Filter status */}
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white/70 focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-neutral-900 text-white">Status: All</option>
            <option value="pending" className="bg-neutral-900 text-white">Status: Pending</option>
            <option value="approved" className="bg-neutral-900 text-white">Status: Approved</option>
            <option value="contacted" className="bg-neutral-900 text-white">Status: Contacted</option>
          </select>

          <select
            value={accommodationFilter}
            onChange={(e) => setAccommodationFilter(e.target.value as any)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white/70 focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-neutral-900 text-white">Accom: All</option>
            <option value="standard" className="bg-neutral-900 text-white">Accom: Standard</option>
            <option value="premium" className="bg-neutral-900 text-white">Accom: Premium</option>
            <option value="luxury" className="bg-neutral-900 text-white">Accom: Luxury</option>
          </select>
        </div>
      </div>

      {/* List / Table Area */}
      <div className="max-h-[420px] overflow-y-auto border border-white/15 rounded-2xl bg-neutral-950/20 shadow-inner scrollbar-thin">
        {filteredRequests.length === 0 ? (
          <div className="p-12 text-center text-white/40 text-sm italic">
            {t.requestsEmpty}
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors"
              >
                {/* Client info */}
                <div className="space-y-1.5 text-left max-w-md">
                  <div className="flex items-center gap-3">
                    <span className="font-sans font-bold text-white text-base">{req.name}</span>
                    <span className={`text-[9px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                      req.status === 'pending'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                        : req.status === 'approved'
                        ? 'bg-green-500/10 border-green-500/30 text-green-500'
                        : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-500'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50 font-sans">
                    <span>📞 {req.phone}</span>
                    <span>✈ {req.departureCity} Departure</span>
                    <span>🏨 {req.accommodationClass.toUpperCase()} Class</span>
                    <span>👥 {req.passengers} pax • {req.durationDays}d</span>
                  </div>

                  {req.comment.trim() && (
                    <p className="text-xs text-amber-100/70 italic bg-white/5 border-l-2 border-amber-500 p-2.5 rounded-r-md mt-2 font-sans">
                      "{req.comment}"
                    </p>
                  )}

                  <span className="block text-[9px] font-mono text-white/30 pt-1">
                    Created on {new Date(req.createdAt).toLocaleString()} (ID: {req.id})
                  </span>
                </div>

                {/* Actions Panel */}
                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  
                  {/* Total Quote Value Tag */}
                  <div className="text-right pr-2">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white/50 block font-light">{language === 'fr' ? 'Chiffré :' : 'Simulated :'}</span>
                    <span className="text-sm font-black font-mono text-amber-400 block">{formatCurrency(req.totalPrice)}</span>
                  </div>

                  {/* Approve */}
                  {req.status === 'pending' && (
                    <button
                      onClick={() => onUpdateStatus(req.id, 'approved')}
                      className="p-2 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 transition-all cursor-pointer"
                      title="Approve / Confirm"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}

                  {/* Contacted */}
                  {req.status !== 'contacted' && (
                    <button
                      onClick={() => onUpdateStatus(req.id, 'contacted')}
                      className="p-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 transition-all cursor-pointer"
                      title="Flag as Contacted"
                    >
                      <PhoneCall className="w-4 h-4" />
                    </button>
                  )}

                  {/* Delete */}
                  <button
                    onClick={() => onDeleteRequest(req.id)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all cursor-pointer"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
