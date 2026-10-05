import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useMaintenance } from '../contexts/MaintenanceContext';
import { HOSTEL_FACTS, INITIAL_ROOMS } from '../data/mockData';
import { MaintenanceRequests } from '../components/MaintenanceRequests';
import { Building, Users, AlertTriangle, CheckCircle2, Bed, LogOut, Wrench } from 'lucide-react';

interface ManagementDashboardProps {
  onNavigate: (view: string) => void;
}

export const ManagementDashboard: React.FC<ManagementDashboardProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const [selectedFloor, setSelectedFloor] = useState<number>(1);

  // Compute live occupancy metrics directly from INITIAL_ROOMS (no fake hardcoded stats)
  const totalRooms = INITIAL_ROOMS.length; // 33
  const totalBeds = INITIAL_ROOMS.reduce((acc, r) => acc + r.beds.length, 0); // 66
  const occupiedBeds = INITIAL_ROOMS.reduce(
    (acc, r) => acc + r.beds.filter((b) => b.isOccupied).length,
    0
  );
  const vacantBeds = totalBeds - occupiedBeds;

  const floorRooms = INITIAL_ROOMS.filter((r) => r.floor === selectedFloor);

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-16">
      {/* Top Banner Bar */}
      <div className="bg-white border-b border-[#E7E4E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#6D0808] text-white rounded">
                {user?.role === 'admin' ? 'Owner / Admin' : 'Warden Desk'}
              </span>
              <h1 className="text-xl font-bold text-[#171717]">
                Rainbow Boys Hostel · Management
              </h1>
            </div>
            <p className="text-xs text-[#6B6B6B] mt-0.5">
              Logged in as <strong>{user?.name || 'Suresh Kumar'}</strong> ({user?.email})
            </p>
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
        {/* Real Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#E7E4E0] shadow-2xs">
            <div className="text-xs text-[#6B6B6B] font-semibold uppercase tracking-wider">Total Rooms</div>
            <div className="text-2xl font-bold text-[#171717] mt-1 tabular-nums">
              {totalRooms} <span className="text-xs font-normal text-[#6B6B6B]">rooms</span>
            </div>
            <div className="text-[11px] text-[#6B6B6B] mt-1">3 floors · 11 per floor</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E7E4E0] shadow-2xs">
            <div className="text-xs text-[#6B6B6B] font-semibold uppercase tracking-wider">Bed Capacity</div>
            <div className="text-2xl font-bold text-[#171717] mt-1 tabular-nums">
              {totalBeds} <span className="text-xs font-normal text-[#6B6B6B]">beds</span>
            </div>
            <div className="text-[11px] text-[#6B6B6B] mt-1">2 beds per room</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E7E4E0] shadow-2xs">
            <div className="text-xs text-[#6B6B6B] font-semibold uppercase tracking-wider">Occupied Beds</div>
            <div className="text-2xl font-bold text-[#15803D] mt-1 tabular-nums">
              {occupiedBeds} <span className="text-xs font-normal text-[#6B6B6B]">occupied</span>
            </div>
            <div className="text-[11px] text-[#6B6B6B] mt-1">
              {Math.round((occupiedBeds / totalBeds) * 100)}% occupancy rate
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E7E4E0] shadow-2xs">
            <div className="text-xs text-[#6B6B6B] font-semibold uppercase tracking-wider">Vacant Beds</div>
            <div className="text-2xl font-bold text-amber-700 mt-1 tabular-nums">
              {vacantBeds} <span className="text-xs font-normal text-[#6B6B6B]">vacant</span>
            </div>
            <div className="text-[11px] text-[#6B6B6B] mt-1">Matches ~3–4 vacant rooms</div>
          </div>
        </div>

        {/* Room & Bed Matrix Visualizer */}
        <div className="bg-white rounded-xl border border-[#E7E4E0] p-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7E4E0] gap-3">
            <div>
              <h2 className="text-base font-bold text-[#171717]">Floor-by-Floor Room Occupancy</h2>
              <p className="text-xs text-[#6B6B6B]">
                Click rooms to inspect Bed A and Bed B occupant allocations
              </p>
            </div>

            {/* Floor selector tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#F3EFEA] rounded-lg border border-[#E7E4E0]">
              {[1, 2, 3].map((floor) => (
                <button
                  key={floor}
                  onClick={() => setSelectedFloor(floor)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    selectedFloor === floor
                      ? 'bg-white text-[#6D0808] font-bold shadow-xs'
                      : 'text-[#6B6B6B] hover:text-[#171717]'
                  }`}
                >
                  Floor {floor} (Rooms {floor}01–{floor}11)
                </button>
              ))}
            </div>
          </div>

          {/* Rooms Grid for selected floor */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-5">
            {floorRooms.map((room) => {
              const occCount = room.beds.filter((b) => b.isOccupied).length;
              return (
                <div
                  key={room.id}
                  className={`p-3.5 rounded-lg border transition-all text-xs ${
                    occCount === 2
                      ? 'bg-[#F8F7F4] border-[#E7E4E0]'
                      : occCount === 1
                      ? 'bg-amber-50/50 border-amber-200'
                      : 'bg-green-50/60 border-green-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-[#171717] mb-2">
                    <span>{room.roomNumber}</span>
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        occCount === 2
                          ? 'bg-[#171717]/10 text-[#171717]'
                          : occCount === 1
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {occCount}/2 Beds
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-1 text-[11px] text-[#6B6B6B]">
                    {room.beds.map((b) => (
                      <div key={b.id} className="flex items-center justify-between">
                        <span>{b.label}:</span>
                        <span className={b.isOccupied ? 'text-[#171717] font-medium' : 'text-green-700 italic'}>
                          {b.isOccupied ? b.residentName || 'Occupied' : 'Vacant'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Maintenance Desk & Complaint Dispatch */}
        <section id="warden-maintenance-section">
          <MaintenanceRequests />
        </section>
      </div>
    </div>
  );
};
