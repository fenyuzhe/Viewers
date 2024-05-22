import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonEnums } from '@ohif/ui';
import classnames from 'classnames';

const Tabs = ({ children, defaultActiveTab }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || children[0].props.label);

  const handleClick = newActiveTab => {
    setActiveTab(newActiveTab);
  };

  const handleKeyPress = (e, newActiveTab) => {
    if (e.key === 'Enter') {
      handleClick(newActiveTab);
    }
  };

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex flex-row py-1">
        {children.map((child, index) => {
          const { label, icon } = child.props; // 获取传递的图标属性
          const isActive = activeTab === label;

          return (
            <Button
              key={label}
              size={ButtonEnums.size.medium}
              startIcon={icon} // 使用传递的图标作为 startIcon
              className={classnames(
                'mx-2',
                { 'text-secondary': !isActive },
                isActive ? 'bg-[#c5c5c5] text-black' : 'bg-[#7f7f7f] text-white',
                'hover:bg-[#a3a3a3] active:bg-[#a8a29e]'
              )}
              onClick={() => handleClick(label)}
              onKeyPress={e => handleKeyPress(e, label)}
              tabIndex={isActive ? -1 : 0}
            >
              {label}
            </Button>
          );
        })}
      </div>
      <div className="h-full overflow-hidden">
        {children.map((child, index) => {
          const { label, children: tabChildren } = child.props;
          const isFirstTab = index === 0;

          return (
            <div
              key={label}
              className={classnames('h-full', {
                hidden: isFirstTab && activeTab !== children[0].props.label,
                // block: isFirstTab && activeTab === children[0].props.label,
              })}
            >
              {tabChildren}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  defaultActiveTab: PropTypes.string,
};

const Tab = ({ label, children, icon }) => {
  // 接收图标作为 props
  // No changes needed here
  return <div className="h-full">{children}</div>;
};

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node, // 添加图标属性的类型定义
};

export { Tabs, Tab };
