import {
    IonButton,
    IonButtons, IonFab, IonFabButton,
    IonHeader,
    IonIcon, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { checkmarkOutline, arrowBackOutline } from 'ionicons/icons';
import { useForm } from 'react-hook-form';
import SelectCustom from '../partials/SelectCustom';
import { useState } from 'react';
import { AccountingType } from '../_core/constants';
import { Activity } from '../_core/api/api';
const CreateActivity: React.FC<{
    activity: any
    onDismiss: () => void;
    createActivity: any,
    updateActivity: any,
}> = ({  activity, onDismiss, createActivity, updateActivity }) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {...activity}
    });
    const onSubmit = (value: any) => {
        const act: Activity = { ...value };
        if (activity && activity.id) {
            updateActivity(act);
            onDismiss();
            return;
        }
        createActivity(act);
        onDismiss();
        return;
    };
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: 'Ăn',
            type: 'EAT'
        },
        {
            id: 2,
            name: 'Điện',
            type: 'ELECTRIC'
        },
    ]);
    const accountingTypes = Object.values(AccountingType).map((type) => {
        let name = '';
        switch (type) {
            case AccountingType.INCOME:
                name = 'Vào';
                break;
            case AccountingType.OUTCOME:
                name = 'Ra';
                break;
            default:
                name = 'Không xác định';
                break;
        }
        return {id: type, name};
    })


    return (
        <div>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={onDismiss} color="primary">
                            <IonIcon slot="icon-only" icon={arrowBackOutline}/>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Tạo hành động</IonTitle>
                </IonToolbar>
            </IonHeader>

            <form className="form">
                <div className="form-control">
                    <IonItem>
                        <IonLabel>Tên</IonLabel>
                        <IonInput
                            {...register("name", { required: true })}
                        />
                    </IonItem>
                    {errors.name && <span className="mess-error">(*) Bắt buộc.</span>}
                </div>

                <div className="form-control">
                    <IonItem>
                        <IonLabel>Số lượng</IonLabel>
                        <IonInput
                            type="number"
                            {...register("amount", { required: true })}
                        />
                    </IonItem>
                    {errors.amount && <span className="mess-error">(*) Bắt buộc.</span>}

                </div>
                <div className="form-control">
                    <IonItem>
                        <IonLabel>Danh mục</IonLabel>
                        <SelectCustom
                            name="categoryId"
                            {...{ control, register,  choices: categories }}
                        />
                    </IonItem>
                    {errors.category && <span className="mess-error">(*) Bắt buộc.</span>}
                </div>
                <div className="form-control">
                    <IonItem>
                        <IonLabel>Loại</IonLabel>
                        <SelectCustom
                            name="type"
                            {...{ control, register,  choices: accountingTypes }}
                        />
                    </IonItem>
                    {errors.type && <span className="mess-error">(*) Bắt buộc.</span>}

                </div>
                <div className="form-control">
                    <IonItem>
                        <IonLabel>Ghi chú</IonLabel>
                        <IonTextarea
                            {...register("description", { required: true })}
                            rows={5}
                        />
                    </IonItem>
                    {errors.description && <span className="mess-error">(*) Bắt buộc.</span>}

                </div>
            </form>
            <IonFab
                onClick={handleSubmit(onSubmit)}
                vertical="bottom"
                horizontal="end"
                slot="fixed"
            >
                <IonFabButton type="submit">
                    <IonIcon icon={checkmarkOutline} />
                </IonFabButton>
            </IonFab>
        </div>
    )
};

export default CreateActivity;
