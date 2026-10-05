import React from 'react';
import { HOSTEL_FACTS, INITIAL_MESS_MENU } from '../data/mockData';
import { MessMenu } from '../components/MessMenu';
import { ArrowRight, Bed, Clock, Users, Building, ShieldCheck, Phone, Check, ChevronRight } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F8F7F4] text-[#171717] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#E7E4E0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#6D0808]/10 border border-[#6D0808]/20 text-[#6D0808] text-xs font-semibold tracking-wide uppercase">
                Official Digital Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171717] leading-[1.1] text-balance">
                Your stay, made simpler.
              </h1>

              <p className="text-base sm:text-lg text-[#6B6B6B] max-w-2xl leading-relaxed">
                A simple digital experience for residents of Rainbow Boys Hostel — rooms, mess menu, payments, announcements and everyday hostel services in one place.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('login')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#6D0808] hover:bg-[#540505] shadow-sm transition-all cursor-pointer group"
                >
                  <span>Resident Login</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('contact-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-[#171717] bg-white hover:bg-[#F3EFEA] border border-[#E7E4E0] transition-colors cursor-pointer"
                >
                  Hostel Information
                </button>
              </div>

              {/* Verified Property Footnote */}
              <div className="pt-4 flex items-center gap-2 text-xs text-[#6B6B6B]">
                <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                <span>Single building · 3 floors · 33 rooms · Verified Rainbow Boys Hostel property</span>
              </div>
            </div>

            {/* Right Visual: Hostel Property Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-[#E7E4E0] bg-white p-3 shadow-sm overflow-hidden">
                {/* Visual Image container with fallback */}
                <div className="relative aspect-4/3 rounded-xl bg-gradient-to-tr from-[#6D0808]/15 via-[#F3EFEA] to-[#6D0808]/5 border border-[#E7E4E0] overflow-hidden flex flex-col justify-end p-6">
                  {/* Visual overlay tag */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs border border-[#E7E4E0] rounded-md px-2.5 py-1 text-[11px] font-semibold text-[#171717]">
                    Rainbow Boys Hostel · 1 Building
                  </div>

                  {/* Property Specs highlight on image */}
                  <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-lg p-4 border border-[#E7E4E0] shadow-2xs space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#171717]">Current Status</span>
                      <span className="text-[#15803D] font-medium flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
                        Admissions Open
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#E7E4E0] text-xs text-[#6B6B6B]">
                      <div>
                        <span className="block text-[10px] uppercase text-[#6B6B6B]">Room Type</span>
                        <span className="font-medium text-[#171717]">Double Sharing</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase text-[#6B6B6B]">Monthly Rent</span>
                        <span className="font-semibold text-[#6D0808]">₹7,400</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 text-center">
                  <p className="text-xs text-[#6B6B6B]">
                    Located near the main university campus road. Verified residential capacity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Facts Matrix (No Invented Perks) */}
      <section className="py-14 bg-white border-b border-[#E7E4E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-[#6D0808] uppercase tracking-wider">
              Property Overview
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#171717]">
              Verified Hostel Facts
            </h2>
            <p className="mt-1 text-sm text-[#6B6B6B]">
              Factual information confirmed directly from hostel operations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl border border-[#E7E4E0] bg-[#F8F7F4] text-center">
              <Building className="w-5 h-5 mx-auto text-[#6D0808] mb-2" />
              <div className="text-3xl font-extrabold text-[#171717] tabular-nums">33</div>
              <div className="text-xs font-semibold text-[#171717] mt-1">Total Rooms</div>
              <div className="text-[11px] text-[#6B6B6B]">Across 3 floors</div>
            </div>

            <div className="p-5 rounded-xl border border-[#E7E4E0] bg-[#F8F7F4] text-center">
              <Bed className="w-5 h-5 mx-auto text-[#6D0808] mb-2" />
              <div className="text-3xl font-extrabold text-[#171717] tabular-nums">66</div>
              <div className="text-xs font-semibold text-[#171717] mt-1">Total Beds</div>
              <div className="text-[11px] text-[#6B6B6B]">2 beds per room</div>
            </div>

            <div className="p-5 rounded-xl border border-[#E7E4E0] bg-[#F8F7F4] text-center">
              <Users className="w-5 h-5 mx-auto text-[#6D0808] mb-2" />
              <div className="text-3xl font-extrabold text-[#171717]">Double</div>
              <div className="text-xs font-semibold text-[#171717] mt-1">Room Sharing</div>
              <div className="text-[11px] text-[#6B6B6B]">Bed A & Bed B</div>
            </div>

            <div className="p-5 rounded-xl border border-[#E7E4E0] bg-[#F8F7F4] text-center">
              <div className="text-3xl font-extrabold text-[#6D0808] tabular-nums">₹7,400</div>
              <div className="text-xs font-semibold text-[#171717] mt-1">Monthly Rent</div>
              <div className="text-[11px] text-[#6B6B6B]">Two-month: ₹14,400</div>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmed Room Inventory Section */}
      <section id="rooms-section" className="py-16 border-b border-[#E7E4E0] bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-semibold text-[#6D0808] uppercase tracking-wider">
                Accommodation
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-[#171717]">
                Your room, your space.
              </h2>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">
                Every room at Rainbow Boys Hostel is designed for comfortable shared student living with confirmed dedicated furniture and individual storage.
              </p>

              {/* Confirmed Furniture Checklist */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                  Confirmed Room Furniture Included:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {HOSTEL_FACTS.furniture.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-[#E7E4E0] text-xs text-[#171717]"
                    >
                      <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => onNavigate('login')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#6D0808] hover:bg-[#540505] rounded-lg transition-colors cursor-pointer"
                >
                  <span>Resident Portal Access</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-[#E7E4E0] bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E4E0]">
                  <div>
                    <span className="text-base font-bold text-[#171717]">Double Sharing Room</span>
                    <p className="text-xs text-[#6B6B6B]">Standard Room Configuration (Floors 1–3)</p>
                  </div>
                  <span className="text-sm font-bold text-[#6D0808]">₹7,400 / mo</span>
                </div>

                <div className="aspect-16/10 rounded-xl bg-gradient-to-br from-[#F3EFEA] to-[#E7E4E0]/40 border border-[#E7E4E0] flex flex-col items-center justify-center p-6 text-center">
                  <Bed className="w-10 h-10 text-[#6D0808]/60 mb-2" />
                  <span className="text-xs font-semibold text-[#171717]">Twin Bed Setup</span>
                  <span className="text-[11px] text-[#6B6B6B] mt-0.5">2 Beds · 2 Chairs · Study Table · Almirah & Shelves</span>
                </div>

                <div className="p-3 bg-[#F8F7F4] rounded-lg border border-[#E7E4E0] text-xs text-[#6B6B6B]">
                  <strong>Current Vacancy Status:</strong> Approximately 3–4 rooms usually vacant. Check live vacancy with the warden desk.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mess & Dining Section */}
      <section id="mess-section" className="py-16 bg-white border-b border-[#E7E4E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-[#6D0808] uppercase tracking-wider">
              Hostel Mess
            </span>
            <h2 className="mt-1 text-3xl font-bold tracking-tight text-[#171717]">
              Mess Timings & Weekly Schedule
            </h2>
            <p className="mt-1 text-sm text-[#6B6B6B]">
              Hot, freshly prepared student meals served daily per the official 2026–2027 mess schedule.
            </p>
          </div>

          {/* Interactive Weekly Mess Menu with Dietary Indicators */}
          <MessMenu />
        </div>
      </section>

      {/* Contact & Hostel Information */}
      <section id="contact-section" className="py-16 bg-[#F8F7F4] border-b border-[#E7E4E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-[#E7E4E0] p-8 md:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-semibold text-[#6D0808] uppercase tracking-wider">
                  Contact & Assistance
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171717]">
                  Rainbow Boys Hostel Office
                </h2>
                <p className="text-sm text-[#6B6B6B] max-w-xl">
                  Have inquiries regarding double-sharing room admissions, fee structures, or current vacancies? Connect directly with the warden desk.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-4 text-xs text-[#171717]">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#6D0808]" />
                    <span>{HOSTEL_FACTS.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#6D0808]" />
                    <span>{HOSTEL_FACTS.contact.hours}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <button
                  onClick={() => onNavigate('login')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold text-white bg-[#6D0808] hover:bg-[#540505] transition-colors shadow-sm cursor-pointer"
                >
                  <span>Sign In as Resident</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium text-[#171717] bg-[#F8F7F4] hover:bg-[#E7E4E0] border border-[#E7E4E0] transition-colors cursor-pointer"
                >
                  <span>Staff / Warden Portal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white text-xs text-[#6B6B6B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#171717]">RAINBOW ONE</span>
            <span>·</span>
            <span>Rainbow Boys Hostel © 2026</span>
          </div>
          <div>
            <span>Everything your hostel needs, in one place.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
