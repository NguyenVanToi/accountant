import {
    IonButton,
    IonButtons, IonDatetime,
    IonHeader,
    IonIcon, IonItem, IonLabel, IonSelect, IonSelectOption,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import { AccountingType } from '../_core/constants';
import { Category } from '../_core/api/api';
const FilterView: React.FC<{
    onDismiss: () => void;
    categories: Category[],
    fetchActivities: any,
    filter: any,
    setFilter: any,
    isCreatedAt?: boolean
}> = ({ onDismiss, categories, fetchActivities, filter, setFilter, isCreatedAt }) => {
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
        let value = e.target.value;
        const name = e.target.name;
        if (name === 'createdAt') {
            value = e.detail.value!;
        }
        setFilter({...filter, [name]: value});
    }

    return (
        <div className="filter-view">
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

            <form className="form container">
                {
                    isCreatedAt && (
                        <div className="form-group">
                            <IonLabel className="label">Ngày</IonLabel>
                            <IonDatetime
                                displayFormat="DD/MM/YY"
                                placeholder="__/__/__"
                                value={filter.createdAt}
                                onIonChange={changeFilter}
                                className="select date"
                                name="createdAt"
                            >
                            </IonDatetime>
                        </div>
                            
                    )
                }
                <div className="form-group">
                    <IonLabel className="label">Danh mục</IonLabel>
                    <IonSelect
                        interface="popover"
                        onIonChange={changeFilter}
                        name="categoryId"
                        className="form-control"
                        value={filter.categoryId}
                    >
                        <IonSelectOption value={0} key={0}>Tất cả</IonSelectOption>
                        {
                            (categories || []).map((choice: any) => {
                                return <IonSelectOption value={choice?.id} key={choice?.id}>{`${choice?.code} - ${choice?.name}`}</IonSelectOption>
                            })
                        }
                    </IonSelect>
                </div>
                <div className="form-group">
                    <IonLabel className="label">Loại</IonLabel>
                    <IonSelect
                        interface="popover"
                        onIonChange={changeFilter}
                        name="type"
                        className="form-control"
                        value={filter.type}
                    >
                        <IonSelectOption value={null}>Tất cả</IonSelectOption>
                        {
                            accountingTypes.map((choice: any) => {
                                return <IonSelectOption value={choice?.id} key={choice?.id}>{choice?.name}</IonSelectOption>
                            })
                        }
                    </IonSelect>
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
