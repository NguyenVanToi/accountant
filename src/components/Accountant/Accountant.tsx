import { useEffect, useState } from 'react';
import './../../global.css';
import './Accountant.css';
import { AccountingType, UNIT } from '../../_core/constants';
import {
    IonFab, IonFabButton,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    useIonModal
} from '@ionic/react';
import { arrowDown, arrowUp, addOutline, trashBinOutline, filterOutline } from 'ionicons/icons';
import CurrencyFormat from 'react-currency-format';
import CreateActivity from './CreateActivity';
import { connect } from 'react-redux';
import { createActivity, deleteActivity, editActivity, fetchActivities } from '../../redux/actions';
import { Activity } from '../../_core/api/api';
import { fetchCategories } from '../../redux/actions/categoryAction';
import moment from 'moment';
import FilterView from './../../partials/FilterView';
import Loading from '../../partials/Loading';
import { createLoadingSelector } from '../../redux/stores/selectors';
import { ACTIVITY } from '../../redux/actions/type';

const Accountant: React.FC = (props: any) => {
    
    const [list, setList] = useState<Activity[]>([]);
    const [activitySelected, setActivitySelected] = useState<Activity | null>(null);
    const [filter, setFilter] = useState<{
        categoryId?: number,
        type?: string | null
    }>({
        categoryId: 0,
        type: null
    });
    useEffect(() => {
        const fetchActivities = async () => {
            const defaultFilterAct = {createdAt: moment().startOf('day').toISOString()};
            props.fetchActivities(defaultFilterAct);
            props.fetchCategories()
        }

        fetchActivities();
    }, []);

    useEffect(() => {
        setList(props.activities);
    }, [props.activities]);


    const handleDismiss = () => {
        dismiss();
    };
    const handleDismissFilter = () => {
        dismissFilter();
    };

    const [present, dismiss] = useIonModal(CreateActivity, {
        onDismiss: handleDismiss,
        activity: activitySelected,
        createActivity: props.createActivity,
        editActivity: props.editActivity,
        categories: props.categories,
        loading: props.loading
    });
    const [presentFilter, dismissFilter] = useIonModal(FilterView, {
        onDismiss: handleDismissFilter,
        categories: props.categories,
        fetchActivities: props.fetchActivities,
        filter: filter,
        setFilter: setFilter
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
        <div className="accountant">
            <div className="summary">
                <h3>Ng??y {moment().format('DD/MM/YYYY')}</h3>
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
                        <IonLabel className="u700">T???NG: </IonLabel>
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
                <h5>L???c</h5>
                <IonIcon icon={filterOutline} onClick={() => {
                    presentFilter({
                        cssClass: 'modal custom',
                    });
                }}/>
            </div>
            <div className="container">
            {
                renderList()
            }  
            </div>
            
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

            <Loading showLoading={props.loading}/>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        activities: Object.values(state.activity),
        amountIn: state.accounting.amountIn,
        amountOut: state.accounting.amountOut,
        categories: Object.values(state.category),
        loading: createLoadingSelector([ACTIVITY])(state)
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
