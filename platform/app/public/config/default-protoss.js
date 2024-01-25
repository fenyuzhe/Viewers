window.config = {
  routerBasename: '/',
  whiteLabeling: {
    createLogoComponentFn: function (React) {
      return React.createElement(
        'a',
        {
          target: '_self',
          rel: 'noopener noreferrer',
          className: 'text-purple-600 line-through flex items-center',
          href: 'http://protoss-tech.com',
        },
        React.createElement('img', {
          src: '../assets/xl.ico',
          className: 'w-8 h-8 mr-2',
          // alt: 'Protoss Dicom Image Viewer',
        }),
        React.createElement(
          'span',
          { key: 'text', style: { color: 'white', fontSize: '24px' } }
          // 'Protoss Dicom Image Viewer'
        )
      );
    },
  },
  customizationService: {
    cornerstoneOverlayTopLeft: {
      id: 'cornerstoneOverlayTopLeft',
      items: [
        {
          id: 'InstanceNmber',
          customizationType: 'ohif.overlayItem.instanceNumber',
          color: '#ff9696',
        },
        {
          id: 'SeriesNumber',
          customizationType: 'ohif.overlayItem',
          label: 'Se:',
          title: 'Series Number',
          condition: ({ instance }) => instance && instance.SeriesNumber,
          contentF: ({ instance }) => instance.SeriesNumber,
        },
      ],
    },
    cornerstoneOverlayTopRight: {
      id: 'cornerstoneOverlayTopRight',
      items: [
        {
          id: 'PatientName',
          customizationType: 'ohif.overlayItem',
          label: '',
          color: '',
          background: 'white',
          condition: ({ instance }) =>
            instance && instance.PatientName && instance.PatientName.Alphabetic,
          contentF: ({ instance, formatters: { formatPN } }) =>
            formatPN(instance.PatientName.Alphabetic),
        },
        {
          id: 'PatientId',
          customizationType: 'ohif.overlayItem',
          title: 'Patient Id',
          condition: ({ instance }) => instance && instance.PatientID,
          contentF: ({ instance }) => instance.PatientID,
        },
        {
          id: 'PatientBirthDateAndSex',
          customizationType: 'ohif.overlayItem',
          // label: 'DOB:',
          title: "Patient's Date of birth And Sex",
          condition: ({ instance }) => instance && instance.PatientBirthDate,
          contentF: ({ instance, formatters: { formatDate } }) =>
            formatDate(instance.PatientBirthDate, 'YYYY-MM-DD') +
            ' ' +
            (instance.PatientSex ? instance.PatientSex : ''),
        },
        {
          id: 'InstitutionName',
          customizationType: 'ohif.overlayItem',
          // label: 'InstitutionName:',
          title: 'Institution Name',
          condition: ({ instance }) => instance && instance.InstitutionName,
          contentF: ({ instance }) => instance.InstitutionName,
        },
        {
          id: 'AccessionNumber',
          customizationType: 'ohif.overlayItem',
          title: 'Accession Number',
          condition: ({ instance }) => instance && instance.AccessionNumber,
          contentF: ({ instance }) => instance.AccessionNumber,
        },
        {
          id: 'SeriesDescription',
          customizationType: 'ohif.overlayItem',
          title: 'Series Description',
          condition: ({ instance }) => instance && instance.SeriesDescription,
          contentF: ({ instance }) => instance.SeriesDescription,
        },
      ],
    },
    cornerstoneOverlayBottomLeft: {
      id: 'cornerstoneOverlayBottomLeft',
      items: [
        {
          id: 'CtValue',
          customizationType: 'ohif.overlayItem.ctValue',
          color: '#ff9696',
        },
        {
          id: 'WindowLevel',
          customizationType: 'ohif.overlayItem.windowLevel',
          color: '#ff9696',
        },
        {
          id: 'SliceThickness',
          customizationType: 'ohif.overlayItem',
          // label: 'T:',
          title: 'Slice Thickness',
          condition: ({ instance }) =>
            instance && instance.SliceThickness && instance.ImagePositionPatient,
          contentF: ({ instance, formatters: { formatNumberPrecision } }) => {
            // 分割 ImagePositionPatient 字符串，选择 Z 轴值
            const ImagePositionPatient = instance.ImagePositionPatient;
            const zAxisValue = ImagePositionPatient[2];

            return (
              'T: ' +
              formatNumberPrecision(instance.SliceThickness, 2) +
              'mm' +
              ' L: ' +
              formatNumberPrecision(zAxisValue) +
              'mm'
            );
          },
        },
      ],
    },
    cornerstoneOverlayBottomRight: {
      id: 'cornerstoneOverlayBottomRight',
      items: [
        {
          id: 'KVAndXRay',
          customizationType: 'ohif.overlayItem',
          label: '',
          title: 'KV and XRay',
          condition: ({ instance }) => instance && instance.XRayTubeCurrent && instance.KVP,
          contentF: ({ instance }) => instance.XRayTubeCurrent + 'mA ' + instance.KVP + 'kV',
        },
        {
          id: 'StudyDateTime',
          customizationType: 'ohif.overlayItem',
          label: '',
          title: 'Study date time',
          condition: ({ instance }) => instance && instance.StudyDate,
          contentF: ({ instance, formatters: { formatDate, formatTime } }) =>
            formatDate(instance.StudyDate, 'YYYY-MM-DD') + ' ' + formatTime(instance.ContentTime),
        },
      ],
    },
    dicomUploadComponent:
      '@ohif/extension-cornerstone.customizationModule.cornerstoneDicomUploadComponent',
  },
  extensions: [],
  modes: [],
  showStudyList: true,
  // some windows systems have issues with more than 3 web workers
  maxNumberOfWebWorkers: 3,
  // below flag is for performance reasons, but it might not work for all servers
  showWarningMessageForCrossOrigin: false,
  showCPUFallbackMessage: true,
  showLoadingIndicator: true,
  strictZSpacingForVolumeViewport: true,
  maxNumRequests: {
    interaction: 100,
    thumbnail: 75,
    prefetch: 25,
  },
  // filterQueryParam: false,
  defaultDataSourceName: 'dicomweb',
  dataSources: [
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb',
      configuration: {
        friendlyName: 'WADORS Server',
        name: 'WADORS',
        qidoRoot: 'http://192.168.1.170:8080/dicomweb',
        wadoRoot: 'http://192.168.1.170:8080/dicomweb',
        qidoSupportsIncludeField: false,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        acceptHeader: 'application/json',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        supportsWildcard: true,
        staticWado: true,
        singlepart: 'bulkdata,video',
        // whether the data source should use retrieveBulkData to grab metadata,
        // and in case of relative path, what would it be relative to, options
        // are in the series level or study level (some servers like series some study)
        bulkDataURI: {
          enabled: true,
          relativeResolution: 'studies',
        },
        omitQuotationForMultipartRequest: true,
      },
    },
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomjson',
      sourceName: 'dicomjson',
      configuration: {
        friendlyName: 'dicom json',
        name: 'json',
      },
    },
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomlocal',
      sourceName: 'dicomlocal',
      configuration: {
        friendlyName: 'dicom local',
      },
    },
  ],
  httpErrorHandler: error => {
    // This is 429 when rejected from the public idc sandbox too often.
    console.warn(error.status);

    // Could use services manager here to bring up a dialog/modal if needed.
    console.warn('test, navigate to https://ohif.org/');
  },
  hotkeys: [
    {
      commandName: 'incrementActiveViewport',
      label: 'Next Viewport',
      keys: ['right'],
    },
    {
      commandName: 'decrementActiveViewport',
      label: 'Previous Viewport',
      keys: ['left'],
    },
    { commandName: 'rotateViewportCW', label: 'Rotate Right', keys: ['r'] },
    { commandName: 'rotateViewportCCW', label: 'Rotate Left', keys: ['l'] },
    { commandName: 'invertViewport', label: 'Invert', keys: ['i'] },
    {
      commandName: 'flipViewportHorizontal',
      label: 'Flip Horizontally',
      keys: ['h'],
    },
    {
      commandName: 'flipViewportVertical',
      label: 'Flip Vertically',
      keys: ['v'],
    },
    { commandName: 'scaleUpViewport', label: 'Zoom In', keys: ['+'] },
    { commandName: 'scaleDownViewport', label: 'Zoom Out', keys: ['-'] },
    { commandName: 'fitViewportToWindow', label: 'Zoom to Fit', keys: ['='] },
    { commandName: 'resetViewport', label: 'Reset', keys: ['space'] },
    { commandName: 'nextImage', label: 'Next Image', keys: ['down'] },
    { commandName: 'previousImage', label: 'Previous Image', keys: ['up'] },
    // {
    //   commandName: 'previousViewportDisplaySet',
    //   label: 'Previous Series',
    //   keys: ['pagedown'],
    // },
    // {
    //   commandName: 'nextViewportDisplaySet',
    //   label: 'Next Series',
    //   keys: ['pageup'],
    // },
    {
      commandName: 'setToolActive',
      commandOptions: { toolName: 'Zoom' },
      label: 'Zoom',
      keys: ['z'],
    },
    // ~ Window level presets
    {
      commandName: 'windowLevelPreset1',
      label: 'W/L Preset 1',
      keys: ['1'],
    },
    {
      commandName: 'windowLevelPreset2',
      label: 'W/L Preset 2',
      keys: ['2'],
    },
    {
      commandName: 'windowLevelPreset3',
      label: 'W/L Preset 3',
      keys: ['3'],
    },
    {
      commandName: 'windowLevelPreset4',
      label: 'W/L Preset 4',
      keys: ['4'],
    },
    {
      commandName: 'windowLevelPreset5',
      label: 'W/L Preset 5',
      keys: ['5'],
    },
    {
      commandName: 'windowLevelPreset6',
      label: 'W/L Preset 6',
      keys: ['6'],
    },
    {
      commandName: 'windowLevelPreset7',
      label: 'W/L Preset 7',
      keys: ['7'],
    },
    {
      commandName: 'windowLevelPreset8',
      label: 'W/L Preset 8',
      keys: ['8'],
    },
    {
      commandName: 'windowLevelPreset9',
      label: 'W/L Preset 9',
      keys: ['9'],
    },
  ],
  patientListUrl: 'http://192.168.1.170:8080/patientlist',
  pdfReportUrl: 'http://192.168.1.179:8080/ncpacsservice/reportPicServlet',
  showPdfVierportBar: true,
};
