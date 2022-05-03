import {
  IonButton,
  IonButtons,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { checkmarkOutline, arrowBackOutline } from "ionicons/icons";
import { Controller, useForm } from "react-hook-form";
import { Category } from "../../_core/api/api";
import {
  cogOutline,
  homeOutline,
  personOutline,
  documentTextOutline,
  constructOutline,
  hammerOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
const UpdateTransaction: React.FC<{
  transaction: any;
  onDismiss: () => void;
  editTransaction: any;
  createTransaction: any;
  lenderId: number;
}> = ({
  transaction,
  onDismiss,
  editTransaction,
  createTransaction,
  lenderId,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { ...transaction },
  });
  const convertCurrency2Number = (value: any) => {
    if (value != null && typeof value == "string") {
      return value.replace(/,/g, "");
    } else {
      return value;
    }
  };
  console.log(lenderId);
  const onSubmit = (value: any) => {
    console.log(value);
    const dataTrans = {
      ...value,
      money: +convertCurrency2Number(value.money),
      rate: 1,
      name: "Trả nợ",
      lender: {
        id: lenderId,
      },
    };
    console.log(dataTrans);
    if (transaction && transaction.id) {
      editTransaction(dataTrans, transaction);
    } else {
      console.log("create");
      createTransaction(dataTrans);
    }
    onDismiss();
    return;
  };
  return (
    <div>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDismiss} color="primary">
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Lịch sử</IonTitle>
        </IonToolbar>
      </IonHeader>

      <form className="form container" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <IonLabel className="label">Ngày</IonLabel>
          {/* <IonInput
            className="form-control"
            {...register("name", { required: true })}
          /> */}
          <IonDatetime
            className="select date"
            displayFormat="DD/MM/YY"
            placeholder="__/__/__"
            min="2021-01-01"
            {...register("date", { required: true })}
          ></IonDatetime>
          {errors.date && <span className="mess-error">(*) Bắt buộc.</span>}
        </div>
        <div className="form-group">
          <IonLabel className="label">Số tiền</IonLabel>
          <div className="control-unit">
            <Controller
              name="money"
              control={control}
              rules={{
                required: true,
                min: 0,
              }}
              render={({ field }) => (
                <CurrencyFormat
                  {...field}
                  className={`${
                    errors.money ? "invalid" : ""
                  } form-control input-price`}
                  thousandSeparator={true}
                  id="money"
                  placeholder="0"
                />
              )}
            />
            <span className="unit">đ</span>
          </div>
          {errors.money && <span className="mess-error">(*) Bắt buộc.</span>}
        </div>
        <div className="form-group">
          <IonLabel className="label">Ghi chú</IonLabel>
          <IonTextarea
            className="form-control"
            {...register("description", { required: false })}
            rows={5}
          />
        </div>
        <div className="form-buttons">
          <IonButton expand="block" fill="solid" type="submit">
            Lưu
          </IonButton>
        </div>
      </form>
    </div>
  );
};

export default UpdateTransaction;
