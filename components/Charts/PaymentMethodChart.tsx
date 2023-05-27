import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

const PaymentMethodChart = () => {

    const [PaymentMethod, setPaymentMethod] = useState({
        pix: 0,
        debit: 0,
        credit: 0,
        money: 0
    });

    const [MoneyPercentage, setMoneyPercentage] = useState<Number>();
    const [PixPercentage, setPixPercentage] = useState<Number>();
    const [CreditPercentage, setCreditPercentage] = useState<Number>();
    const [DebitPercentage, setDebitPercentage] = useState<Number>();

    useEffect(() => {
        const newArray = new Array(21).fill({}).map(() => {
            return {
                paymentMethod: ['Pix', 'Débito', 'Dinheiro', 'Crédito'][Math.round(Math.random() * 3)]
            }
        })

        const paymentMethods = {
            pix: 0,
            debit: 0,
            credit: 0,
            money: 0
        }

        newArray.forEach((item) => {
            switch (item.paymentMethod) {
                case 'Pix':
                    paymentMethods.pix++
                    break;
                case 'Débito':
                    paymentMethods.debit++

                    break;
                case 'Dinheiro':
                    paymentMethods.money++

                    break;
                case 'Crédito':
                    paymentMethods.credit++

                    break;
            }
        })

        setPaymentMethod(paymentMethods)

        const moneyPercentage = (paymentMethods.money / 21);
        const pixPercentage = (paymentMethods.pix / 21);
        const creditPercentage = (paymentMethods.credit / 21);
        const debitPercentage = (paymentMethods.debit / 21);

        setMoneyPercentage(Math.round(moneyPercentage * 100))
        setPixPercentage(Math.round(pixPercentage * 100))
        setCreditPercentage(Math.round(creditPercentage * 100))
        setDebitPercentage(Math.round(debitPercentage * 100))
    }, []);

    function checkPercentage(method: 'pix' | 'debit' | 'credit' | 'money') {

        let strokeDashoffset = 630;

        switch (method) {
            case 'money':
                const moneyPercentage = (PaymentMethod.money / 21);
                strokeDashoffset = 630 - (630 * moneyPercentage)
                break;
            case 'pix':
                const pixPercentage = (PaymentMethod.pix / 21);
                strokeDashoffset = 630 - (630 * pixPercentage)
                break;
            case 'credit':
                const creditPercentage = (PaymentMethod.credit / 21);
                strokeDashoffset = 630 - (630 * creditPercentage)
                break;
            case 'debit':
                const debitPercentage = (PaymentMethod.debit / 21);
                strokeDashoffset = 630 - (630 * debitPercentage)
                break;
        }

        return strokeDashoffset

    }

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