import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { searchOutline, newspaperOutline, layersOutline } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  color?: string;
}

const appPages: AppPage[] = [
  {
    title: 'Chi tiêu',
    url: '/page/accountant',
    iosIcon: newspaperOutline,
    mdIcon: newspaperOutline,
    color: 'success'
  },
  {
    title: 'Quản lý danh mục',
    url: '/page/category',
    iosIcon: layersOutline,
    mdIcon: layersOutline,
    color: 'warning'
  },
  {
    title: 'Tra cứu',
    url: '/page/search',
    iosIcon: searchOutline,
    mdIcon: searchOutline,
    color: 'secondary'
  }
];

const labels: any[] = [];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Vinamilk</IonListHeader>
          <IonNote>toinv2610@gmail.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} color={location.pathname === appPage.url ? 'primary' : appPage?.color}/>
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        {/*<IonList id="labels-list">*/}
        {/*  <IonListHeader>Danh mục</IonListHeader>*/}
        {/*  {labels.map((label, index) => (*/}
        {/*    <IonItem lines="none" key={index}>*/}
        {/*      <IonIcon slot="start" icon={bookmarkOutline} />*/}
        {/*      <IonLabel>{label}</IonLabel>*/}
        {/*    </IonItem>*/}
        {/*  ))}*/}
        {/*</IonList>*/}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
