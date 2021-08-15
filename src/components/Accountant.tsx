import { useState } from 'react';
import './../global.css';
import { AccountingType, UNIT } from '../_core/constants';
import {
    IonFab, IonFabButton,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList, useIonModal
} from '@ionic/react';
import { arrowDown, arrowUp, addOutline } from 'ionicons/icons';
import CurrencyFormat from 'react-currency-format';
import CreateActivity from './CreateActivity';
import { connect } from 'react-redux';

const Accountant: React.FC = (props: any) => {

    console.log(props.activities);
    const [list, setList] = useState([
        {
            id: 1,
            type: AccountingType.INCOME,
            name: 'Tien dien',
            amount: 431000,
            description: 'hihi',
            createdAt: '22/10/2021'
        },
        {
            id: 2,
            type: AccountingType.OUTCOME,
            name: 'Tien dien',
            amount: 431000,
            description: 'hihi',
            createdAt: '22/10/2021'
        }
    ]);
    const [activitySelected, setActivitySelected] = useState(null);

    const handleDismiss = () => {
        dismiss();
    };

    const [present, dismiss] = useIonModal(CreateActivity, {
        onDismiss: handleDismiss,
        activity: activitySelected
    });

    const createTask = () => {
        setActivitySelected(null);
        present({
            cssClass: 'modal custom',
        });
    }

    const renderList = () => {
        return (
            <IonList>
                {
                    list.map((item: any) => (
                        <IonItemSliding key={item?.id}>
                            <IonItem>
                                <IonIcon
                                    icon={item.type === AccountingType.INCOME ? arrowDown : arrowUp}
                                    className={`icon ${item.type === AccountingType.INCOME ? 'in' : 'out'}`}
                                />
                                <IonLabel>{item?.name}</IonLabel>
                                <div slot="end" className={`price ${item.type === AccountingType.INCOME ? 'in' : 'out'}`}>
                                    <CurrencyFormat
                                        value={item?.amount}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        renderText={(value: any) => <div className="price">{value}</div>}
                                    />
                                    <span className="unit">{UNIT}</span>
                                </div>
                            </IonItem>
                            <IonItemOptions side="end">
                                <IonItemOption onClick={() => {
                                }}>Unread</IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    ))
                }
            </IonList>
        );
    };

    return (
        <div className="container">
            {
                renderList()
            }
            <IonFab
                onClick={createTask}
                vertical="bottom"
                horizontal="end"
                slot="fixed"
            >
                <IonFabButton>
                    <IonIcon icon={addOutline} />
                </IonFabButton>
            </IonFab>

        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        activities: Object.values(state.activity)
    }
}

export default connect(
    mapStateToProps,
    {}
)(Accountant);
