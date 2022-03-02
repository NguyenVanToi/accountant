import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import "./Page.css";
import Category from "../components/Category/Category";
import Search from "../components/Search/Search";
import SummaryView from "../components/SummaryView/SummaryView";
import Accountant from "../components/Accountant/Accountant";
import ManagerView from "../components/ManagerView/ManagerView";
import { addCircleOutline } from "ionicons/icons";

const Page: React.FC = () => {
  let { name } = useParams<{ name: string }>();
  let component: any = null;
  switch (name) {
    case "accountant":
      name = "Chi tiêu";
      component = <Accountant />;
      break;
    case "category":
      name = "Quản lý danh mục";
      component = <Category />;
      break;
    case "search":
      name = "Tra cứu";
      component = <Search />;
      break;
    case "summary":
      name = "Thống kê";
      component = <SummaryView />;
      break;
    case "manager":
      name = "Quản lý số nợ";
      component = <ManagerView />;
      break;
    default:
      name = "page";
      break;
  }

  const add = () => {};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
          <IonIcon slot="end" icon={addCircleOutline} onClick={add} />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>{component ? component : null}</IonContent>
    </IonPage>
  );
};

export default Page;
