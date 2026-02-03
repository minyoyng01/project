"use client";

import { useState } from "react";
import Image from "next/image";
import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onMemoUpdate: (id: string, memo: string) => void;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
}

/**
 * TodoItem 컴포넌트 - 개별 할 일 항목 표시 및 편집
 * @param {TodoItemProps} props - todo 항목과 이벤트 핸들러들
 */
export default function TodoItem({ todo, onToggle, onDelete, onEdit, onMemoUpdate, isSelected, onSelect }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showMemoModal, setShowMemoModal] = useState(false);
  const [memoText, setMemoText] = useState(todo.memo || "");
  const [imagePreview, setImagePreview] = useState<string>(todo.imageUrl || "");
  const [imageFile, setImageFile] = useState<File | null>(null);

  /**
   * 할 일 텍스트 저장 핸들러
   */
  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  /**
   * 이미지 파일 선택 핸들러
   * - 영문 파일명 검증
   * - 5MB 이하 파일 크기 검증
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일명 영문 검증
    const englishOnlyRegex = /^[a-zA-Z0-9._-]+$/;
    if (!englishOnlyRegex.test(file.name)) {
      alert("이미지 파일 이름은 영어로만 이루어져야 합니다.");
      e.target.value = "";
      return;
    }

    // 파일 크기 검증 (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      e.target.value = "";
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  /**
   * 이미지 삭제 핸들러
   */
  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <>
      {!isSelected && (
        <div
          className={`flex items-center gap-3 md:gap-4 px-4 md:px-6 mb-3 rounded-full transition-all group w-[344px] md:w-[686px] lg:w-[527px] h-[50px] ${
            todo.completed
              ? "border-[#7C3AED]"
              : "bg-white border-black"
          }`}
          style={{ 
            borderWidth: '3px',
            backgroundColor: todo.completed ? '#EDE9FE' : 'white'
          }}
          onClick={() => !isEditing && onSelect(todo.id)}
        >
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (!isEditing) onToggle(todo.id);
          }}
          className="cursor-pointer flex-shrink-0 z-10"
        >
          <Image
            src={todo.completed ? "/Property 1=Frame 2610233.svg" : "/Property 1=Default.svg"}
            alt="Checkbox"
            width={32}
            height={32}
            className="object-contain pointer-events-none"
          />
        </div>
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleSave}
            autoFocus
            className="flex-1 px-2 py-1 border-b-2 focus:outline-none bg-transparent"
            style={{ borderColor: '#7C3AED' }}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span
            onDoubleClick={() => !todo.completed && setIsEditing(true)}
            className={`flex-1 text-base cursor-pointer font-medium ${
              todo.completed ? "text-gray-700 line-through" : "text-gray-900"
            }`}
          >
            {todo.text}
          </span>
        )}

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
          {!todo.completed && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              title="수정"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          )}
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1 hover:bg-red-100 rounded-full transition-colors"
            title="삭제"
          >
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      )}

      {/* Memo Modal - Inline */}
      {isSelected && (
        <div className="mb-6 w-full max-w-[344px] md:max-w-[686px] lg:max-w-[980px] mx-auto px-4 md:px-0">
          <div className="bg-white rounded-2xl py-4 md:py-6 px-0">
            <div className="flex flex-col gap-3 md:gap-5">
              {/* 할 일 제목 입력 */}
              <div className={`w-full border-2 rounded-full flex items-center justify-center px-4 md:px-6 transition-colors ${
                todo.completed 
                  ? 'bg-purple-200 border-purple-300' 
                  : 'bg-white border-gray-300'
              }`} style={{ minHeight: '48px', maxHeight: '48px', height: '48px' }}>
                <div className="flex items-center justify-center gap-2 md:gap-4">
                  <div onClick={(e) => {
                    e.stopPropagation();
                    onToggle(todo.id);
                  }} className="cursor-pointer" style={{ width: '24px', height: '24px', flexShrink: 0 }}>
                    <Image 
                      src={todo.completed ? "/Property 1=Frame 2610233.svg" : "/Property 1=Default.svg"} 
                      alt="Checkbox" 
                      width={24} 
                      height={24} 
                    />
                  </div>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="bg-transparent border-0 focus:outline-none text-sm md:text-base font-normal text-center"
                    placeholder="비타민 챙겨 먹기"
                    style={{ width: '150px' }}
                  />
                </div>
              </div>

              {/* 이미지와 메모 영역 */}
              <div className="flex gap-3 md:gap-6">
                {/* 이미지 업로드 영역 */}
                <div className="w-[140px] md:w-[280px] lg:w-[350px] flex-shrink-0">
                  {imagePreview ? (
                    <div className="relative w-full h-[100px] md:h-[200px] lg:h-[250px] border-2 border-gray-300 rounded-2xl overflow-hidden bg-white">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        onClick={handleImageRemove}
                        className="absolute top-2 right-2 md:top-3 md:right-3 w-6 h-6 md:w-8 md:h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 text-base md:text-xl font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="relative w-full h-[100px] md:h-[200px] lg:h-[250px] border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center bg-white">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20">
                          <Image src="/img.svg" alt="Add Image" width={80} height={80} className="opacity-10" />
                        </div>
                      </div>
                      <label className="absolute bottom-2 right-2 md:bottom-4 md:right-4 lg:bottom-5 lg:right-5 cursor-pointer">
                        <Image src="/Type=Plus.svg" alt="Add" width={32} height={32} className="md:w-[42px] md:h-[42px] lg:w-[52px] lg:h-[52px]" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>

                {/* 메모 영역 */}
                <div className="flex-1 relative overflow-hidden rounded-2xl bg-[#FFF9E6]">
                  <div className="memo-scroll w-full h-[100px] md:h-[200px] lg:h-[250px] overflow-y-auto px-3 md:px-5 pt-3 md:pt-4 pb-3 md:pb-5">
                    {memoText && (
                      <div className="flex justify-center mb-2 md:mb-3">
                        <span className="text-sm md:text-base font-bold text-amber-700">Memo</span>
                      </div>
                    )}
                    <textarea
                      value={memoText}
                      onChange={(e) => setMemoText(e.target.value)}
                      placeholder={todo.completed ? "내용이 최대로 늘어날 때 다음과 같이 보이며 내부 스크롤이 이루어집니다. 내용이 최대로 늘어날 때 다음과 같이 보이며 내부 스크롤이 이루어집니다. 내용이 최대로 늘어날 때 다음과 같이 보이며 내부 스크롤이 이루어집니다. 내용이 최대로 늘어날 때 다음과 같이 보이며 내부 스크롤이 이루어집니다. 내용이 최대로 늘어날 때 다음과 같이 보이며 내부 스크롤이 이루어집니다. 내용이 최대로 늘어날 때 다음과 같이 보이며 내부 스크롤이 이루어집니다. 내용이 최대로 늘어날 때 다음과 같이 보이며 내부 스크롤이 이루어집니다. 내용이 최대로 늘어날 때 다음과 같이 보이며 내부 스크롤이 이루어집니다. 내용이 최대로 늘어날 때 다음과 같이 보이며 내부 스크롤이 이루어집니다. 내용이 최대로 늘어날 때 다음과 같이 보이며 내부 스크롤이 이루어집니다. 내용이 최대로 늘어날 때 다음과 같이 보이며 내부 스크롤이 이루어집니다. 내용이 최대로 늘어날 때 다음과 같이 보이며 내부 스크롤이 이루어집니다. 내용이 최대로 늘어날 때 다음과 같이 보이며 내부 스크롤이 이루어집니다." : ""}
                      className="w-full bg-transparent border-0 focus:outline-none resize-none text-xs md:text-sm placeholder:text-gray-400 text-left"
                      style={{ minHeight: '200px' }}
                    />
                  </div>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-2 md:gap-3 justify-end">
                <button
                  onClick={() => {
                    onEdit(todo.id, editText);
                    onMemoUpdate(todo.id, memoText);
                    onSelect(null);
                  }}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <Image 
                    src={todo.completed ? "/Type=Edit, Size=Large, State=Active.png" : "/Type=Edit, Size=Large, State=Default.png"} 
                    alt="수정 완료" 
                    width={100}
                    height={32}
                    className="md:w-[130px] md:h-[42px] lg:w-[164px] lg:h-[52px]" 
                  />
                </button>
                <button
                  onClick={() => {
                    onDelete(todo.id);
                    onSelect(null);
                  }}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <Image 
                    src="/Type=Delete, Size=Large, State=Default.png" 
                    alt="삭제하기" 
                    width={100}
                    height={32}
                    className="md:w-[130px] md:h-[42px] lg:w-[164px] lg:h-[52px]" 
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}