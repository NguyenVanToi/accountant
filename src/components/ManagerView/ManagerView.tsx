import { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./../../global.css";
import "./ManagerView.css";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  useIonModal,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  addCircleOutline,
  addOutline,
  createOutline,
  trash,
} from "ionicons/icons";
import CurrencyFormat from "react-currency-format";
import UpdateLender from "./UpdateLender";
import {
  createLender,
  deleteLender,
  editLender,
  fetchLenders,
} from "../../redux/actions/lenderAction";
import { useHistory } from "react-router";
import { Lender } from "../../_core/api/api";

const ManagerView: React.FC = (props: any) => {
  const { fetchLenders, createLender, editLender, deleteLender } = props;
  const lenders: any[] = props.lenders;
  const [lenderSelected, setLenderSelected] = useState<any | null>(null);
  const history = useHistory();
  const name = "Quản lý số nợ";

  useEffect(() => {
    fetchLenders();
  }, []);

  const handleDismiss = () => {
    dismiss();
  };
  const [present, dismiss] = useIonModal(UpdateLender, {
    onDismiss: handleDismiss,
    lender: lenderSelected,
    createLender: createLender,
    editLender: editLender,
  });

  const handleLender = (e: any, lender?: any) => {
    e.stopPropagation();
    if (lender && lender.id) {
      setLenderSelected(lender);
    } else {
      setLenderSelected(null);
    }
    present({
      cssClass: "modal custom",
    });
  };

  const removeLender = (e: any, lender: any) => {
    e.stopPropagation();
    deleteLender(lender);
  };

  const goToDetail = (lender: Lender) => {
    if (lender && lender.id) {
      setLenderSelected(lender);
    } else {
      setLenderSelected(null);
    }
    history.push(`/page/transaction?lenderId=${lender.id}`);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
          <IonIcon
            slot="end"
            icon={addCircleOutline}
            onClick={handleLender}
            className="icon-menu-add"
          />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="container manager-view">
          <IonList>
            {/* Multi-line sliding item with icon options on both sides */}
            {lenders.map((item, idx) => (
              <IonItemSliding
                id="item100"
                key={idx}
                onClick={() => goToDetail(item)}
              >
                <IonItem>
                  <IonLabel>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                  </IonLabel>
                  <CurrencyFormat
                    className="text-color-black"
                    value={item.money}
                    thousandSeparator={true}
                    displayType={"text"}
                  />
                  đ
                </IonItem>

                <IonItemOptions side="end">
                  <IonItemOption color="danger">
                    <IonIcon
                      slot="icon-only"
                      icon={createOutline}
                      onClick={(e) => handleLender(e, item)}
                    />
                  </IonItemOption>
                  <IonItemOption>
                    <IonIcon
                      slot="icon-only"
                      icon={trash}
                      onClick={(e) => removeLender(e, item)}
                    />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
          <div className="total-block">
            <IonItem lines="none">
              <IonLabel>Tổng</IonLabel>
              <div slot="end" className="price">
                <CurrencyFormat
                  slot="end"
                  className="price"
                  value={props.total}
                  thousandSeparator={true}
                  displayType={"text"}
                />
                đ
              </div>
            </IonItem>
          </div>
        </div>
      </IonContent>
    </>
  );
};

const mapStateToProps = (state: any) => {
  console.log(state);

  return {
    total: state.counting.total,
    lenders: Object.values(state.lender),
  };
};

export default connect(mapStateToProps, {
  fetchLenders,
  createLender,
  editLender,
  deleteLender,
})(ManagerView);
