import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useMaintenance } from '../contexts/MaintenanceContext';
import { Complaint, ComplaintCategory, ComplaintStatus } from '../types';
import {
  Wrench,
  AlertCircle,
  CheckCircle2,
  Clock,
  Plus,
  Zap,
  Droplets,
  Armchair,
  Wind,
  Wifi,
  Sparkles,
  HelpCircle,
  X,
  ChevronRight,
  Filter,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';

interface MaintenanceRequestsProps {
  compact?: boolean;
}

// Category visual helper
export const getCategoryIcon = (category: ComplaintCategory) => {
  switch (category) {
    case 'Electrical':
      return <Zap className="w-4 h-4 text-amber-600" />;
    case 'Plumbing':
    case 'Water':
      return <Droplets className="w-4 h-4 text-blue-600" />;
    case 'Fan':
      return <Wind className="w-4 h-4 text-cyan-600" />;
    case 'Furniture':
      return <Armchair className="w-4 h-4 text-amber-700" />;
    case 'Internet':
      return <Wifi className="w-4 h-4 text-indigo-600" />;
    case 'Cleaning':
      return <Sparkles className="w-4 h-4 text-emerald-600" />;
    default:
      return <Wrench className="w-4 h-4 text-neutral-600" />;
  }
};

// Visual Status Tracker for 3 stages: Pending -> In Progress -> Resolved
export const StatusTrackerTimeline: React.FC<{ status: ComplaintStatus }> = ({ status }) => {
  const stages: { key: ComplaintStatus; label: string; desc: string }[] = [
    { key: 'pending', label: 'Pending', desc: 'Received & queued' },
    { key: 'in_progress', label: 'In Progress', desc: 'Technician assigned' },
    { key: 'resolved', label: 'Resolved', desc: 'Work inspected & done' },
  ];

  const getStageIndex = (s: ComplaintStatus) => {
    switch (s) {
      case 'pending':
        return 0;
      case 'in_progress':
        return 1;
      case 'resolved':
        return 2;
      default:
        return 0;
    }
  };

  const currentIndex = getStageIndex(status);

  return (
    <div className="w-full pt-3 pb-1">
      <div className="relative flex items-center justify-between">
        {/* Connecting track line */}
        <div className="absolute top-3.5 left-4 right-4 h-0.5 bg-[#E7E4E0] -z-0">
          <div
            className="h-full bg-[#6D0808] transition-all duration-300"
            style={{
              width: currentIndex === 0 ? '0%' : currentIndex === 1 ? '50%' : '100%',
            }}
          />
        </div>

        {/* Step Nodes */}
        {stages.map((stage, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isPendingFuture = idx > currentIndex;

          return (
            <div key={stage.key} className="flex flex-col items-center text-center z-10">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isDone
                    ? 'bg-[#15803D] text-white ring-4 ring-[#F0FDF4]'
                    : isCurrent
                    ? status === 'resolved'
                      ? 'bg-[#15803D] text-white ring-4 ring-[#F0FDF4]'
                      : status === 'in_progress'
                      ? 'bg-[#171717] text-white ring-4 ring-[#F3EFEA]'
                      : 'bg-amber-600 text-white ring-4 ring-amber-50'
                    : 'bg-white border-2 border-[#E7E4E0] text-[#6B6B6B]'
                }`}
              >
                {isDone || (isCurrent && status === 'resolved') ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : isCurrent ? (
                  <span className="w-2 h-2 rounded-full bg-white" />
                ) : (
                  <span className="text-[10px]">{idx + 1}</span>
                )}
              </div>

              <span
                className={`mt-1.5 text-xs font-semibold ${
                  isCurrent ? 'text-[#171717]' : isDone ? 'text-[#15803D]' : 'text-[#6B6B6B]'
                }`}
              >
                {stage.label}
              </span>
              <span className="text-[10px] text-[#6B6B6B] hidden sm:block">
                {stage.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const MaintenanceRequests: React.FC<MaintenanceRequestsProps> = ({ compact = false }) => {
  const { user } = useAuth();
  const { complaints, addComplaint, updateComplaintStatus, getResidentComplaints } = useMaintenance();

  const isManagement = user?.role === 'warden' || user?.role === 'admin';
  const displayComplaints = isManagement
    ? complaints
    : getResidentComplaints(user?.id || 'user-resident-1');

  // Filter state
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in_progress' | 'resolved'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // New Complaint Form state
  const [category, setCategory] = useState<ComplaintCategory>('Plumbing');
  const [priority, setPriority] = useState<'normal' | 'urgent'>('normal');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const categories: ComplaintCategory[] = [
    'Electrical',
    'Plumbing',
    'Furniture',
    'Fan',
    'Water',
    'Internet',
    'Cleaning',
    'Other',
  ];

  const filteredList = displayComplaints.filter((item) => {
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFormError('Please enter a brief issue title.');
      return;
    }
    if (!description.trim()) {
      setFormError('Please describe the problem so maintenance staff can bring the right tools.');
      return;
    }

    addComplaint({
      title,
      description,
      category,
      priority,
      residentId: user?.id || 'user-resident-1',
      residentName: user?.name || 'Rahul Sharma',
      roomNumber: user?.roomNumber || 'Room 204',
    });

    setTitle('');
    setDescription('');
    setCategory('Plumbing');
    setPriority('normal');
    setIsModalOpen(false);

    setSuccessMessage('Maintenance request submitted successfully. Status is now set to Pending.');
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Actions */}
      <div className="bg-white p-5 rounded-xl border border-[#E7E4E0] shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#6D0808]/10 text-[#6D0808] flex items-center justify-center">
                <Wrench className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-[#171717]">
                Room Maintenance & Complaints
              </h2>
            </div>
            <p className="text-xs text-[#6B6B6B] mt-0.5">
              Report broken fixtures, electrical, plumbing, or room furniture issues with live status tracking.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#6D0808] hover:bg-[#540505] rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Report an Issue</span>
          </button>
        </div>

        {/* Filters Strip */}
        <div className="mt-5 pt-4 border-t border-[#E7E4E0] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-[#6B6B6B] font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Status:
            </span>
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                filterStatus === 'all'
                  ? 'bg-[#171717] text-white shadow-2xs'
                  : 'bg-[#F8F7F4] text-[#6B6B6B] hover:text-[#171717]'
              }`}
            >
              All ({displayComplaints.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                filterStatus === 'pending'
                  ? 'bg-amber-600 text-white shadow-2xs font-semibold'
                  : 'bg-[#F8F7F4] text-[#6B6B6B] hover:text-[#171717]'
              }`}
            >
              Pending ({displayComplaints.filter((c) => c.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilterStatus('in_progress')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                filterStatus === 'in_progress'
                  ? 'bg-[#171717] text-white shadow-2xs font-semibold'
                  : 'bg-[#F8F7F4] text-[#6B6B6B] hover:text-[#171717]'
              }`}
            >
              In Progress ({displayComplaints.filter((c) => c.status === 'in_progress').length})
            </button>
            <button
              onClick={() => setFilterStatus('resolved')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                filterStatus === 'resolved'
                  ? 'bg-[#15803D] text-white shadow-2xs font-semibold'
                  : 'bg-[#F8F7F4] text-[#6B6B6B] hover:text-[#171717]'
              }`}
            >
              Resolved ({displayComplaints.filter((c) => c.status === 'resolved').length})
            </button>
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-[#F8F7F4] border border-[#E7E4E0] rounded-md px-2.5 py-1 text-xs text-[#171717] focus:outline-none focus:border-[#6D0808]"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successMessage && (
        <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
            <span>{successMessage}</span>
          </div>
          <button
            onClick={() => setSuccessMessage(null)}
            className="text-green-800/60 hover:text-green-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Complaints List Cards with Status Tracker */}
      {filteredList.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E7E4E0] p-10 text-center space-y-2">
          <CheckCircle2 className="w-10 h-10 text-[#15803D] mx-auto opacity-80" />
          <h3 className="text-sm font-bold text-[#171717]">You're all caught up!</h3>
          <p className="text-xs text-[#6B6B6B] max-w-sm mx-auto">
            No maintenance issues match the selected filter. Click "Report an Issue" if you need hostel repairs.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredList.map((complaint) => {
            const isPending = complaint.status === 'pending';
            const isInProgress = complaint.status === 'in_progress';
            const isResolved = complaint.status === 'resolved';

            return (
              <div
                key={complaint.id}
                className="bg-white rounded-xl border border-[#E7E4E0] p-5 shadow-2xs space-y-4 transition-all hover:border-[#6D0808]/40"
              >
                {/* Header: Category, Priority, Date, Room */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E7E4E0] gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F8F7F4] border border-[#E7E4E0] text-xs font-semibold text-[#171717]">
                      {getCategoryIcon(complaint.category)}
                      <span>{complaint.category}</span>
                    </span>

                    {complaint.priority === 'urgent' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                        <ShieldAlert className="w-3 h-3" />
                        Urgent
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-[#6B6B6B] bg-[#F8F7F4] px-2 py-0.5 rounded border border-[#E7E4E0]">
                        Normal
                      </span>
                    )}

                    <span className="text-xs text-[#6B6B6B]">
                      Ticket #{complaint.id.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#6B6B6B]">
                    <span className="font-semibold text-[#171717]">{complaint.roomNumber}</span>
                    <span>·</span>
                    <span>
                      {new Date(complaint.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div>
                  <h3 className="text-base font-bold text-[#171717] leading-snug">
                    {complaint.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#6B6B6B] leading-relaxed">
                    {complaint.description}
                  </p>
                </div>

                {/* THE STATUS TRACKER TIMELINE */}
                <div className="pt-2 border-t border-[#E7E4E0]">
                  <StatusTrackerTimeline status={complaint.status} />
                </div>

                {/* Staff / Technician Notes */}
                {complaint.internalNotes && (
                  <div className="mt-3 p-3 bg-[#F8F7F4] rounded-lg border border-[#E7E4E0] text-xs space-y-1">
                    <div className="flex items-center justify-between text-[#6B6B6B] text-[11px]">
                      <span className="font-semibold text-[#171717] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#6D0808]" />
                        Warden & Technician Dispatch Update:
                      </span>
                      {complaint.updatedAt && (
                        <span>
                          Updated:{' '}
                          {new Date(complaint.updatedAt).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      )}
                    </div>
                    <p className="text-[#171717] font-medium">{complaint.internalNotes}</p>
                  </div>
                )}

                {/* Staff Control (Available for Warden / Admin to easily transition status) */}
                {isManagement && (
                  <div className="pt-3 border-t border-dashed border-[#E7E4E0] flex items-center justify-between text-xs bg-amber-50/50 p-2.5 rounded-lg border border-amber-200">
                    <span className="font-semibold text-amber-900">
                      Warden Control (Status Switcher):
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateComplaintStatus(complaint.id, 'pending', 'Ticket re-opened for inspection.')
                        }
                        className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                          isPending ? 'bg-amber-600 text-white font-bold' : 'bg-white text-amber-900 border border-amber-300'
                        }`}
                      >
                        Pending
                      </button>
                      <button
                        onClick={() =>
                          updateComplaintStatus(complaint.id, 'in_progress', 'Technician dispatched to Room 204.')
                        }
                        className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                          isInProgress ? 'bg-[#171717] text-white font-bold' : 'bg-white text-[#171717] border border-[#E7E4E0]'
                        }`}
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() =>
                          updateComplaintStatus(complaint.id, 'resolved', 'Fix inspected and confirmed resolved.')
                        }
                        className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                          isResolved ? 'bg-[#15803D] text-white font-bold' : 'bg-white text-[#15803D] border border-green-300'
                        }`}
                      >
                        Resolved
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Report New Maintenance Issue */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-[#E7E4E0] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#E7E4E0] flex items-center justify-between bg-[#F8F7F4]">
              <div>
                <h3 className="text-base font-bold text-[#171717]">Report a Maintenance Issue</h3>
                <p className="text-xs text-[#6B6B6B]">
                  Rainbow Boys Hostel · {user?.roomNumber || 'Room 204'}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#6B6B6B] hover:text-[#171717] p-1 rounded-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              {formError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Room Auto-assigned */}
              <div>
                <label className="block font-semibold text-[#171717] mb-1">Assigned Room</label>
                <input
                  type="text"
                  disabled
                  value={`${user?.roomNumber || 'Room 204'} (Floor ${user?.floor || 2}) · ${user?.name || 'Rahul Sharma'}`}
                  className="w-full bg-[#F3EFEA] border border-[#E7E4E0] rounded-lg px-3 py-2 text-[#6B6B6B] cursor-not-allowed font-medium"
                />
              </div>

              {/* Category Selection */}
              <div>
                <label className="block font-semibold text-[#171717] mb-1.5">Issue Category</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {categories.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`p-2 rounded-lg border text-center flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        category === c
                          ? 'border-[#6D0808] bg-[#6D0808]/10 text-[#6D0808] font-bold shadow-2xs'
                          : 'border-[#E7E4E0] bg-white text-[#6B6B6B] hover:text-[#171717]'
                      }`}
                    >
                      {getCategoryIcon(c)}
                      <span className="text-[11px]">{c}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block font-semibold text-[#171717] mb-1.5">Priority Level</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPriority('normal')}
                    className={`py-2 px-3 rounded-lg border text-center transition-all cursor-pointer ${
                      priority === 'normal'
                        ? 'border-[#171717] bg-[#171717] text-white font-semibold'
                        : 'border-[#E7E4E0] bg-white text-[#6B6B6B] hover:text-[#171717]'
                    }`}
                  >
                    <span>Normal (Within 24–48 hrs)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriority('urgent')}
                    className={`py-2 px-3 rounded-lg border text-center transition-all cursor-pointer ${
                      priority === 'urgent'
                        ? 'border-red-600 bg-red-600 text-white font-semibold'
                        : 'border-[#E7E4E0] bg-white text-[#6B6B6B] hover:text-red-700'
                    }`}
                  >
                    <span>Urgent (Water / Electrical)</span>
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="issue-title" className="block font-semibold text-[#171717] mb-1">
                  Issue Title
                </label>
                <input
                  id="issue-title"
                  type="text"
                  required
                  placeholder="e.g. Washroom tap continuously leaking or study chair leg loose"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white border border-[#E7E4E0] rounded-lg px-3 py-2 text-[#171717] focus:outline-none focus:border-[#6D0808] focus:ring-1 focus:ring-[#6D0808]"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="issue-desc" className="block font-semibold text-[#171717] mb-1">
                  Detailed Description
                </label>
                <textarea
                  id="issue-desc"
                  rows={3}
                  required
                  placeholder="Please describe what is happening, where in the room it is located, and how long it has been broken..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white border border-[#E7E4E0] rounded-lg px-3 py-2 text-[#171717] focus:outline-none focus:border-[#6D0808] focus:ring-1 focus:ring-[#6D0808]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E7E4E0]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#E7E4E0] rounded-lg text-[#6B6B6B] hover:text-[#171717] hover:bg-[#F3EFEA] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#6D0808] hover:bg-[#540505] text-white font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Submit Maintenance Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
