import { DesktopOutlined, FileOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useState, useEffect, ReactNode, Key, FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MenuItem {
  label: ReactNode,
  key: string,
  icon?: ReactNode,
  children?: MenuItem[]
}

function getItem( label: ReactNode, key: string, icon?: ReactNode, children?: MenuItem[] ): MenuItem {
  return {
    label,
    key,
    icon,
    children,
  }
}


const items: MenuItem[] = [
  getItem('首页', '/home', <PieChartOutlined />),
  getItem('关于', '/about', <DesktopOutlined />),
  getItem('个人中心', '/user', <UserOutlined />, [
    getItem('用户信息', '/user/information'),
  ]),
  getItem('文件系统', '9', <FileOutlined />),
];

function getActivedMenu(menuItems: MenuItem[], pathname: string ): OrNull<string>{
  for( let i = 0; i < menuItems.length; i++ ){
    const item = menuItems[i]
    if( item.children ){
      const exist = item.children.find( children => children.key === pathname );
      return exist ? item.key : getActivedMenu( item.children, pathname );
    }
  }
  return null
}


const FNav: FC = () => {

  const [ openKeys, setOpenKeys ] = useState<string[]>([]);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleMenuItem = (menuInfo: MenuInfo) => navigate( menuInfo.key );

  useEffect( () => {
    const defaultOpenKey = getActivedMenu( items, pathname );
    defaultOpenKey && setOpenKeys([ defaultOpenKey ])
  }, [])

  const handleOpenChange = (openKeys: string[]) => setOpenKeys( openKeys.slice(-1) );

  return (
    <Menu
      theme='dark'
      selectedKeys={[ pathname ]}
      openKeys={ openKeys }
      mode='inline'
      items={ items }
      onClick={ handleMenuItem }
      onOpenChange={ handleOpenChange }
    />
  )
};

export default FNav;
