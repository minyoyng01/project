"use client";

import Image from "next/image";

interface TodoInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export default function TodoInput({ value, onChange, onAdd }: TodoInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim()) {
      onAdd();
    }
  };

  const isDisabled = !value.trim();

  return (
    <div className="flex items-center justify-center gap-2 md:gap-3 lg:gap-4 mb-8">
      <div className="relative flex-shrink-0 w-[280px] md:w-[518px] lg:w-[1016px]" style={{ height: '56px' }}>
        <div className="block md:hidden absolute inset-0" style={{ width: '280px', height: '56px' }}>
          <img 
            src="/search.svg" 
            alt="Search Input"
            style={{ width: '280px', height: '56px', display: 'block' }}
          />
        </div>
        <div className="hidden md:block lg:hidden absolute inset-0" style={{ width: '518px', height: '56px' }}>
          <img 
            src="/search.svg" 
            alt="Search Input"
            style={{ width: '518px', height: '56px', display: 'block' }}
          />
        </div>
        <div className="hidden lg:block absolute inset-0" style={{ width: '1016px', height: '56px' }}>
          <img 
            src="/search.svg" 
            alt="Search Input"
            style={{ width: '1016px', height: '56px', display: 'block' }}
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="할 일을 입력해주세요"
          className="relative w-full px-4 md:px-6 lg:px-8 bg-transparent border-0 focus:outline-none text-sm md:text-base z-10"
          style={{ height: '56px' }}
        />
      </div>
      <div className="relative flex-shrink-0 w-[56px] md:w-[162px] lg:w-[168px]" style={{ height: '56px' }}>
        <div className="block md:hidden w-full h-full">
          <Image
            src={isDisabled ? "/Type=Add, Size=Small, State=Default.png" : "/Type=Add, Size=Small, State=Active (1).png"}
            alt="Add Button"
            width={56}
            height={56}
            className={isDisabled ? "opacity-50" : "cursor-pointer"}
            style={{ display: 'block', width: '56px', height: '64px', objectFit: 'contain' }}
            onClick={isDisabled ? undefined : onAdd}
          />
        </div>
        <div className="hidden md:block w-full h-full">
          <Image
            src={isDisabled ? "/Type=Add, Size=Large, State=Default.png" : "/Type=Add, Size=Large, State=Active.png"}
            alt="Add Button"
            width={168}
            height={56}
            className={isDisabled ? "opacity-50" : "cursor-pointer"}
            style={{ display: 'block', width: '100%', height: '64px', objectFit: 'contain' }}
            onClick={isDisabled ? undefined : onAdd}
          />
        </div>
      </div>
    </div>
  );
}