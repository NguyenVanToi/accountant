import { IonPage } from "@ionic/react";
import { useParams } from "react-router";
import "./Page.css";
import Category from "../components/Category/Category";
import Search from "../components/Search/Search";
import SummaryView from "../components/SummaryView/SummaryView";
import Accountant from "../components/Accountant/Accountant";
import ManagerView from "../components/ManagerView/ManagerView";
import { addCircleOutline } from "ionicons/icons";
import TransactionView from "../components/ManagerView/TransactionView";
import { useState } from "react";

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
      component = <ManagerView />;
      break;
    case "transaction":
      component = <TransactionView />;
      break;
    default:
      name = "page";
      break;
  }

  const add = () => {};

  return <IonPage>{component ? component : null}</IonPage>;
};

export default Page;
