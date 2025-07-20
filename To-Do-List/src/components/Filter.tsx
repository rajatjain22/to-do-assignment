import type { FilterType } from '../types/Task';

const filterOptions: FilterType[] = ['all', 'completed', 'pending'];

export default function Filter({
  filter,
  setFilter,
}: {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
}) {
  const getButtonClass = (type: FilterType) => {
    return `px-3 py-1 rounded ${
      filter === type
        ? 'bg-blue-500 text-white'
        : 'bg-white border border-gray-300 text-gray-700 cursor-pointer'
    }`;
  };

  return (
    <div className="flex space-x-2 mb-4">
      {filterOptions.map((type) => (
        <button
          key={type}
          className={getButtonClass(type)}
          onClick={() => setFilter(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
}
