import React, { useState, useRef, useEffect } from "react";
import styles from "./dropdown.module.css";

// values = 드롭다운 메뉴, 배열 형태로 입력
// defaultValue = 기본 메뉴
// onChange = 핸들러
// iconDefault = 기본 메뉴 이미지
// iconHover = 호버 상태일 때 이미지
// iconActive = 드롭다운을 눌렀을 때 이미지
// iconPosition = 텍스트 기준 앞(front), 뒤(back)

function Dropdown({
  values,
  defaultValue,
  onChange,
  iconDefault,
  iconHover,
  iconActive,
  iconPosition,
}) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

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
    setIsActive(!isActive);
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  const iconToShow = isActive
    ? iconActive // 드롭다운 열렸을 때는 iconActive
    : isHovered
      ? iconHover // 호버 상태에서는 iconHover 아이콘
      : iconDefault; // 기본 상태에서는 iconDefault 아이콘

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <button
        className={`${styles.dropdown_button} ${isActive ? styles.dropdown_button_active : ""}`}
        onClick={toggleDropdown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {iconPosition === "front" && iconToShow && (
          <img
            className={styles.dropdown_icon}
            src={iconToShow}
            alt="드롭다운 아이콘"
          />
        )}
        {selectedValue}
        {iconPosition === "back" && iconToShow && (
          <img
            className={styles.dropdown_icon}
            src={iconToShow}
            alt="드롭다운 아이콘"
          />
        )}
      </button>
      <ul
        className={`${styles.dropdown_menu} ${isOpen ? styles.dropdown_menu_show : ""}`}
      >
        {values.map((value) => (
          <li
            key={value}
            className={styles.dropdown_menu_item}
            onClick={() => handleSelect(value)}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
