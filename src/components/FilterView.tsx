import {
    IonButton,
    IonButtons, IonFab, IonFabButton,
    IonHeader,
    IonIcon, IonItem, IonLabel, IonSelect, IonSelectOption,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { checkmarkOutline, arrowBackOutline } from 'ionicons/icons';
import { AccountingType } from '../_core/constants';
import { Category } from '../_core/api/api';
import { useState } from 'react';
const FilterView: React.FC<{
    onDismiss: () => void;
    categories: Category[],
    fetchActivities: any,
    filter: any,
    setFilter: any
}> = ({ onDismiss, categories, fetchActivities, filter, setFilter }) => {
    const onSubmit = () => {
        fetchActivities(filter);
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
        }
        return {id: type, name};
    });
    const changeFilter = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;
        setFilter({...filter, [name]: value});
    }

    return (
        <div>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={onDismiss} color="primary">
                            <IonIcon slot="icon-only" icon={arrowBackOutline}/>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Lựa chọn tiêu chí</IonTitle>
                </IonToolbar>
            </IonHeader>

            <form className="form">
                {/* <div className="form-control">
                    <IonItem>
                        <IonLabel>Tên</IonLabel>
                        <IonInput
                            {...register("name", { required: true })}
                        />
                    </IonItem>
                    {errors.name && <span className="mess-error">(*) Bắt buộc.</span>}
                </div> */}

                {/* <div className="form-control">
                    <IonItem>
                        <IonLabel>Số lượng</IonLabel>
                        <IonInput
                            type="number"
                            {...register("amount", { required: true })}
                        />
                    </IonItem>
                    {errors.amount && <span className="mess-error">(*) Bắt buộc.</span>}

                </div> */}
                <div className="form-control">
                    <IonItem className="item" lines="none">
                        <IonLabel>Danh mục</IonLabel>
                        <IonSelect
                            interface="popover"
                            onIonChange={changeFilter}
                            name="categoryId"
                            value={filter.categoryId}
                        >
                            <IonSelectOption value={0} key={0}>Tất cả</IonSelectOption>
                            {
                                (categories || []).map((choice: any) => {
                                    return <IonSelectOption value={choice?.id} key={choice?.id}>{`${choice?.code} - ${choice?.name}`}</IonSelectOption>
                                })
                            }
                        </IonSelect>
                    </IonItem>
                </div>
                <div className="form-control">
                    <IonItem className="item" lines="none">
                        <IonLabel>Kiểu</IonLabel>
                        <IonSelect
                            interface="popover"
                            onIonChange={changeFilter}
                            name="type"
                            value={filter.type}
                        >
                            <IonSelectOption value={null}>Tất cả</IonSelectOption>
                            {
                                accountingTypes.map((choice: any) => {
                                    return <IonSelectOption value={choice?.id} key={choice?.id}>{choice?.name}</IonSelectOption>
                                })
                            }
                        </IonSelect>
                    </IonItem>
                </div>
            </form>
            <div className="ion-text-center">
                <IonButton
                    onClick={() => onSubmit()}
                    expand="block"
                    size="default"
                    style={{ width: '50%', margin: '1rem auto 0' }}
                >
                    <span>Lọc</span>
                </IonButton>
            </div>
            
        </div>
    )
};

export default FilterView;
