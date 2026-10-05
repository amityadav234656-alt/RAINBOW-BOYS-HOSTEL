import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useMaintenance } from '../contexts/MaintenanceContext';
import { HOSTEL_FACTS, INITIAL_ANNOUNCEMENTS, INITIAL_MESS_MENU, INITIAL_PAYMENTS } from '../data/mockData';
import { MessMenu, DietaryBadge } from '../components/MessMenu';
import { MaintenanceRequests } from '../components/MaintenanceRequests';
import { Bed, Utensils, AlertCircle, FileText, CheckCircle2, ChevronRight, LogOut, Phone, Shield, Clock, Sparkles, Calendar, Wrench } from 'lucide-react';

interface ResidentDashboardProps {
  onNavigate: (view: string) => void;
}

export const ResidentDashboard: React.FC<ResidentDashboardProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const [showFullWeeklyMenu, setShowFullWeeklyMenu] = useState<boolean>(false);

  // Compute today's day data
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayIndex = new Date().getDay();
  const todayDayName = daysOfWeek[todayIndex];

  const todayMenu =
    INITIAL_MESS_MENU.find((d) => d.dayEnglish.toLowerCase() === todayDayName.toLowerCase()) ||
    INITIAL_MESS_MENU[0]; // Default to Monday if testing

  const { getResidentComplaints } = useMaintenance();
  const residentComplaints = getResidentComplaints(user?.id || 'user-resident-1');
  const activeComplaint = residentComplaints.find((c) => c.status !== 'resolved');
  const pendingCount = residentComplaints.filter((c) => c.status === 'pending').length;
  const inProgressCount = residentComplaints.filter((c) => c.status === 'in_progress').length;

  const residentPayment = INITIAL_PAYMENTS.find((p) => p.residentId === user?.id) || INITIAL_PAYMENTS[0];
  const pinnedAnnouncement = INITIAL_ANNOUNCEMENTS.find((a) => a.isPinned);

  // Determine current active meal based on hour
  const currentHour = new Date().getHours();
  let currentMealKey: 'breakfast' | 'lunch' | 'dinner' = 'lunch';
  if (currentHour < 10) currentMealKey = 'breakfast';
  else if (currentHour < 15) currentMealKey = 'lunch';
  else currentMealKey = 'dinner';

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-16">
      {/* Top Banner Bar */}
      <div className="bg-white border-b border-[#E7E4E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#6D0808]/10 border border-[#6D0808]/20 flex items-center justify-center text-[#6D0808] font-bold text-sm">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'RS'}
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#171717]">
                Welcome back, {user?.name || 'Rahul Sharma'}
              </h1>
              <div className="flex items-center gap-2 text-xs text-[#6B6B6B] mt-0.5">
                <span>{user?.roomNumber || 'Room 204'}</span>
                <span>·</span>
                <span>{user?.bedLabel || 'Bed A'}</span>
                <span>·</span>
                <span className="text-[#15803D] font-medium flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Active Resident
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('landing')}
              className="px-3 py-1.5 text-xs font-medium text-[#171717] bg-[#F8F7F4] hover:bg-[#E7E4E0] border border-[#E7E4E0] rounded-lg transition-colors cursor-pointer"
            >
              Public Home
            </button>
            <button
              onClick={() => {
                logout();
                onNavigate('login');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#6D0808] hover:bg-[#6D0808]/10 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Core Question: "What do I need to know today?" */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: My Rent Status */}
          <div className="bg-white p-5 rounded-xl border border-[#E7E4E0] shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#6B6B6B] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Monthly Rent</span>
              <span className="inline-flex items-center gap-1 text-[#15803D] font-medium bg-[#15803D]/10 px-2 py-0.5 rounded-md text-[11px]">
                <CheckCircle2 className="w-3 h-3" />
                Paid · October 2026
              </span>
            </div>
            <div className="text-2xl font-extrabold text-[#171717] tabular-nums">
              ₹7,400<span className="text-xs text-[#6B6B6B] font-normal"> / month</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#E7E4E0] text-xs text-[#6B6B6B] flex items-center justify-between">
              <span>Receipt Ref: {residentPayment.receiptNumber}</span>
              <span className="text-[#6D0808] font-medium">Next due: 5 Nov 2026</span>
            </div>
          </div>

          {/* Card 2: Today's Mess Overview */}
          <div className="bg-white p-5 rounded-xl border border-[#E7E4E0] shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#6B6B6B] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-[#6D0808]" />
                Today's Food ({todayMenu.dayEnglish})
              </span>
              <DietaryBadge type={todayMenu[currentMealKey].dietary} label={false} />
            </div>
            <div className="text-sm font-semibold text-[#171717] truncate">
              {todayMenu[currentMealKey].nameHindi}
            </div>
            <div className="mt-3 pt-3 border-t border-[#E7E4E0] text-xs text-[#6B6B6B] flex items-center justify-between">
              <span className="capitalize">{currentMealKey}: {HOSTEL_FACTS.messTimings[currentMealKey]}</span>
              <button
                onClick={() => {
                  const el = document.getElementById('today-mess-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#6D0808] font-medium hover:underline cursor-pointer"
              >
                View Full Day ↓
              </button>
            </div>
          </div>

          {/* Card 3: Room & Maintenance */}
          <div className="bg-white p-5 rounded-xl border border-[#E7E4E0] shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#6B6B6B] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-[#6D0808]" />
                Room Maintenance
              </span>
              {inProgressCount > 0 ? (
                <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md text-[11px] font-semibold border border-amber-200">
                  {inProgressCount} In Progress
                </span>
              ) : pendingCount > 0 ? (
                <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md text-[11px] font-medium border border-amber-200">
                  {pendingCount} Pending
                </span>
              ) : (
                <span className="text-[#15803D] bg-green-50 px-2 py-0.5 rounded-md text-[11px] font-medium">
                  All Clear
                </span>
              )}
            </div>
            <div className="text-sm font-medium text-[#171717] truncate">
              {activeComplaint ? activeComplaint.title : 'No active maintenance issues'}
            </div>
            <div className="mt-3 pt-3 border-t border-[#E7E4E0] text-xs text-[#6B6B6B] flex items-center justify-between">
              <span>{user?.roomNumber || 'Room 204'}</span>
              <button
                onClick={() => {
                  document.getElementById('maintenance-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#6D0808] font-medium hover:underline cursor-pointer"
              >
                Track & Report Issues ↓
              </button>
            </div>
          </div>
        </div>

        {/* Pinned Announcement */}
        {pinnedAnnouncement && (
          <div className="bg-white p-5 rounded-xl border-l-4 border-l-[#6D0808] border border-[#E7E4E0] shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#6D0808] uppercase tracking-wide">
                Notice from {pinnedAnnouncement.author}
              </span>
              <span className="text-xs text-[#6B6B6B]">Official Bulletin</span>
            </div>
            <h2 className="text-base font-bold text-[#171717]">{pinnedAnnouncement.title}</h2>
            <p className="mt-1 text-sm text-[#6B6B6B] leading-relaxed">
              {pinnedAnnouncement.content}
            </p>
          </div>
        )}

        {/* SPECIFIC REQUEST: TODAY'S MESS MENU SECTION */}
        <section id="today-mess-section" className="bg-white rounded-xl border border-[#E7E4E0] p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7E4E0] gap-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-[#6D0808] text-white flex items-center justify-center font-bold text-xs">
                  <Utensils className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-lg font-bold text-[#171717]">
                  Today's Mess Menu · {todayMenu.dayEnglish} ({todayMenu.dayHindi})
                </h2>
              </div>
              <p className="text-xs text-[#6B6B6B] mt-1">
                Official 2026–2027 Rainbow Boys Hostel Mess Schedule
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFullWeeklyMenu(!showFullWeeklyMenu)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#6D0808] bg-[#6D0808]/10 hover:bg-[#6D0808]/20 border border-[#6D0808]/20 rounded-lg transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{showFullWeeklyMenu ? 'Hide Weekly Menu' : 'View Full 7-Day Menu'}</span>
              </button>
            </div>
          </div>

          {/* Today's 3 Meals Grid with Dietary Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Breakfast */}
            <div className="p-4 rounded-xl border border-[#E7E4E0] bg-[#F8F7F4] flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#E7E4E0]">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6D0808]">
                      Breakfast / ब्रेकफ़ास्ट
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-[#6B6B6B] mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{HOSTEL_FACTS.messTimings.breakfast}</span>
                    </div>
                  </div>
                  <DietaryBadge type={todayMenu.breakfast.dietary} />
                </div>

                <div className="mt-3 space-y-1">
                  <div className="text-sm font-semibold text-[#171717]">
                    {todayMenu.breakfast.nameHindi}
                  </div>
                  <div className="text-xs text-[#6B6B6B]">
                    {todayMenu.breakfast.nameEnglish}
                  </div>
                  {todayMenu.breakfast.vegAlternative && (
                    <div className="mt-2 text-xs text-[#15803D] bg-green-50 p-2 rounded border border-green-200">
                      <strong>Veg Alternative:</strong> {todayMenu.breakfast.vegAlternative.hindi} ({todayMenu.breakfast.vegAlternative.english})
                    </div>
                  )}
                </div>
              </div>

              <div className="text-[11px] text-[#6B6B6B] pt-2 border-t border-[#E7E4E0]">
                Served with 1 cup fresh hot tea
              </div>
            </div>

            {/* Lunch */}
            <div className="p-4 rounded-xl border border-[#E7E4E0] bg-[#F8F7F4] flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#E7E4E0]">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6D0808]">
                      Lunch / लंच
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-[#6B6B6B] mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{HOSTEL_FACTS.messTimings.lunch}</span>
                    </div>
                  </div>
                  <DietaryBadge type={todayMenu.lunch.dietary} />
                </div>

                <div className="mt-3 space-y-1">
                  <div className="text-sm font-semibold text-[#171717]">
                    {todayMenu.lunch.nameHindi}
                  </div>
                  <div className="text-xs text-[#6B6B6B]">
                    {todayMenu.lunch.nameEnglish}
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-[#6B6B6B] pt-2 border-t border-[#E7E4E0]">
                Fresh salad & pickle included
              </div>
            </div>

            {/* Dinner */}
            <div className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
              todayMenu.dinner.isSpecial
                ? 'bg-amber-50/50 border-amber-300'
                : 'bg-[#F8F7F4] border-[#E7E4E0]'
            }`}>
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#E7E4E0]">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#6D0808]">
                        Dinner / डिनर
                      </span>
                      {todayMenu.dinner.isSpecial && (
                        <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-1 rounded">
                          Special
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#6B6B6B] mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{HOSTEL_FACTS.messTimings.dinner}</span>
                    </div>
                  </div>
                  <DietaryBadge type={todayMenu.dinner.dietary} />
                </div>

                <div className="mt-3 space-y-1">
                  <div className="text-sm font-semibold text-[#171717]">
                    {todayMenu.dinner.nameHindi}
                  </div>
                  <div className="text-xs text-[#6B6B6B]">
                    {todayMenu.dinner.nameEnglish}
                  </div>

                  {todayMenu.dinner.vegAlternative && (
                    <div className="mt-2 text-xs text-[#15803D] bg-green-50 p-2 rounded border border-green-200">
                      <strong>Veg Alternative:</strong> {todayMenu.dinner.vegAlternative.hindi} ({todayMenu.dinner.vegAlternative.english})
                    </div>
                  )}
                </div>
              </div>

              <div className="text-[11px] text-[#6B6B6B] pt-2 border-t border-[#E7E4E0]">
                Fresh salad & pickle included
              </div>
            </div>
          </div>

          {/* Official Rule Banner from Menu Photo */}
          <div className="p-3 bg-[#F3EFEA] rounded-lg border border-[#E7E4E0] text-xs text-[#6B6B6B] flex items-center justify-between">
            <span><strong>Notice:</strong> सलाद व अचार कॉमन है लंच और डिनर में दिया जाएगा।</span>
            <span className="text-[11px]">Timings: Breakfast 8–9:30 AM | Lunch 1–2:30 PM | Dinner 8–9:30 PM</span>
          </div>

          {/* Expanded Full Weekly Schedule View */}
          {showFullWeeklyMenu && (
            <div className="pt-4 border-t border-[#E7E4E0]">
              <h3 className="text-sm font-bold text-[#171717] mb-3">
                Full 7-Day Weekly Meal Schedule & Dietary Breakdown
              </h3>
              <MessMenu initialDay={todayMenu.dayEnglish} />
            </div>
          )}
        </section>

        {/* SPECIFIC REQUEST: ROOM MAINTENANCE & STATUS TRACKER */}
        <section id="maintenance-section">
          <MaintenanceRequests />
        </section>

        {/* My Room & Furniture Breakdown */}
        <div className="bg-white rounded-xl border border-[#E7E4E0] p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#E7E4E0]">
            <div>
              <h2 className="text-base font-bold text-[#171717]">My Assigned Space & Inventory</h2>
              <p className="text-xs text-[#6B6B6B]">
                {user?.roomNumber || 'Room 204'} · Floor {user?.floor || 2} · {user?.bedLabel || 'Bed A'}
              </p>
            </div>
            <div className="text-right text-xs">
              <span className="text-[#6B6B6B] block">Joining Date</span>
              <span className="font-semibold text-[#171717]">{user?.joiningDate || '12 August 2026'}</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#F8F7F4] border border-[#E7E4E0]">
              <span className="font-semibold text-[#171717] block">Double Sharing Setup</span>
              <span className="text-[#6B6B6B] mt-0.5 block">2 Beds · Assigned to {user?.name || 'Rahul'} & Roommate</span>
            </div>
            <div className="p-3 rounded-lg bg-[#F8F7F4] border border-[#E7E4E0]">
              <span className="font-semibold text-[#171717] block">Study Equipment</span>
              <span className="text-[#6B6B6B] mt-0.5 block">2 Chairs & Dedicated Study Table</span>
            </div>
            <div className="p-3 rounded-lg bg-[#F8F7F4] border border-[#E7E4E0]">
              <span className="font-semibold text-[#171717] block">Personal Storage</span>
              <span className="text-[#6B6B6B] mt-0.5 block">Almirah & Wall-mounted Shelves</span>
            </div>
          </div>
        </div>

        {/* Quick Emergency Assistance */}
        <div className="p-4 bg-[#F3EFEA] rounded-xl border border-[#E7E4E0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#171717]">
            <Phone className="w-4 h-4 text-[#6D0808]" />
            <span>Need immediate warden assistance? <strong>{HOSTEL_FACTS.contact.phone}</strong> (9 AM – 8 PM)</span>
          </div>
          <span className="text-[#6B6B6B]">Hostel Office: 1st Floor, Entrance Room</span>
        </div>
      </div>
    </div>
  );
};
