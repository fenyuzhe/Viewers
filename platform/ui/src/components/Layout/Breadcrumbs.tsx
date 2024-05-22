import React from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);

  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{url}</Link>
      </Breadcrumb.Item>
    );
  });

  return (
    <Breadcrumb style={{ margin: '8px 0' }}>
      <Breadcrumb.Item key="studylist">
        <Link to="/">检查列表</Link>
      </Breadcrumb.Item>
      {breadcrumbItems}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
