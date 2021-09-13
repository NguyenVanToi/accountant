import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import './Page.css';
import Category from '../components/Category/Category';
import Search from '../components/Search/Search';
import SummaryView from '../components/SummaryView/SummaryView';
import Accountant from '../components/Accountant/Accountant';

const Page: React.FC = () => {

  let { name } = useParams<{ name: string; }>();
  let component: any = null;
  switch (name) {
      case 'accountant':
          name = 'Chi tiêu';
          component = <Accountant />;
          break;
      case 'category':
          name = 'Quản lý danh mục';
          component = <Category />
          break;
      case 'search':
        name = 'Tra cứu';
        component = <Search />
        break;
      case 'summary':
        name = 'Thống kê';
        component = <SummaryView />
        break;
      default:
          name = 'page';
          break;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
          {component ? component : null}
      </IonContent>
    </IonPage>
  );
};

export default Page;
