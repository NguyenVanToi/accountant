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
import { AccountingType } from '../_core/constants';
import { Activity, Category } from '../_core/api/api';
const CreateActivity: React.FC<{
    activity: any
    onDismiss: () => void;
    createActivity: any,
    editActivity: any,
    categories: Category[]
}> = ({  activity, onDismiss, createActivity, editActivity, categories }) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {...activity}
    });
    const onSubmit = (value: any) => {
        console.log('activity');
        const act: Activity = { ...value };
        if (activity && activity.id) {
            editActivity(act);
            onDismiss();
            return;
        }
        createActivity(act);
        onDismiss();
        return;
    };
    const accountingTypes = Object.values(AccountingType).map((type) => {
        let name = '';
        switch (type) {
            case AccountingType.INCOME:
                name = 'Thu';
                break;
            case AccountingType.OUTCOME:
                name = 'Chi';
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
                            {...register("description", { required: false })}
                            rows={5}
                        />
                    </IonItem>
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
