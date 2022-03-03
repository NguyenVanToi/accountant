import { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./../../global.css";
import "./ManagerView.css";
import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  useIonModal,
} from "@ionic/react";
import { createOutline, trash } from "ionicons/icons";
import CurrencyFormat from "react-currency-format";
import UpdateLender from "./UpdateLender";
import {
  createLender,
  deleteLender,
  editLender,
  fetchLenders,
} from "../../redux/actions/lenderAction";

const ManagerView: React.FC = (props: any) => {
  const { fetchLenders, createLender, editLender, deleteLender } = props;
  const lenders: any[] = props.lenders;
  const [lenderSelected, setLenderSelected] = useState<any | null>(null);
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
  const handleLender = (lender?: any) => {
    if (lender && lender.id) {
      setLenderSelected(lender);
    } else {
      setLenderSelected(null);
    }
    present({
      cssClass: "modal custom",
    });
  };

  return (
    <div className="container manager-view">
      <IonList>
        {/* Multi-line sliding item with icon options on both sides */}
        {lenders.map((item, idx) => (
          <IonItemSliding
            id="item100"
            key={idx}
            onClick={() => handleLender(item)}
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
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonItemOption>
              <IonItemOption>
                <IonIcon slot="icon-only" icon={trash} />
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
