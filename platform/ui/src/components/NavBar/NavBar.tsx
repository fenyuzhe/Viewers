import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { IconButton, Icon } from '@ohif/ui';

const stickyClasses = 'sticky top-0';
const notStickyClasses = 'relative';

const NavBar = ({ className, children, isSticky }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }

    const { scrollWidth, clientWidth, scrollLeft } = scrollContainer;
    console.log('scrollLeft:', scrollLeft);
    setShowLeftArrow(scrollLeft > 0);
    console.log('scrollWidth:', scrollWidth, 'scrollLeft + clientWidth:', scrollLeft + clientWidth);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 6);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      handleScroll();
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('resize', handleScroll);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Ensure arrows are set correctly on mount
  useEffect(() => {
    setTimeout(() => {
      handleScroll();
    }, 0);
  }, []);

  const scrollLeft = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: -40,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: 40,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className={classnames(
        'z-20 flex items-center border-b-4 border-black bg-[#525252] px-1',
        isSticky ? stickyClasses : notStickyClasses,
        className
      )}
      style={{ paddingTop: '4px', paddingBottom: '4px', minHeight: '52px' }}
    >
      {showLeftArrow && (
        <IconButton
          variant="contained"
          rounded="none"
          color="default"
          bgColor="bg-transparent"
          className="my-auto mr-2"
          onClick={scrollLeft}
        >
          <Icon
            className="bg-transparent"
            name="arrow-left-small"
          />
        </IconButton>
      )}
      <div
        ref={scrollContainerRef}
        className="ohif-scrollbar invisible-scrollbar flex overflow-x-auto overflow-y-hidden whitespace-nowrap"
        style={{ flex: 1 }}
        onScroll={handleScroll}
      >
        {children}
      </div>
      {showRightArrow && (
        <IconButton
          variant="contained"
          rounded="none"
          color="default"
          bgColor="bg-transparent"
          className="my-auto ml-2 bg-transparent"
          onClick={scrollRight}
        >
          <Icon name="arrow-right-small" />
        </IconButton>
      )}
    </div>
  );
};

NavBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  isSticky: PropTypes.bool,
};

export default NavBar;
