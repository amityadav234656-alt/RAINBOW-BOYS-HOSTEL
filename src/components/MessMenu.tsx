import React, { useState } from 'react';
import { HOSTEL_FACTS, INITIAL_MESS_MENU } from '../data/mockData';
import { DietaryType, MealItem, MessMenuDay } from '../types';
import { Clock, Utensils, Sparkles, AlertCircle, Info, ChevronRight, Check } from 'lucide-react';

interface MessMenuProps {
  initialDay?: string; // e.g. 'Monday'
  compact?: boolean;
}

// Visual dietary icon in standard Indian Food Safety (FSSAI) style
export const DietaryBadge: React.FC<{ type: DietaryType; label?: boolean }> = ({ type, label = true }) => {
  if (type === 'veg') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-[#15803D] font-medium">
        <span className="w-3.5 h-3.5 border-1.5 border-[#15803D] rounded-xs flex items-center justify-center p-0.5 bg-white shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#15803D]" />
        </span>
        {label && <span>Pure Veg</span>}
      </span>
    );
  }

  if (type === 'egg') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-amber-700 font-medium">
        <span className="w-3.5 h-3.5 border-1.5 border-amber-600 rounded-xs flex items-center justify-center p-0.5 bg-white shrink-0">
          <span className="w-2 h-2 rounded-full bg-amber-600" />
        </span>
        {label && <span>Contains Egg</span>}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-red-700 font-medium">
      <span className="w-3.5 h-3.5 border-1.5 border-red-700 rounded-xs flex items-center justify-center p-0.5 bg-white shrink-0">
        <span className="w-2 h-2 rounded-full bg-red-700" />
      </span>
      {label && <span>Non-Veg (Chicken)</span>}
    </span>
  );
};

export const MessMenu: React.FC<MessMenuProps> = ({ initialDay, compact = false }) => {
  // Determine current day of week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = daysOfWeek[new Date().getDay()];

  const [selectedDay, setSelectedDay] = useState<string>(
    initialDay || (todayName as string)
  );
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [languageMode, setLanguageMode] = useState<'bilingual' | 'hindi' | 'english'>('bilingual');

  const currentDayData =
    INITIAL_MESS_MENU.find((d) => d.dayEnglish.toLowerCase() === selectedDay.toLowerCase()) ||
    INITIAL_MESS_MENU[0];

  // Helper to render meal card
  const renderMealCard = (title: string, timing: string, meal: MealItem) => {
    const isFilteredOut = dietaryFilter === 'veg' && meal.dietary !== 'veg' && !meal.vegAlternative;

    return (
      <div
        className={`p-5 rounded-xl border transition-all ${
          meal.isSpecial
            ? 'bg-gradient-to-b from-[#FFFDF8] to-[#FFF9EE] border-amber-300/80 shadow-xs'
            : 'bg-white border-[#E7E4E0] shadow-2xs'
        } ${isFilteredOut ? 'opacity-40' : ''}`}
      >
        {/* Top Header: Meal Name & Timing */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E7E4E0]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6D0808]">
                {title}
              </span>
              {meal.isSpecial && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  Special Menu
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B] mt-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{timing}</span>
            </div>
          </div>

          <DietaryBadge type={meal.dietary} />
        </div>

        {/* Meal Content */}
        <div className="mt-3.5 space-y-2">
          {languageMode !== 'english' && (
            <div className="text-sm font-semibold text-[#171717] leading-snug">
              {meal.nameHindi}
            </div>
          )}

          {languageMode !== 'hindi' && (
            <div className="text-xs text-[#6B6B6B] font-medium leading-relaxed">
              {meal.nameEnglish}
            </div>
          )}

          {/* Veg Alternative if applicable */}
          {meal.vegAlternative && (
            <div className="mt-3 pt-2.5 border-t border-dashed border-[#E7E4E0] bg-[#F0FDF4]/70 p-2.5 rounded-lg border border-[#BBF7D0]">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#15803D]">
                <DietaryBadge type="veg" label={false} />
                <span>Veg Alternative Available:</span>
              </div>
              <p className="text-xs text-[#15803D] mt-0.5 font-medium">
                {languageMode === 'english'
                  ? meal.vegAlternative.english
                  : languageMode === 'hindi'
                  ? meal.vegAlternative.hindi
                  : `${meal.vegAlternative.hindi} (${meal.vegAlternative.english})`}
              </p>
            </div>
          )}

          {/* Notes */}
          {meal.notes && (
            <div className="text-[11px] text-[#6B6B6B] pt-1 flex items-center gap-1">
              <span className="text-[#6D0808]">•</span>
              <span>{meal.notes}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="bg-white p-5 rounded-xl border border-[#E7E4E0] shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[#6D0808]/10 text-[#6D0808] flex items-center justify-center">
                <Utensils className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-[#171717]">
                Mess Schedule · 2026–2027
              </h2>
            </div>
            <p className="text-xs text-[#6B6B6B] mt-0.5">
              Official printed menu for Rainbow Boys Hostel. Daily timing adherence required.
            </p>
          </div>

          {/* Filters & Toggles */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Dietary filter */}
            <div className="flex items-center gap-1 p-1 bg-[#F3EFEA] rounded-lg border border-[#E7E4E0] text-xs">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  dietaryFilter === 'all'
                    ? 'bg-white text-[#171717] shadow-xs'
                    : 'text-[#6B6B6B] hover:text-[#171717]'
                }`}
              >
                All Meals
              </button>
              <button
                onClick={() => setDietaryFilter('veg')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                  dietaryFilter === 'veg'
                    ? 'bg-white text-[#15803D] shadow-xs font-semibold'
                    : 'text-[#6B6B6B] hover:text-[#171717]'
                }`}
              >
                <DietaryBadge type="veg" label={false} />
                <span>Veg Only</span>
              </button>
            </div>

            {/* Language Mode Toggle */}
            <div className="flex items-center gap-1 p-1 bg-[#F3EFEA] rounded-lg border border-[#E7E4E0] text-xs">
              <button
                onClick={() => setLanguageMode('bilingual')}
                className={`px-2 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  languageMode === 'bilingual'
                    ? 'bg-white text-[#6D0808] shadow-xs font-semibold'
                    : 'text-[#6B6B6B] hover:text-[#171717]'
                }`}
              >
                Bilingual
              </button>
              <button
                onClick={() => setLanguageMode('hindi')}
                className={`px-2 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  languageMode === 'hindi'
                    ? 'bg-white text-[#6D0808] shadow-xs font-semibold'
                    : 'text-[#6B6B6B] hover:text-[#171717]'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLanguageMode('english')}
                className={`px-2 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  languageMode === 'english'
                    ? 'bg-white text-[#6D0808] shadow-xs font-semibold'
                    : 'text-[#6B6B6B] hover:text-[#171717]'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>

        {/* 7-Day Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 scrollbar-none border-t border-[#E7E4E0]">
          {INITIAL_MESS_MENU.map((menuDay) => {
            const isSelected =
              menuDay.dayEnglish.toLowerCase() === selectedDay.toLowerCase();
            const isToday =
              menuDay.dayEnglish.toLowerCase() === todayName.toLowerCase();

            return (
              <button
                key={menuDay.dayEnglish}
                onClick={() => setSelectedDay(menuDay.dayEnglish)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium shrink-0 flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#6D0808] text-white shadow-xs'
                    : 'bg-[#F8F7F4] text-[#6B6B6B] hover:bg-[#F3EFEA] hover:text-[#171717] border border-[#E7E4E0]'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span>{menuDay.dayEnglish}</span>
                  {isToday && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? 'bg-white' : 'bg-[#6D0808]'
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`text-[10px] mt-0.5 ${
                    isSelected ? 'text-white/80' : 'text-[#6B6B6B]'
                  }`}
                >
                  {menuDay.dayHindi}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Meal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderMealCard(
          'Breakfast / ब्रेकफ़ास्ट',
          HOSTEL_FACTS.messTimings.breakfast,
          currentDayData.breakfast
        )}
        {renderMealCard(
          'Lunch / लंच',
          HOSTEL_FACTS.messTimings.lunch,
          currentDayData.lunch
        )}
        {renderMealCard(
          'Dinner / डिनर',
          HOSTEL_FACTS.messTimings.dinner,
          currentDayData.dinner
        )}
      </div>

      {/* Official Footnote from Menu Photo */}
      <div className="p-4 bg-white rounded-xl border border-[#E7E4E0] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#171717]">
          <Info className="w-4 h-4 text-[#6D0808] shrink-0" />
          <span>
            <strong>Official Rule:</strong> सलाद व अचार कॉमन है लंच और डिनर में दिया जाएगा। (Fresh salad and pickle are provided with both Lunch and Dinner).
          </span>
        </div>
        <div className="text-[11px] text-[#6B6B6B] shrink-0">
          Source: Rainbow Boys Hostel 2026–2027 Menu
        </div>
      </div>
    </div>
  );
};
