import { useEffect, useState } from 'react';
import './../global.css';
import './Accountant.css';
import { AccountingType, UNIT } from '../_core/constants';
import {
    IonFab, IonFabButton,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonSelect,
    IonSelectOption,
    useIonModal
} from '@ionic/react';
import { arrowDown, arrowUp, addOutline, trashBinOutline } from 'ionicons/icons';
import CurrencyFormat from 'react-currency-format';
import CreateActivity from './CreateActivity';
import { connect } from 'react-redux';
import { createActivity, deleteActivity, editActivity, fetchActivities } from '../redux/actions';
import { Activity } from '../_core/api/api';
import { fetchCategories } from '../redux/actions/categoryAction';
import moment from 'moment';

const Accountant: React.FC = (props: any) => {

    const [list, setList] = useState<Activity[]>([]);
    const [activitySelected, setActivitySelected] = useState<Activity | null>(null);
    const [filter, setFiter] = useState<{
        categoryId?: number,
        type?: string
    }>({
        categoryId: undefined,
        type: undefined
    });
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
    })

    useEffect(() => {
        const fetchActivities = async () => {
            props.fetchActivities();
            props.fetchCategories()
        }

        fetchActivities();
    }, []);
    useEffect(() => {
        console.log('filter', filter)
        if (filter) {
            props.fetchActivities(filter);
        }
    }, [filter]);

    useEffect(() => {
        setList(props.activities);
    }, [props.activities]);

    const handleDismiss = () => {
        dismiss();
    };

    const [present, dismiss] = useIonModal(CreateActivity, {
        onDismiss: handleDismiss,
        activity: activitySelected,
        createActivity: props.createActivity,
        editActivity: props.editActivity,
        categories: props.categories
    });

    const handleActivity = (activity?: Activity) => {
        if (activity && activity.id) {
            setActivitySelected(activity);
        } else {
            setActivitySelected(null);
        }
        present({
            cssClass: 'modal custom',
        });
    }

    const deleteActivity = (activity: Activity) => {
        props.deleteActivity(activity);
    }

    const changeFilter = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;
        console.log(name);
        console.log(value);
        setFiter({...filter, [name]: value});
    }

    const renderList = () => {
        return (
            <IonList className="list">
                {
                    list.map((item: any) => (
                        <IonItemSliding key={item?.id}>
                            <IonItem className="item" onClick={() => handleActivity(item)}>
                                <IonIcon
                                    slot="start"
                                    icon={item.type === AccountingType.INCOME ? arrowDown : arrowUp}
                                    className={`icon ${item.type === AccountingType.INCOME ? 'in' : 'out'}`}
                                />
                                <IonLabel>{item?.name}</IonLabel>
                                <div className={`price`}>
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
                                <IonItemOption color="danger" onClick={() => deleteActivity(item)}>
                                    <IonIcon icon={trashBinOutline} />
                                </IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    ))
                }
            </IonList>
        );
    };

    return (
        <div className="container">
            <div className="summary">
                <h3>Ngày {moment().format('DD/MM/YYYY')}</h3>
                <IonList className="list" mode="ios">
                    <IonItem lines="none">
                        <IonLabel>Thu: </IonLabel>
                        <div className="price in" slot="end">
                            <CurrencyFormat
                                value={props?.amountIn}
                                displayType={'text'}
                                thousandSeparator={true}
                                renderText={(value: any) => <div>{value}</div>}
                            />
                            <span className="unit">{UNIT}</span>
                        </div>
                    </IonItem>
                    <IonItem lines="none">
                        <IonLabel>Chi: </IonLabel>
                        <div className="price out" slot="end">
                            <CurrencyFormat
                                value={props?.amountOut}
                                displayType={'text'}
                                thousandSeparator={true}
                                renderText={(value: any) => <div>{value}</div>}
                            />
                            <span className="unit">{UNIT}</span>
                        </div>
                    </IonItem>
                    <IonItem lines="none">
                        <IonLabel className="u700">TỔNG: </IonLabel>
                        <div className={`price u700 ${(props?.amountIn - props?.amountOut) >= 0 ? 'in' : 'out'}`} slot="end">
                            <CurrencyFormat
                                value={props?.amountIn - props?.amountOut}
                                displayType={'text'}
                                thousandSeparator={true}
                                renderText={(value: any) => (
                                    <div>{
                                        `${(props?.amountIn - props?.amountOut) >= 0 ? '+' : ''}  ${value}`
                                    }</div>
                                )}
                            />
                            <span className="unit">{UNIT}</span>
                        </div>
                    </IonItem>
                </IonList>
            </div>
            <div className="filter">
                <h5>Lọc</h5>
                <div className="form-control">
                    <IonItem className="item" lines="none">
                        <IonLabel>Danh mục</IonLabel>
                        <IonSelect
                            interface="popover"
                            onIonChange={changeFilter}
                            name="categoryId"
                            value={filter.categoryId}
                        >
                            <IonSelectOption value={undefined} key={0}>Tất cả</IonSelectOption>
                            {
                                (props?.categories || []).map((choice: any) => {
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
                            <IonSelectOption value={undefined} key={0}>Tất cả</IonSelectOption>
                            {
                                accountingTypes.map((choice: any) => {
                                    return <IonSelectOption value={choice?.id} key={choice?.id}>{choice?.name}</IonSelectOption>
                                })
                            }
                        </IonSelect>
                    </IonItem>
                </div>
            </div>
            {
                renderList()
            }
            <IonFab
                onClick={() => handleActivity()}
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
        activities: Object.values(state.activity),
        amountIn: state.accounting.amountIn,
        amountOut: state.accounting.amountOut,
        categories: Object.values(state.category)
    }
}

export default connect(
    mapStateToProps,
    {
        fetchActivities,
        createActivity,
        editActivity,
        deleteActivity,
        fetchCategories
    }
)(Accountant);
