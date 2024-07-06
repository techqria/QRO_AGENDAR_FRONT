import { useEffect, useState } from "react";
import { GET_DASH_FINANCE } from "../../graphql/services/dashboard.service";
import { useLazyQuery, useQuery } from "@apollo/client";
import { AuthHeader } from "../../hooks/AuthHeader";
import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import Tooltip from "../Tooltip";

const FinanceChart = () => {

    const { startDate, finalDate } = useSelector((store: IStore) => store.dateFilter)

    const [financeValues, setFinanceValues] = useState({ pix: 0, debit: 0, credit: 0, money: 0 });
    const [highestPrice, setHighestPrice] = useState(0);

    const [getDashFinanceQuery, { loading }] = useLazyQuery(GET_DASH_FINANCE, AuthHeader())

    useEffect(() => {
        getDashFinance()
    }, [startDate, finalDate]);

    async function getDashFinance() {
        const { data } = await getDashFinanceQuery({ variables: { startDate, finalDate } })
        const financeValues = data?.getDashboardFinance.paymentMethods

        if (financeValues) {
            let arr = Object.values(financeValues)
            arr = arr.slice(0, arr.length)

            setFinanceValues(financeValues)
            setHighestPrice(arr.sort((a: any, b: any) => a - b).reverse()[0] as number)
        }
    }

    function getPercentage(price: number) {

        let percentage = 0;
        if (price !== highestPrice) {
            const fraction = price / highestPrice;

            percentage = fraction * 100

        } else {
            percentage = 100
        }
        return percentage;
    }

    if (loading) return <p>Carregando</p>

    return (
        <div className="col-md-12 text-black ">
            <div className="bg-white p-4 rounded">

                <h5>Financeiro</h5>

                <p>
                    Quanto entrou no período de tempo selecionado
                    {
                        highestPrice == 0 && <span className="text-danger">&nbsp;(Nada)</span>
                    }
                </p>

                <div className="d-flex gap-2">
                    <div className="d-flex mt-3">
                        <svg width={30} height={30}>
                            <circle cx={15} cy={12} r="10" fill="#34B53A" />
                        </svg>
                        <span>Dinheiro</span>
                    </div>
                    <div className="d-flex mt-3">
                        <svg width={30} height={30}>
                            <circle cx={15} cy={12} r="10" fill="#4339F2" />
                        </svg>
                        <span>Pix</span>
                    </div>
                    <div className="d-flex mt-3">
                        <svg width={30} height={30}>
                            <circle cx={15} cy={12} r="10" fill="#D902FC" />
                        </svg>
                        <span>Crédito</span>
                    </div>
                    <div className="d-flex mt-3">
                        <svg width={30} height={30}>
                            <circle cx={15} cy={12} r="10" fill="#FF3A29" />
                        </svg>
                        <span>Débito</span>
                    </div>
                </div>


                <div className="finance-chart d-flex mt-3 gap-3">
                    <div className="d-flex flex-column text-secondary gap-5 minh-260 justify-content-between">
                        <span>{highestPrice}</span>
                        {/* <span>{Math.round(highestPrice / 2)}</span>
                        <span>{Math.round(highestPrice / 3)}</span>
                        <span>{Math.round(highestPrice / 4)}</span> */}
                        <span>0</span>
                    </div>
                    {highestPrice > 0 &&
                        <div className="d-flex gap-4 align-items-end">
                            {financeValues.money > 0 &&
                                <div className="h-100 d-flex flex-column align-items-center justify-content-end">
                                    <div role="button" style={{ height: `${getPercentage(financeValues.money)}%` }} className="finance-chart-bar bg-money"></div>
                                    <span>{financeValues.money}</span>
                                </div>
                            }

                            {financeValues.pix > 0 &&
                                <div className="h-100 d-flex flex-column align-items-center justify-content-end">
                                    <div role="button" style={{ height: `${getPercentage(financeValues.pix)}%` }} className="finance-chart-bar bg-pix"></div>
                                    <span>{financeValues.pix}</span>
                                </div>
                            }

                            {financeValues.credit > 0 &&
                                <div className="h-100 d-flex flex-column align-items-center justify-content-end">
                                    <div role="button" style={{ height: `${getPercentage(financeValues.credit)}%` }} className="finance-chart-bar bg-credit"></div>
                                    <span>{financeValues.credit}</span>
                                </div>
                            }

                            {financeValues.debit > 0 &&
                                <div className="h-100 d-flex flex-column align-items-center justify-content-end">
                                    <div role="button" style={{ height: `${getPercentage(financeValues.debit)}%` }} className="finance-chart-bar bg-debit"></div>
                                    <span>{financeValues.debit}</span>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>

        </div>
    );
}

export default FinanceChart;