import { IonChip, IonDatetime, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { checkmarkCircleOutline, arrowDown, arrowUp } from 'ionicons/icons';
import moment from 'moment';
import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';
import { fetchCategories } from '../redux/actions/categoryAction';
import { AccountingType, SummaryType, UNIT } from '../_core/constants';
import { matchSummary } from '../redux/actions/summaryAction'; 
import './../global.css';
import './SummaryView.css';

const SummaryView: React.FC = (props: any) => {
    const [filters, setFilters] = useState([
        {
            type: SummaryType.DAY,
            value: moment().format('YYYY-MM-DD'),
            active: true
        },
        {
            type: SummaryType.WEEK,
            value: moment().day() + 1
        },
        {
            type: SummaryType.DAY,
            value: moment().day() + 1
        },
        {
            type: SummaryType.DAY,
            value: moment().day() + 1
        },
    ]);
    const [selectedDate, setSelectedDate] = useState<string>(moment('2021-08-26').format('YYYY-MM-DD'));
    const summaryTypes = Object.keys(SummaryType).map(type => {
        return {id: type, label: type};
    }).slice(1);    

    useEffect(() => {
        
    }, []);

    const onChangeDate = (e: any) => {
        const date = e.detail.value!
        setSelectedDate(date);
        props.matchSummary({type: SummaryType.DAY, value: date});
    }
    const handleFilter = (type: any) => {
        props.matchSummary({type: SummaryType.DAY, value: selectedDate});
    }

    const renderAccounting = (type: string, value: number) => {
        return (
            <div className="item">
                <IonIcon
                    slot="start"
                    icon={type === AccountingType.INCOME ? arrowDown : arrowUp}
                    className={`icon ${type === AccountingType.INCOME ? 'in' : 'out'}`}
                />
                <IonLabel className="label">{type === AccountingType.INCOME ? 'Thu nhập' : 'Chi tiêu'}</IonLabel>
                <div className={`price`}>
                    <CurrencyFormat
                        value={value}
                        displayType={'text'}
                        thousandSeparator={true}   
                        renderText={(value: any) => <div className="price">{value}</div>}
                    />
                    <span className="unit">{UNIT}</span>
                </div>
            </div>       
        )
    }

    // const renderFilter = () => {
    //     return (
    //         <IonDatetime displayFormat="MM/DD/YYYY" min="1994-03-14" max="2012-12-09" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>

    //     )
    // }


    const renderSummary = (dataSummary: any) => {
        if (!dataSummary) {
            return null;
        }
        
        return dataSummary.map((element: any) => {
            const total = element.value.outComes - element.value.inComes;
            return (
                <div className="card" key={element.nameCategory}>
                    <div className="header">
                        <span className="caption">{element.nameCategory}</span>
                        <div className={`price ${total > 0 ? 'in' : 'out'}`}>
                            <CurrencyFormat
                                value={ total }
                                displayType={'text'}
                                thousandSeparator={true}   
                                renderText={(value: any) => <div className="caption">{value}</div>}
                            />
                            <span className="unit">{UNIT}</span>
                        </div>
                    </div>
                    <div className="content">
                        {renderAccounting(AccountingType.OUTCOME, element.value.outComes)}
                        {renderAccounting(AccountingType.INCOME, element.value.inComes)}
                    </div>
                </div>
            )
        })
    }

    const renderFilter = () => {
        return (
            <div className="filter-summary">
                <IonDatetime
                    className="datetime"
                    displayFormat="YYYY-MM-DD"
                    min="2021-01-01"
                    value={selectedDate}
                    onIonChange={e => onChangeDate(e)}
                >
                </IonDatetime>
                {/* {
                    summaryTypes.map(type => (
                        <IonChip
                            key={type.id}
                            onClick={() => handleFilter(type)}
                            color={`${selectedType === type.id ? 'primary' : 'medium'}`}
                        >
                            <IonIcon color={`${selectedType === type.id ? 'primary' : 'medium'}`} icon={checkmarkCircleOutline} />
                            <IonLabel color={`${selectedType === type.id ? 'primary' : 'medium'}`}>{type.label}</IonLabel>
                        </IonChip>
                    ))
                } */}
            </div>
        )
    }


    return (
        <div className="container">
            {renderFilter()}  
            {renderSummary(props.summaries)}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    console.log(state);
    
    return {
        summaries: state.summary.data
    }
}

export default connect(
    mapStateToProps,
    {
        matchSummary
    }
)(SummaryView);
