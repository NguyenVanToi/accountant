import { ReactNode, useEffect, useState } from "react";
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
import { addCircleOutline, createOutline, trash } from "ionicons/icons";
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
import { Lender, Transaction } from "../../_core/api/api";

type IPropsTransaction = {
  fetchTransactions?: any;
  createTransaction?: any;
  editTransaction?: any;
  deleteTransaction?: any;
  fetchLender?: any;
  transactions: Transaction[];
  lenders: Lender[];
};

const TransactionView = (props: IPropsTransaction) => {
  const {
    fetchTransactions,
    fetchLender,
    lenders,
    transactions,
    createTransaction,
    editTransaction,
    deleteTransaction,
  } = props;

  const location = useLocation();
  const [currentLender, setCurrentLender] = useState<any>();
  const [transactionSelected, setTransactionSelected] = useState<any | null>(
    null
  );
  const name = "Quản lý số nợ";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lenderId = params.get("lenderId");
    if (lenderId) {
      fetchTransactions(+lenderId);
      console.log(lenderId);
      setCurrentLender(lenders.find((lender: any) => lender.id === +lenderId));
    }
  }, []);

  const handleDismiss = () => {
    dismiss();
  };
  const [present, dismiss] = useIonModal(UpdateTransaction, {
    onDismiss: handleDismiss,
    transaction: transactionSelected,
    createTransaction: createTransaction,
    editTransaction: editTransaction,
    lenderId: currentLender && currentLender.id,
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

  const deleteTrans = (e: any, transaction: any) => {
    console.log("trans", transaction);
    e.stopPropagation();
    deleteTransaction(transaction);
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
            {transactions &&
              transactions.map((item, idx) => (
                <IonItemSliding
                  id="item100"
                  key={idx}
                  onClick={() => handleLender(item)}
                >
                  <IonItem>
                    <IonLabel>
                      <h2>{item.date}</h2>
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
                      <IonIcon
                        slot="icon-only"
                        icon={trash}
                        onClick={(e) => deleteTrans(e, item)}
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
                  value={currentLender?.money}
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

const mapStateToProps = (
  state: any
): { transactions: Transaction[]; lenders: Lender[] } => {
  console.log(state);
  return {
    transactions: state.transaction.data,
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
