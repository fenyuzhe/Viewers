import React from 'react';
import { DicomMetadataStore } from '@ohif/core';

/**
 *
 * @param {*} servicesManager
 */
async function createReportAsync({ servicesManager, getReport, reportType = 'measurement' }) {
  const { displaySetService, uiNotificationService, uiDialogService } = servicesManager.services;
  const loadingDialogId = uiDialogService.create({
    showOverlay: true,
    isDraggable: false,
    centralize: true,
    content: Loading,
  });

  try {
    const naturalizedReport = await getReport();

    // The "Mode" route listens for DicomMetadataStore changes
    // When a new instance is added, it listens and
    // automatically calls makeDisplaySets
    DicomMetadataStore.addInstances([naturalizedReport], true);

    const displaySet = displaySetService.getMostRecentDisplaySet();

    const displaySetInstanceUID = displaySet.displaySetInstanceUID;

    uiNotificationService.show({
      title: '创建报告',
      message: `${reportType} 保存成功`,
      type: 'success',
    });

    return [displaySetInstanceUID];
  } catch (error) {
    uiNotificationService.show({
      title: '创建报告',
      message: error.message || `保存失败 ${reportType}`,
      type: 'error',
    });
  } finally {
    uiDialogService.dismiss({ id: loadingDialogId });
  }
}

function Loading() {
  return <div className="text-primary-active">Loading...</div>;
}

export default createReportAsync;
