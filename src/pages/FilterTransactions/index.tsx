import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import moment from "moment";
import { stringify } from "querystring";
import { useState } from "react";
import { connect } from "react-redux";
import { fetchTransactionsData } from "../../redux/actions/transactionAction";
import { Transaction } from "../../_core/api/api";

const FilterTransactions: React.FC = (props: any) => {
  const [month, setMonth] = useState<number>();
  console.log("props", props.transactions);
  const [filters, setFilters] = useState<{
    from?: string;
    to?: string;
  }>({
    from: moment().subtract(1, "days").format("YYYY-MM-DD"),
    to: moment().format("YYYY-MM-DD"),
  });

  const handleChange = (e: any) => {
    const value = e.detail.value;
    const name = e.target.name;

    setFilters({ ...filters, [name]: value });
    console.log("e", e);
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
            <IonLabel>đến</IonLabel>
            <IonDatetime
              className="datetime"
              displayFormat="YYYY-MM-DD"
              min="2019-01-01"
              value={filters.to}
              name="to"
              onIonChange={(e) => handleChange(e)}
            />
          </div>
          <IonButton color="primary" onClick={onSubmit}>
            Submit
          </IonButton>
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
