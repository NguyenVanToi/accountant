import {
  IonButton,
  IonButtons,
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
const UpdateLender: React.FC<{
  lender: any;
  onDismiss: () => void;
  editLender: any;
  createLender: any;
}> = ({ lender, onDismiss, editLender, createLender }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const listIcons = [
    documentTextOutline,
    cogOutline,
    homeOutline,
    personOutline,
    hammerOutline,
    constructOutline,
  ];
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { ...lender },
  });
  const convertCurrency2Number = (value: any) => {
    if (value != null && typeof value == "string") {
      return value.replace(/,/g, "");
    } else {
      return value;
    }
  };
  const onSubmit = (value: any) => {
    console.log(value);
    console.log(lender);

    const updatedLender = {
      ...value,
      money: +convertCurrency2Number(value.money),
      code: 1,
    };
    if (lender && lender.id) {
      editLender(updatedLender, lender);
    } else {
      createLender(updatedLender);
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
          <IonTitle>Người cho vay</IonTitle>
        </IonToolbar>
      </IonHeader>

      <form className="form container" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <IonLabel className="label">Tên</IonLabel>
          <IonInput
            className="form-control"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="mess-error">(*) Bắt buộc.</span>}
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
            <span className="unit">VNĐ</span>
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

export default UpdateLender;
