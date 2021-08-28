import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import Accountant from '../components/Accountant';
import './Page.css';
import Category from '../components/Category';
import Search from '../components/Search';

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
