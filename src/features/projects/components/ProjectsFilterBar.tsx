import React from 'react'
import { PROJECT_CATEGORIES, FURNITURE_CATEGORIES } from '../data/projectsData'
import { projectsContent } from '@/content/projects'
import { commonContent } from '@/content/common'

interface ProjectsFilterBarProps {
  viewMode: 'projects' | 'furniture'
  onViewModeChange: (mode: 'projects' | 'furniture') => void
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategorySelect: (category: string) => void
  categoryCounts: Record<string, number>
  totalDisplayed: number
  sortBy: string
  onSortChange: (sort: string) => void
}

export const ProjectsFilterBar: React.FC<ProjectsFilterBarProps> = ({
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  categoryCounts,
  totalDisplayed,
  sortBy,
  onSortChange,
}) => {
  const currentCategories = viewMode === 'projects' ? PROJECT_CATEGORIES : FURNITURE_CATEGORIES
  const { filterBar } = projectsContent

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-10 space-y-4 font-body">
      {/* Top View Mode Switcher Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0F0F0E] border border-[#C6A15B]/30 p-3 sm:p-4 backdrop-blur-md">
        {/* View Mode Toggle Switch */}
        <div className="flex items-center bg-[#181816] p-1 border border-[#C6A15B]/20 w-full sm:w-auto">
          <button
            onClick={() => {
              onViewModeChange('projects')
              onCategorySelect('all')
            }}
            className={`flex-1 sm:flex-initial px-5 py-2 text-[11px] font-body font-medium uppercase tracking-[0.14em] transition-all duration-300 flex items-center justify-center gap-2 ${
              viewMode === 'projects'
                ? 'bg-[#C6A15B] text-[#0A0A0A] shadow-[0_0_15px_rgba(198,161,91,0.4)]'
                : 'text-[#AAA49A] hover:text-[#F3EFE7]'
            }`}
          >
            <span>🏛️</span>
            <span>{filterBar.modes.projects}</span>
          </button>

          <button
            onClick={() => {
              onViewModeChange('furniture')
              onCategorySelect('all_furniture')
            }}
            className={`flex-1 sm:flex-initial px-5 py-2 text-[11px] font-body font-medium uppercase tracking-[0.14em] transition-all duration-300 flex items-center justify-center gap-2 ${
              viewMode === 'furniture'
                ? 'bg-[#C6A15B] text-[#0A0A0A] shadow-[0_0_15px_rgba(198,161,91,0.4)]'
                : 'text-[#AAA49A] hover:text-[#F3EFE7]'
            }`}
          >
            <span>🛍️</span>
            <span>{filterBar.modes.furniture}</span>
          </button>
        </div>

        {/* Sort Dropdown Selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-[#AAA49A] font-body font-normal whitespace-nowrap">
            {filterBar.sortLabel}
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-[#181816] text-[#F3EFE7] border border-[#C6A15B]/20 text-xs font-body py-2 px-3 focus:outline-none focus:border-[#C6A15B] rounded-none font-normal"
          >
            {filterBar.sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Search Input & Dynamic Category Pills Container */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-[#0F0F0E] border border-[#C6A15B]/20 p-4 shadow-xl">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#C6A15B]">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              viewMode === 'projects'
                ? filterBar.searchPlaceholders.projects
                : filterBar.searchPlaceholders.furniture
            }
            className="w-full pl-11 pr-10 py-2.5 bg-[#181816] text-[#F3EFE7] placeholder-[#777268] text-xs font-body rounded-none border border-[#C6A15B]/20 focus:border-[#C6A15B] focus:outline-none transition-colors duration-300 font-normal"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#AAA49A] hover:text-[#DEC27B]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {currentCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id
            const count = categoryCounts[cat.id] || 0

            return (
              <button
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className={`px-3.5 py-1.5 text-[11px] font-body font-medium uppercase tracking-[0.14em] transition-all duration-300 flex items-center gap-2 whitespace-nowrap border ${
                  isSelected
                    ? 'bg-[#C6A15B] text-[#0A0A0A] border-[#C6A15B] shadow-[0_0_12px_rgba(198,161,91,0.3)]'
                    : 'bg-[#181816] text-[#AAA49A] border-[#C6A15B]/20 hover:border-[#C6A15B]/50 hover:text-[#F3EFE7]'
                }`}
              >
                <span>{cat.label}</span>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-body ${
                      isSelected ? 'bg-[#0A0A0A]/20 text-[#0A0A0A]' : 'bg-[#252522] text-[#C6A15B]'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Results Counter Bar */}
      <div className="flex justify-between items-center px-2 text-xs">
        <p className="font-body text-[#AAA49A] font-normal leading-[1.65]">
          {filterBar.displayPrefix}{' '}
          <span className="font-medium text-[#DEC27B]">{totalDisplayed}</span>{' '}
          {viewMode === 'projects' ? filterBar.resultCounts.projects : filterBar.resultCounts.furniture}
        </p>
        {(searchQuery || (selectedCategory !== 'all' && selectedCategory !== 'all_furniture')) && (
          <button
            onClick={() => {
              onSearchChange('')
              onCategorySelect(viewMode === 'projects' ? 'all' : 'all_furniture')
            }}
            className="text-[11px] font-body text-[#C6A15B] hover:underline font-medium uppercase tracking-[0.12em]"
          >
            {commonContent.actions.resetFilter}
          </button>
        )}
      </div>
    </div>
  )
}
