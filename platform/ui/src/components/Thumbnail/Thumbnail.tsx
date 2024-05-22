import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDrag } from 'react-dnd';
import Icon from '../Icon';
import { StringNumber } from '../../types';
import DisplaySetMessageListTooltip from '../DisplaySetMessageListTooltip';

/**
 * Display a thumbnail for a display set.
 */
const Thumbnail = ({
  displaySetInstanceUID,
  className,
  imageSrc,
  imageAltText,
  description,
  seriesNumber,
  numInstances,
  countIcon,
  messages,
  dragData,
  isActive,
  onClick,
  onDoubleClick,
}): React.ReactNode => {
  // TODO: We should wrap our thumbnail to create a "DraggableThumbnail", as
  // this will still allow for "drag", even if there is no drop target for the
  // specified item.
  const [collectedProps, drag, dragPreview] = useDrag({
    type: 'displayset',
    item: { ...dragData },
    canDrag: function (monitor) {
      return Object.keys(dragData).length !== 0;
    },
  });

  return (
    <div
      className={classnames(className, 'group flex flex-1 flex-col ')}
      id={`thumbnail-${displaySetInstanceUID}`}
      data-cy={`study-browser-thumbnail`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      role="button"
      tabIndex="0"
    >
      <div>
        <div
          className={classnames(
            'min-h-40 flex flex-1 items-center justify-center overflow-hidden text-base text-white',
            isActive
              ? 'border-primary-light border bg-[#c5c5c5]'
              : 'border-secondary-light border bg-[#7f7f7f] hover:border-blue-300'
          )}
        >
          {imageSrc ? (
            <div className="flex flex-col">
              <div
                className={classnames('mx-auto text-base', isActive ? 'text-black' : 'text-white')}
              >
                {description}
              </div>
              <div
                ref={drag}
                style={{ position: 'relative' }}
                className="mx-auto h-32 w-32 cursor-pointer select-none outline-none"
              >
                <img
                  src={imageSrc}
                  alt={imageAltText}
                  className="min-h-32 px-auto object-none"
                  crossOrigin="anonymous"
                />
                <div
                  className="absolute bottom-0 left-0 ml-2"
                  style={{ color: '#fff' }}
                >
                  <span className=" text-primary-light font-bold">{'S: '}</span>
                  {seriesNumber}
                </div>
                <div
                  className="absolute bottom-0 right-0 mr-2 flex flex-row items-center"
                  style={{ color: '#fff' }}
                >
                  <Icon
                    name={countIcon || 'group-layers'}
                    className="mr-1 w-3"
                  />
                  {` ${numInstances}`}
                </div>
              </div>
            </div>
          ) : (
            <div>{imageAltText}</div>
          )}
        </div>
      </div>
    </div>
  );
};

Thumbnail.propTypes = {
  displaySetInstanceUID: PropTypes.string.isRequired,
  className: PropTypes.string,
  imageSrc: PropTypes.string,
  /**
   * Data the thumbnail should expose to a receiving drop target. Use a matching
   * `dragData.type` to identify which targets can receive this draggable item.
   * If this is not set, drag-n-drop will be disabled for this thumbnail.
   *
   * Ref: https://react-dnd.github.io/react-dnd/docs/api/use-drag#specification-object-members
   */
  dragData: PropTypes.shape({
    /** Must match the "type" a dropTarget expects */
    type: PropTypes.string.isRequired,
  }),
  imageAltText: PropTypes.string,
  description: PropTypes.string.isRequired,
  seriesNumber: StringNumber.isRequired,
  numInstances: PropTypes.number.isRequired,
  messages: PropTypes.object,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

Thumbnail.defaultProps = {
  dragData: {},
};

export default Thumbnail;
