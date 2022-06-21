import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchTransactionsData } from "../../redux/actions/transactionAction";
import { Transaction } from "../../_core/api/api";
import CurrencyFormat from "react-currency-format";

const FilterTransactions: React.FC = (props: any) => {
  const [transactions, setTransctions] = useState<Transaction[]>([]);
  const [filters, setFilters] = useState<{
    from?: string;
    to?: string;
    sortBy?: string;
  }>({
    from: moment().subtract(1, "days").format("YYYY-MM-DD"),
    to: moment().format("YYYY-MM-DD"),
  });

  useEffect(() => {
    if (props.transactions) {
      setTransctions(props.transactions);
    }
  }, [props.transactions]);

  const handleChange = (e: any) => {
    const value = e.detail.value;
    const name = e.target.name;

    setFilters({ ...filters, [name]: value });
  };

  const onSubmit = () => {
    console.log("filters", filters);
    const fromDate = filters.from
      ? moment(filters.from).format("YYYY-MM-DD")
      : moment().subtract(1, "days").format("YYYY-MM-DD");
    const toDate = filters.to
      ? moment(filters.to).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");

    console.log("toDate", toDate);
    console.log("fromDate", fromDate);
    const query = [`date||$gte||${fromDate}`, `date||$lte||${toDate}`];
    props.fetchTransactionsData(query);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tìm kiếm</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="container filter-view">
          <div className="filter-block">
            <div className="filter-block-left filter-block-item">
              <div className="filter-control">
                <IonLabel>Từ</IonLabel>
                <IonDatetime
                  className="datetime"
                  displayFormat="YYYY-MM-DD"
                  min="2019-01-01"
                  value={filters.from}
                  name="from"
                  onIonChange={(e) => handleChange(e)}
                />
              </div>
              <div className="filter-control">
                <IonLabel className="to">Đến</IonLabel>
                <IonDatetime
                  className="datetime"
                  displayFormat="YYYY-MM-DD"
                  min="2019-01-01"
                  value={filters.to}
                  name="to"
                  onIonChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="filter-block-right filter-block-item">
              <IonSelect
                value={filters.sortBy}
                placeholder="Sắp xếp theo"
                interface="popover"
                onIonChange={(e) =>
                  setFilters({ ...filters, sortBy: e.detail.value })
                }
              >
                <IonSelectOption value="ABC">A-Z</IonSelectOption>
                <IonSelectOption value="Money">Money</IonSelectOption>
              </IonSelect>
            </div>
            <IonButton color="primary btn-apply" onClick={onSubmit}>
              Áp dụng
            </IonButton>
          </div>

          <div className="list">
            <IonList>
              {/* Multi-line sliding item with icon options on both sides */}
              {transactions &&
                transactions.map((item, idx) => (
                  <IonItem>
                    <IonLabel>
                      <h2>{item?.lender?.name}</h2>
                      <p>{item?.description}</p>
                    </IonLabel>
                    <div className="item-trans-right">
                      <div className="price">
                        <CurrencyFormat
                          className="text-color-black price"
                          value={item?.money}
                          thousandSeparator={true}
                          displayType={"text"}
                        />
                        <span className="unit">đ</span>
                      </div>
                      <p className="des">{item?.description}</p>
                    </div>
                  </IonItem>
                ))}
            </IonList>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: any): { transactions: Transaction[] } => {
  console.log(state);
  return {
    transactions: Object.values(state.transaction),
  };
};

export default connect(mapStateToProps, {
  fetchTransactionsData,
})(FilterTransactions);
