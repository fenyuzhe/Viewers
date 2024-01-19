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
            formatDate(instance.PatientBirthDate) +
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
          contentF: ({ instance, formatters: { formatNumberPrecision, splitStr } }) => {
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
            formatDate(instance.StudyDate) + ' ' + formatTime(instance.AcquisitionTime),
        },
      ],
    },
    dicomUploadComponent:
      '@ohif/extension-cornerstone.customizationModule.cornerstoneDicomUploadComponent',
  },
  showStudyList: true,
  extensions: [],
  modes: [],
  // some windows systems have issues with more than 3 web workers
  maxNumberOfWebWorkers: 5,
  // below flag is for performance reasons, but it might not work for all servers
  omitQuotationForMultipartRequest: true,
  showWarningMessageForCrossOrigin: false,
  useNorm16Texture: true,
  useSharedArrayBuffer: 'AUTO',
  showCPUFallbackMessage: true,
  showLoadingIndicator: true,
  strictZSpacingForVolumeViewport: true,
  maxNumRequests: {
    interaction: 100,
    thumbnail: 75,
    // Prefetch number is dependent on the http protocol. For http 2 or
    // above, the number of requests can be go a lot higher.
    prefetch: 25,
  },
  defaultDataSourceName: 'dicomweb',
  dataSources: [
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb',
      configuration: {
        friendlyName: 'WADORS Server',
        name: 'WADORS',
        qidoRoot: 'http://localhost:8080/dicomweb',
        wadoRoot: 'http://localhost:8080/dicomweb',
        qidoSupportsIncludeField: false,
        supportsReject: true,
        supportsStow: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        acceptHeader: 'application/json',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: true,
        supportsWildcard: true,
        staticWado: true,
        singlepart: 'bulkdata,video,pdf',
        // whether the data source should use retrieveBulkData to grab metadata,
        // and in case of relative path, what would it be relative to, options
        // are in the series level or study level (some servers like series some study)
        bulkDataURI: {
          enabled: false,
          relativeResolution: 'studies',
        },
        omitQuotationForMultipartRequest: true,
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
  studyListFunctionsEnabled: true,
  patientListUrl: 'http://localhost:8080/patientlist',
  pdfReportUrl: 'http://192.168.1.179:8080/ncpacsservice/reportPicServlet',
  showPdfVierportBar: true,
};
