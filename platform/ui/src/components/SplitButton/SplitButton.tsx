import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';
import { useTranslation } from 'react-i18next';

import Icon from '../Icon';
import Tooltip from '../Tooltip';
import ListMenu from '../ListMenu';

const baseClasses = {
  Button: 'flex items-center rounded-md border-transparent cursor-pointer group/button',
  Primary:
    // By default border on left, top and bottom for hover effect and only rounded on left side.
    // Extra padding on right to compensate for no right border.
    // 'h-full border-l-2 border-t-2 border-b-2 rounded-tl-md rounded-bl-md group/primary !pl-2 !py-2',
    'h-full rounded-tl-md rounded-bl-md group/primary !pl-2 !py-2',
  Secondary:
    'h-full flex items-center justify-center rounded-tr-md rounded-br-md w-4 border-2 border-transparent group/secondary',
  SecondaryIcon: 'w-4 h-full stroke-1',
  Separator: 'border-l py-2.5',
  // Content: 'absolute z-10 top-0 mt-12',
  Content: 'fixed z-10 top-0 mt-12',
};

const classes = {
  Button: ({ isExpanded, primary }) =>
    classNames(
      baseClasses.Button,
      !isExpanded && !primary.isActive && 'hover:!bg-primary-dark hover:border-primary-dark'
    ),
  Interface: 'h-full flex flex-row items-center',
  Primary: ({ primary, isExpanded }) =>
    classNames(
      baseClasses.Primary
      // primary.isActive
      //   ? isExpanded
      //     ? 'border-primary-dark !bg-primary-dark hover:border-primary-dark !text-primary-light'
      //     : `${
      //         primary.isToggle
      //           ? 'border-secondary-dark bg-secondary-light'
      //           : 'border-primary-light bg-primary-light'
      //       }
      //       border-2 rounded-md !p-2` // Full, rounded border with less right padding when active.
      //   : `focus:!text-black focus:!rounded-md focus:!border-primary-light focus:!bg-primary-light
      //   ${
      //     isExpanded
      //       ? 'border-primary-dark bg-primary-dark !text-primary-light'
      //       : 'border-secondary-dark bg-secondary-dark group-hover/button:border-primary-dark group-hover/button:text-primary-light hover:!bg-primary-dark hover:border-primary-dark focus:!text-black'
      //   }
      //   `
    ),
  Secondary: ({ isExpanded, primary }) =>
    classNames(
      baseClasses.Secondary
      // isExpanded
      //   ? 'bg-primary-light !rounded-tr-md !rounded-br-md'
      //   : primary.isActive
      //     ? 'bg-secondary-dark'
      //     : 'hover:bg-primary-dark bg-secondary-dark group-hover/button:border-primary-dark'
    ),
  SecondaryIcon: ({ isExpanded }) =>
    classNames(
      baseClasses.SecondaryIcon,
      isExpanded ? 'text-white' : 'text-[#ffffff] group-hover/secondary:text-white'
    ),
  Separator: ({ primary, isExpanded, isHovering }) =>
    classNames(
      baseClasses.Separator,
      isHovering || isExpanded || primary.isActive ? 'border-transparent' : 'border-primary-active'
    ),
  Content: ({ isExpanded }) => classNames(baseClasses.Content, isExpanded ? 'block' : 'hidden'),
};

const SplitButton = ({
  isToggle,
  groupId,
  primary,
  secondary,
  items,
  renderer,
  isActive,
  onInteraction,
  Component,
}) => {
  const { t } = useTranslation('Buttons');
  const [state, setState] = useState({ isHovering: false, isExpanded: false });
  // const toggleExpanded = () => setState({ ...state, isExpanded: !state.isExpanded });
  const setHover = hovering => setState({ ...state, isHovering: hovering });
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const collapse = () => setState({ ...state, isExpanded: false });
  const parentRef = useRef(null);
  const parentRef2 = useRef(null);

  const toggleExpanded = () => {
    const rect = parentRef.current.getBoundingClientRect();
    setDropdownPosition({ top: rect.top, left: rect.left });
    setState({ ...state, isExpanded: !state.isExpanded });
  };

  const [tootipPosition, setTootipPosition] = useState({ top: 0, left: 0 });
  const [sticky, setSticky] = useState(false);

  const handleMouseOver = () => {
    const rect = parentRef2.current.getBoundingClientRect();
    setTootipPosition({ top: rect.top + rect.height, left: rect.left });
    setSticky(true);
  };

  const handleMouseOut = () => {
    setSticky(false);
  };

  const styleo = { top: `${tootipPosition.top}` + 'px', left: `${tootipPosition.left}` + 'px' };

  const renderPrimaryButton = () => (
    <Component
      key={primary.id}
      {...primary}
      isActive={isActive}
      onInteraction={onInteraction}
      rounded="none"
      className={classes.Primary({ ...state, primary: { isActive, isToggle } })}
      data-tool={primary.id}
      data-cy={`${groupId}-split-button-primary`}
    />
  );

  return (
    <OutsideClickHandler
      onOutsideClick={collapse}
      disabled={!state.isExpanded}
    >
      <div
        id="SplitButton"
        className="relative"
      >
        <div
          className={classes.Button({ ...state, primary: { isActive } })}
          style={{ height: '40px' }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div
            className={classes.Interface}
            ref={parentRef}
          >
            <div onClick={collapse}>{renderPrimaryButton()}</div>
            <div className={classes.Separator({ ...state, primary: { isActive } })}></div>
            <div
              className={classes.Secondary({ ...state, primary: { isActive } })}
              onClick={toggleExpanded}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              data-cy={`${groupId}-split-button-secondary`}
              ref={parentRef2}
            >
              <Tooltip
                isDisabled={state.isExpanded || !secondary.tooltip}
                content={secondary.tooltip}
                className="h-full"
                styles={styleo}
                isSticky={sticky}
              >
                <Icon
                  name={secondary.icon}
                  className={classes.SecondaryIcon({ ...state, primary: { isActive } })}
                />
              </Tooltip>
            </div>
          </div>
        </div>
        <div
          className={classes.Content({ ...state })}
          data-cy={`${groupId}-list-menu`}
          style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
        >
          <ListMenu
            items={items}
            onClick={collapse}
            renderer={args => renderer({ ...args, t })}
          />
        </div>
      </div>
    </OutsideClickHandler>
  );
};

SplitButton.propTypes = {
  isToggle: PropTypes.bool,
  groupId: PropTypes.string.isRequired,
  primary: PropTypes.object.isRequired,
  secondary: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  renderer: PropTypes.func,
  isActive: PropTypes.bool,
  onInteraction: PropTypes.func.isRequired,
  Component: PropTypes.elementType,
};

SplitButton.defaultProps = {
  isToggle: false,
  renderer: null,
  isActive: false,
  Component: null,
};

export default SplitButton;
