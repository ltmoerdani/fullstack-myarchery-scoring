import { ReactNode } from 'react';

interface FilterGroup {
  label: string;
  children: ReactNode;
}

interface FilterSectionProps {
  groups: FilterGroup[];
  actions?: ReactNode;
}

export function FilterSection({ groups, actions }: FilterSectionProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-col lg:flex-row lg:justify-between space-y-4 lg:space-y-0">
        {/* Filter Controls */}
        <div className="space-y-4">
          {groups.map((group, index) => (
            <div key={index} className="flex items-start space-x-3">
              <label className="text-sm font-medium text-gray-700 w-20 pt-1.5">
                {group.label}:
              </label>
              <div className="flex flex-wrap gap-2 max-w-md">
                {group.children}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        {actions && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

export function FilterButton({ active, onClick, children }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-white border border-blue-300 text-blue-600 hover:bg-blue-50'
      }`}
    >
      {children}
    </button>
  );
}