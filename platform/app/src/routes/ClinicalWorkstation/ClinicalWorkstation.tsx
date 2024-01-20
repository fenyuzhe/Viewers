/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from 'react';
import { Button, ButtonEnums, Icon } from '@ohif/ui';
import { SelectedPatientProvider, useSelectedPatient } from '@ohif/ui';
import classnames from 'classnames';
import { useSearchParams } from '@hooks';
import { utils } from '@ohif/core';
import { useAppConfig } from '@state';
import { StrictMode } from 'react';
//顶部导航组件
// eslint-disable-next-line react/display-name
const Navigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="p-1">
      {/* 导航栏内容，包括Tab页按钮 */}
      <Button
        type={activeTab === 'reports' ? ButtonEnums.type.primary : ButtonEnums.type.secondary}
        size={ButtonEnums.size.medium}
        startIcon={<Icon name="reports" />}
        className={classnames('mr-4')}
        disabled={false}
        onClick={() => onTabChange('reports')}
      >
        检查报告
      </Button>
      <Button
        type={activeTab === 'images' ? ButtonEnums.type.primary : ButtonEnums.type.secondary}
        size={ButtonEnums.size.medium}
        startIcon={<Icon name="images" />}
        className={classnames('mr-4')}
        disabled={false}
        onClick={() => onTabChange('images')}
      >
        检查影像
      </Button>
    </div>
  );
};

// 病人列表组件
// eslint-disable-next-line react/display-name
const LeftPanel = React.memo<{ data: any }>(({ data }) => {
  // eslint-disable-next-line react/display-name
  const HospitalInfo = () => {
    return (
      <div className="bg-secondary-dark text-primary-light flex min-h-[92px] items-center justify-center font-serif text-2xl font-bold">
        <span className="bg-blue-300 bg-clip-text text-transparent">阿克苏地区第一人民医院</span>
      </div>
    );
  };
  // 病人列表组件
  // eslint-disable-next-line react/display-name
  const PatientList = () => {
    // eslint-disable-next-line react/display-name
    const PatientInfo = React.memo<{
      patient: any;
      onPatientClick: (patient: any) => void;
      // eslint-disable-next-line react/prop-types
    }>(({ patient, onPatientClick }) => {
      const isActive =
        // eslint-disable-next-line react/prop-types
        selectedPatientState && selectedPatientState.registerKey === patient.registerKey;
      const { formatDate } = utils;
      return (
        <div className="mt-1 text-white">
          <div
            className={classnames(
              'min-h-32 m-1 flex flex-1 cursor-pointer items-center overflow-hidden rounded-md bg-black text-base text-white',
              isActive
                ? 'border-primary-light border-2'
                : 'border-secondary-light border hover:border-blue-300'
            )}
            style={{
              margin: isActive ? '0' : '1px',
            }}
            onClick={() => onPatientClick(patient)}
          >
            <div>
              <p className="text-primary-light pl-3 text-lg">类型：{patient.modality}</p>
              <p className="text-primary-light pl-3 text-lg">姓名：{patient.patientName}</p>
              <p className="text-primary-light pl-3 text-lg">部位：{patient.bodypartName}</p>
              <p className="text-primary-light pl-3 text-lg">
                时间：{formatDate(patient.studyTime, 'YYYY-MM-DD HH:mm:ss')}
              </p>
            </div>
          </div>
        </div>
      );
    });
    const [selectedPatientState, setSelectedPatientState] = useState(data[0]);
    const { setSelectedPatient } = useSelectedPatient();
    useEffect(() => {
      // 在组件渲染完成后调用
      setSelectedPatient(selectedPatientState);
    }, [selectedPatientState]);
    const handlePatientClick = patient => {
      // 当患者被点击时，更新选中患者的状态
      setSelectedPatientState(patient);
    };
    return (
      <div className="bg-primary-dark ohif-scrollbar flex flex-1 flex-col overflow-y-hidden">
        {data.map(patient => (
          <PatientInfo
            key={patient.registerKey}
            patient={patient}
            onPatientClick={handlePatientClick}
          />
        ))}
      </div>
    );
  };
  return (
    <div className="min-w-6 flex flex-col">
      <HospitalInfo />
      <PatientList />
    </div>
  );
});

// 检查报告组件
// eslint-disable-next-line react/display-name
const TabContent = ({ activeTab, appconfig }) => {
  const { selectedPatient } = useSelectedPatient();
  const [appConfig] = useAppConfig();
  const PdfViewer = ({ pdfUrl }) => {
    return (
      <div className="h-full w-full">
        <iframe
          style={{ backgroundColor: 'gray' }}
          key="pdfreportviewer"
          title="pdfreportviewer"
          src={pdfUrl}
          width="100%"
          height="100%"
        ></iframe>
      </div>
    );
  };
  // 使用 useMemo 缓存 iframe 的 src
  const iframeSrc = useMemo(() => {
    if (activeTab === 'reports' && selectedPatient) {
      // #toolbar=0 隐藏工具栏
      return (
        appConfig.pdfReportUrl +
        '?reg_key=' +
        selectedPatient.registerKey +
        '&output=pdfbyte' +
        (!appconfig.showPdfVierportBar ? '#toolbar=0' : '')
      );
    } else if (activeTab === 'images' && selectedPatient) {
      return `/clinicalviewer?StudyInstanceUIDs=` + selectedPatient.studyInstanceUid;
    }
    return '';
  }, [activeTab, selectedPatient]);
  return (
    <div className="border-secondary-light mb-1 mr-1 flex-1 border p-1">
      {/* 根据activeTab显示不同的内容 */}
      {activeTab === 'reports' && (
        <div className="h-full">
          {selectedPatient === null || selectedPatient === undefined ? (
            <p></p>
          ) : (
            <PdfViewer pdfUrl={iframeSrc} />
          )}
        </div>
      )}
      {activeTab === 'images' && (
        <div className="h-full">
          {selectedPatient === null || selectedPatient === undefined ? (
            <p></p>
          ) : (
            <iframe
              key="clinicalviewer"
              title="clinicalviewer"
              src={iframeSrc}
              width="100%"
              height="100%"
            />
          )}
        </div>
      )}
    </div>
  );
};

function ClinicalWorkstation() {
  const [activeTab, setActiveTab] = useState('images');
  const [leftPanelData, setLeftPanelData] = useState([]);
  const searchParams = useSearchParams();
  const memoizedSearchParams = useMemo(() => searchParams.toString(), [searchParams]);
  const [appConfig] = useAppConfig();
  useEffect(() => {
    // 在这里调用获取后端数据的函数
    fetchJavaBackendData(searchParams.get('type'), searchParams.get('queryNo'))
      .then(data => {
        // 成功获取数据后更新左侧列表的数据
        setLeftPanelData(data);
      })
      .catch(error => {
        // 处理错误
        console.error('获取patientList数据失败:', error);
      });
  }, [memoizedSearchParams]);
  const fetchJavaBackendData = async (type, queryNo) => {
    const response = await fetch(appConfig.patientListUrl + `/type/${type}/queryNo/${queryNo}`);
    const data = await response.json();
    return data;
  };
  const handleTabChange = tab => {
    setActiveTab(tab);
  };
  return (
    <SelectedPatientProvider>
      <div className="flex h-screen bg-black ">
        {/* 左侧病人列表 */}
        <LeftPanel data={leftPanelData} />
        <div className="ml-1 flex flex-1 flex-col">
          {/* 右侧上部导航栏 */}
          <Navigation
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
          {/* 右侧下部Tab页内容 */}
          <StrictMode>
            <TabContent
              activeTab={activeTab}
              appconfig={appConfig}
            />
          </StrictMode>
        </div>
      </div>
    </SelectedPatientProvider>
  );
}

export default ClinicalWorkstation;
