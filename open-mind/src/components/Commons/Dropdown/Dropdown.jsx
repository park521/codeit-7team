import React, { useState, useRef, useEffect } from "react";
import styles from "./dropdown.module.css";

/**
 *
 * @param {*} values = 드롭다운 메뉴, 배열 형태로 입력 (각 항목에 value와 icon 포함)
 * @param {*} defaultValue = 기본 메뉴
 * @param {*} onChange = 핸들러
 * @param {*} iconDefault = 기본 메뉴 이미지
 * @param {*} iconHover = 호버 상태일 때 이미지
 * @param {*} iconActive = 드롭다운을 눌렀을 때 이미지
 * @param {*} isImageButton = 버튼이 이미지인지 여부
 * @param {*} imageButtonSrc = 이미지 버튼용 src
 * @param {*} imageButtonAlt = 이미지 버튼용 alt 텍스트
 * @returns
 */

function Dropdown({
  values,
  defaultValue,
  onChange,
  iconDefault,
  iconHover,
  iconActive,
  isImageButton = false,
  imageButtonSrc,
  imageButtonAlt = "드롭다운 버튼 이미지",
}) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSelect(value) {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  }

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  const iconToShow = isOpen
    ? iconActive // 드롭다운 열렸을 때는 iconActive
    : isHovered
      ? iconHover // 호버 상태에서는 iconHover 아이콘
      : iconDefault; // 기본 상태에서는 iconDefault 아이콘

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      {/* 버튼이 이미지인지 텍스트인지에 따라 다르게 렌더링 */}
      {!isImageButton ? (
        <button
          className={`${styles.dropdown_button} ${isOpen ? styles.dropdown_button_open : ""
            }`}
          onClick={toggleDropdown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {selectedValue}
          <img
            className={styles.dropdown_icon}
            src={iconToShow}
            alt="드롭다운 아이콘"
          />
        </button>
      ) : (
        <button
          className={`${styles.dropdown_image_button} ${isOpen ? styles.dropdown_button_open : ""
            }`}
          onClick={toggleDropdown}
        >
          <img
            src={imageButtonSrc}
            alt={imageButtonAlt}
            className={styles.image_button_icon}
          />
        </button>
      )}
      <ul
        className={`${styles.dropdown_menu} ${isOpen ? styles.dropdown_menu_show : ""
          }`}
      >
        {values.map(({ value, icon }) => (
          <li
            key={value}
            className={`${styles.dropdown_menu_item} ${isImageButton ? styles.dropdown_menu_item_image : ""
              }`}
            onClick={() => handleSelect(value)}
          >
            {icon && (
              <div className={styles.dropdown_item_container}>
                <img
                  className={styles.dropdown_item_icon}
                  src={icon}
                  alt={`${value} 아이콘`}
                />
              </div>
            )}
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
