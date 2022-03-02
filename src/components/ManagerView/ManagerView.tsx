import { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./../../global.css";
import "./ManagerView.css";
import { matchSummary } from "../../redux/actions/summaryAction";
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

const ManagerView: React.FC = (props: any) => {
  const data = [
    {
      id: 1,
      name: "Nha A",
      description: "Moi tra",
      money: 5000000,
    },
    {
      id: 2,
      name: "Nha B",
      money: 1000000,
    },
    {
      id: 3,
      name: "Nha C",
      description: "Moi tra",
      money: 2000000,
    },
  ];
  const [lenderSelected, setLenderSelected] = useState<any | null>(null);
  useEffect(() => {}, []);

  const handleDismiss = () => {
    dismiss();
  };
  const [present, dismiss] = useIonModal(UpdateLender, {
    onDismiss: handleDismiss,
    lender: lenderSelected,
    createLender: props.createLender,
    editLender: props.editLender,
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
        {data.map((item, idx) => (
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
              value={100000000}
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
    summaries: state.summary.data,
  };
};

export default connect(mapStateToProps, {
  matchSummary,
})(ManagerView);
