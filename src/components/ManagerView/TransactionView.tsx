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
import { useLocation } from "react-router";
import {
  createTransaction,
  deleteTransaction,
  editTransaction,
  fetchTransactions,
} from "../../redux/actions/transactionAction";
import { fetchLender } from "../../redux/actions/lenderAction";
import "./TransactionView.css";
import UpdateTransaction from "./UpdateTransaction";

const TransactionView: React.FC = (props: any) => {
  const { fetchTransactions, fetchLender, lenders } = props;

  const location = useLocation();
  console.log(location);
  const transactions: any[] = props.transactions;
  const [currentLender, setCurrentLender] = useState<any>();
  const [transactionSelected, setTransactionSelected] = useState<any | null>(
    null
  );
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lenderId = params.get("lenderId");
    if (lenderId) {
      fetchTransactions(+lenderId);
      setCurrentLender(lenders.find((lender: any) => lender.id === +lenderId));
    }
    console.log(transactions);
  }, []);

  const handleDismiss = () => {
    dismiss();
  };
  const [present, dismiss] = useIonModal(UpdateTransaction, {
    onDismiss: handleDismiss,
    transaction: transactionSelected,
    createTransaction: createTransaction,
    editTransaction: editTransaction,
  });
  const handleLender = (lender?: any) => {
    if (lender && lender.id) {
      setTransactionSelected(lender);
    } else {
      setTransactionSelected(null);
    }
    present({
      cssClass: "modal custom",
    });
  };

  return (
    <div className="container manager-view">
      <IonList>
        {/* Multi-line sliding item with icon options on both sides */}
        {transactions.map((item, idx) => (
          <IonItemSliding
            id="item100"
            key={idx}
            onClick={() => handleLender(item)}
          >
            <IonItem>
              <IonLabel>
                <h2>{item.createAt}</h2>
                <p>{item.description}</p>
              </IonLabel>
              <div className="price">
                <CurrencyFormat
                  className="text-color-black price"
                  value={item.money}
                  thousandSeparator={true}
                  displayType={"text"}
                />
                <span className="unit">đ</span>
              </div>
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
              value={currentLender?.money}
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
    transactions: Object.values(state.transaction),
    lenders: Object.values(state.lender),
  };
};

export default connect(mapStateToProps, {
  fetchTransactions,
  createTransaction,
  editTransaction,
  deleteTransaction,
  fetchLender,
})(TransactionView);
