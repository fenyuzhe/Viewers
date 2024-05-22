/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from 'react';
import { Icon, Tabs, Tab } from '@ohif/ui';
import { SelectedPatientProvider, useSelectedPatient } from '@ohif/ui';
import classnames from 'classnames';
import { useSearchParams } from '@hooks';
import { utils } from '@ohif/core';
import { useAppConfig } from '@state';
//顶部导航组件
// eslint-disable-next-line react/display-name
const Navigation = ({ activeTab, onTabChange }) => {
  const [appConfig] = useAppConfig();
  const { selectedPatient } = useSelectedPatient();
  // 使用 useMemo 缓存 iframe 的 src
  const pdfUrl = selectedPatient
    ? appConfig.pdfReportUrl +
      '?reg_key=' +
      selectedPatient.registerKey +
      '&output=pdfbyte' +
      '#view=Fit,top' +
      (!appConfig.showPdfVierportBar ? '#toolbar=0' : '')
    : '';
  const imageUrl = selectedPatient
    ? `/clinicalviewer?StudyInstanceUIDs=` + selectedPatient.studyInstanceUid
    : '';
  return (
    <div className="h-full bg-[#323232] p-1">
      {/* 导航栏内容，包括Tab页按钮 */}
      <Tabs defaultActiveTab="检查影像">
        <Tab
          label="检查报告"
          icon={<Icon name="reports" />}
        >
          <div className="min-w-80 min-h-80 h-full">
            {selectedPatient === null || selectedPatient === undefined ? (
              <p></p>
            ) : (
              <div className="h-full w-full">
                <iframe
                  key="pdfreportviewer"
                  title="pdfreportviewer"
                  src={pdfUrl}
                  width="100%"
                  height="100%"
                ></iframe>
              </div>
            )}
          </div>
        </Tab>
        <Tab
          label="检查影像"
          icon={<Icon name="images" />}
        >
          <div className="min-w-80 min-h-80 h-full">
            {selectedPatient === null || selectedPatient === undefined ? (
              <p></p>
            ) : selectedPatient.imageNum === null || selectedPatient.imageNum === '0' ? (
              <p className="text-white">当前检查无图像</p>
            ) : (
              <iframe
                key="clinicalviewer"
                title="clinicalviewer"
                src={imageUrl}
                width="100%"
                height="100%"
              />
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

// 病人列表组件
// eslint-disable-next-line react/display-name
const LeftPanel = React.memo<{ data: any }>(({ data }) => {
  const PatientList = () => {
    // eslint-disable-next-line react/display-name
    const PatientInfo = React.memo<{
      patient: any;
      onPatientClick: (patient: any) => void;
    }>(({ patient, onPatientClick }) => {
      const isActive =
        selectedPatientState && selectedPatientState.registerKey === patient.registerKey;
      const { formatDate } = utils;
      return (
        <div className="mt-1">
          <div
            className={classnames(
              'min-h-32 m-1 flex flex-1 cursor-pointer items-center overflow-hidden rounded-md  text-base',
              isActive ? 'bg-[#c5c5c5] text-black' : 'bg-[#7f7f7f] text-white'
            )}
            style={{
              margin: isActive ? '0' : '1px',
            }}
            onClick={() => onPatientClick(patient)}
          >
            <div style={{ wordWrap: 'break-word' }}>
              <p className="pl-3 text-lg">类型：{patient.modality}</p>
              <p className="pl-3 text-lg">姓名：{patient.patientName}</p>
              <p className="pl-3 text-lg">部位：{patient.bodypartName}</p>
              <p className="pl-3 text-lg">
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
      // bg-primary-dark
      <div className="ohif-scrollbar flex flex-1 flex-col overflow-y-hidden rounded-md bg-[#646464]">
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
    <div className="flex w-72 flex-col">
      <PatientList />
    </div>
  );
});

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
        {/* ml-1  */}
        <div className="flex flex-1 flex-col">
          {/* 右侧上部导航栏 */}
          <Navigation
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
          {/* 右侧下部Tab页内容 */}
          {/* <StrictMode>
            <TabContent
              activeTab={activeTab}
              appconfig={appConfig}
            />
          </StrictMode> */}
        </div>
      </div>
    </SelectedPatientProvider>
  );
}

export default ClinicalWorkstation;
