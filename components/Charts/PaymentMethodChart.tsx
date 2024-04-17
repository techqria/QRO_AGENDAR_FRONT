import { useEffect, useState } from "react";
import { GET_DASH_PAYMENT_METHOD } from "../../graphql/services/dashboard.service";
import { useQuery } from "@apollo/client";
import { AuthHeader } from "../../hooks/AuthHeader";

const PaymentMethodChart = () => {

    const [MoneyPercentage, setMoneyPercentage] = useState<number>(0);
    const [PixPercentage, setPixPercentage] = useState<number>(0);
    const [CreditPercentage, setCreditPercentage] = useState<number>(0);
    const [DebitPercentage, setDebitPercentage] = useState<number>(0);

    const { data, loading } = useQuery(GET_DASH_PAYMENT_METHOD,AuthHeader())

    useEffect(() => {
        if (data) {
            const paymentMethods = data.getDashboard.paymentMethodsPercentage

            setMoneyPercentage(paymentMethods.money)
            setPixPercentage(paymentMethods.pix)
            setCreditPercentage(paymentMethods.credit)
            setDebitPercentage(paymentMethods.debit)
        }
    }, [data]);

    function checkPercentage(method: 'pix' | 'debit' | 'credit' | 'money') {

        let strokeDashoffset = 630;

        switch (method) {
            case 'money':
                strokeDashoffset = MoneyPercentage == 100 ? 0 : 630 - (630 * MoneyPercentage)
                break;
            case 'pix':
                strokeDashoffset = PixPercentage == 100 ? 0 : 630 - (630 * PixPercentage)
                break;
            case 'credit':
                strokeDashoffset = CreditPercentage == 100 ? 0 : 630 - (630 * CreditPercentage)
                break;
            case 'debit':
                strokeDashoffset = DebitPercentage == 100 ? 0 : 630 - (630 * DebitPercentage)
                break;
        }

        return strokeDashoffset

    }

    if (loading) return <p>Carregando</p>

    return (
        <div className="col-md-6 text-black mt-md-0 mt-4">
            <div className="bg-white p-4 rounded h-100 minh-400">

                <h5>Formas de pagamento</h5>

                <div className="d-flex gap-3">
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


                <div className="finance-chart d-flex mt-3 gap-3 ">
                    <div className="row d-flex justify-content-center mt-md-5">
                        <div className="col-md-3 col-6 mt-md-0 mt-4">
                            <svg width={'100%'} viewBox="0 0 221 221">
                                <circle style={{ strokeDashoffset: checkPercentage("money") }} className="chart-circular chart-money" r="100" cx={'50%'} cy={'50%'} />
                                <text className="fs-3 fw-bold" x={'52%'} y={'50%'} textAnchor="middle" alignmentBaseline="middle">{MoneyPercentage?.toString()} %</text>
                            </svg>
                        </div>
                        <div className="col-md-3 col-6 mt-md-0 mt-4">
                            <svg width={'100%'} viewBox="0 0 221 221">
                                <circle style={{ strokeDashoffset: checkPercentage("pix") }} className="chart-circular chart-pix" r="100" cx={'50%'} cy={'50%'} />
                                <text className="fs-3 fw-bold" x={'52%'} y={'50%'} textAnchor="middle" alignmentBaseline="middle">{PixPercentage?.toString()} %</text>
                            </svg>
                        </div>
                        <div className="col-md-3 col-6 mt-md-0 mt-4">
                            <svg width={'100%'} viewBox="0 0 221 221">
                                <circle style={{ strokeDashoffset: checkPercentage("credit") }} className="chart-circular chart-credit" r="100" cx={'50%'} cy={'50%'} />
                                <text className="fs-3 fw-bold" x={'52%'} y={'50%'} textAnchor="middle" alignmentBaseline="middle">{CreditPercentage?.toString()} %</text>
                            </svg>
                        </div>
                        <div className="col-md-3 col-6 mt-md-0 mt-4">
                            <svg width={'100%'} viewBox="0 0 221 221">
                                <circle style={{ strokeDashoffset: checkPercentage("debit") }} className="chart-circular chart-debit" r="100" cx={'50%'} cy={'50%'} />
                                <text className="fs-3 fw-bold" x={'52%'} y={'50%'} textAnchor="middle" alignmentBaseline="middle">{DebitPercentage?.toString()} %</text>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PaymentMethodChart;