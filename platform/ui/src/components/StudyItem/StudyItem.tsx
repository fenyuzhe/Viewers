import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import Icon from '../Icon';
import { utils } from '@ohif/core';
const { formatDate } = utils;

const baseClasses =
  'first:border-0 border-t border-secondary-light cursor-pointer select-none outline-none';

const StudyItem = ({
  date,
  description,
  numInstances,
  modalities,
  trackedSeries,
  patientName,
  accessionNumber,
  isActive,
  onClick,
}) => {
  const { t } = useTranslation('StudyItem');
  return (
    <div
      className={classnames(isActive ? 'bg-[#5f4141]' : 'bg-[#6d5555]', baseClasses)}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex="0"
    >
      <div className="flex flex-1 flex-col px-4 pb-2">
        {/* <div className="flex flex-row items-center justify-between pt-2 pb-2">
          <div className="text-base text-white">{date}</div>
          <div className="flex flex-row items-center text-base text-blue-300">
            <Icon
              name="group-layers"
              className="mx-2 w-4 text-blue-300"
            />
            {numInstances}
          </div>
        </div> */}
        {/* <div className="flex flex-row py-1">
          <div className="pr-5 text-xl text-blue-300">{modalities}</div>
          <div className="truncate-2-lines break-words text-base text-blue-300">{description}</div>
        </div> */}
        <div className="flex flex-row items-center justify-between pt-1">
          <div className=" mx-auto text-base text-white">{patientName}</div>
        </div>
        <div className="flex flex-row pt-1">
          <div className="mx-auto text-base text-white">{accessionNumber}</div>
        </div>
        <div className="flex flex-row pt-1">
          <div className="mx-auto text-base text-white">{formatDate(date, 'YYYY-MM-DD')}</div>
        </div>
      </div>
      {!!trackedSeries && (
        <div className="flex-2 flex">
          <div
            className={classnames(
              'bg-secondary-main mt-2 flex flex-row py-1 pl-2 pr-4 text-base text-white ',
              isActive
                ? 'border-secondary-light flex-1 justify-center border-t'
                : 'mx-4 mb-4 rounded-sm'
            )}
          >
            <Icon
              name="tracked"
              className="text-primary-light mr-2 w-4"
            />
            {t('Tracked series', { trackedSeries: trackedSeries })}
          </div>
        </div>
      )}
    </div>
  );
};

StudyItem.propTypes = {
  date: PropTypes.string.isRequired,
  description: PropTypes.string,
  modalities: PropTypes.string.isRequired,
  numInstances: PropTypes.number.isRequired,
  trackedSeries: PropTypes.number,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default StudyItem;
