interface EventFillterProps {
  categories: string[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const EventFillter = ({ categories, selectedCategory, onCategoryChange }: EventFillterProps) => {
  return (
    <div className="flex gap-2 overflow-x-scroll no-scrollbar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`${selectedCategory === category ? "bg-secondary" : "bg-gray-normal"}
             text-white px-4 py-1 rounded-full text-sm 
             hover:bg-secondary
             transition-all duration-300
             cursor-pointer min-w-fit
        `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default EventFillter;
