import { useEffect, useState } from 'react';
import { cn } from '../../util/tailwind-merge';

interface SelectProps<T> {
  id: string;
  menuList: T[];
  selectState?: T | null;
  setSelectState: React.Dispatch<React.SetStateAction<T | null>> | ((value: T | null) => void);
  defaultValue: T;
  getLabel: (item: T) => string; // 각 아이템에서 표시할 텍스트를 추출하는 함수
  getValue: (item: T) => string | number; // 각 아이템의 고유 값을 추출하는 함수
}

const Select = <T,>({
  id,
  menuList,
  selectState,
  setSelectState,
  defaultValue,
  getLabel,
  getValue,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  // 초기값 설정을 useEffect로 이동
  useEffect(() => {
    if (selectState !== undefined) {
      setSelectedItem(selectState);
    } else if (defaultValue) {
      setSelectedItem(defaultValue);
    } else if (menuList.length > 0) {
      setSelectedItem(menuList[0]);
    }
  }, [selectState, defaultValue, menuList]);
  const handleChangeSelectValue = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: T) => {
    e.stopPropagation();
    setSelectedItem(item);
    setSelectState(item);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* 숨겨진 input으로 htmlFor 연결 지원 */}
      <input id={id} name={id} type="text" className="hidden" />

      <div
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={`${id}-label`}
        className={cn(
          'relative z-[1000] w-full bg-white border border-[#e9ecef] min-h-[42px]',
          'px-4 py-3 text-sm rounded-lg cursor-pointer',
          'focus:outline-none focus:border-[#2F68C5] hover:border-[#2F68C5]',
          "before:content-['⌵'] before:absolute before:top-1/2 before:-translate-y-1/2 before:right-4",
          'before:text-gray-600 before:text-lg before:pointer-events-none'
        )}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
      >
        <span className={cn('text-sm text-gray-700 block')}>
          {selectedItem ? getLabel(selectedItem) : defaultValue ? getLabel(defaultValue) : '선택해주세요.'}
        </span>

        <ul
          role="listbox"
          className={cn(
            'absolute list-none top-full left-0 w-full mt-1 overflow-hidden overflow-y-auto',
            'rounded-lg bg-white border border-[#e9ecef] shadow-lg transition-all duration-200',
            isOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0 border-transparent'
          )}
        >
          {menuList.map((item) => {
            if (getValue(item) === '') return null;
            return (
              <li
                key={getValue(item)}
                role="option"
                aria-selected={selectedItem ? getValue(selectedItem) === getValue(item) : false}
                className={cn(
                  'px-4 py-3 text-sm text-gray-700 transition-colors duration-200 cursor-pointer',
                  'hover:bg-gray-50 hover:text-gray-900',
                  selectedItem && getValue(selectedItem) === getValue(item) && 'text-[#2F68C5] bg-blue-50'
                )}
                onClick={(e) => handleChangeSelectValue(e, item)}
              >
                {getLabel(item)}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Select;
