import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IStore } from "../../store/types/types";
import { useLazyQuery } from "@apollo/client";
import { GET_DASH_SPECIALTIES } from "../../graphql/services/dashboard.service";
import { AuthHeader } from "../../hooks/AuthHeader";
import Tooltip from "../Tooltip";

const SpecialtyChart = () => {

    const { startDate, finalDate } = useSelector((store: IStore) => store.dateFilter)

    const [specialties, setSpecialties] = useState([]);
    const [highestSpecialty, setHighestSpecialty] = useState(0);

    const [getDashSpecialtiesQuery, { loading }] = useLazyQuery(GET_DASH_SPECIALTIES, AuthHeader())

    useEffect(() => {
        getDashSpecialties()
    }, [startDate, finalDate]);

    async function getDashSpecialties() {
        const { data } = await getDashSpecialtiesQuery({ variables: { startDate, finalDate } })
        const result = data?.getDashboardSpecialties.specialties

        if (result.length) {
            setSpecialties(result)
            setHighestSpecialty(result.sort((a: any, b: any) => a?.total_price - b?.total_price).reverse()[0]?.total_price)
        } else {
            setSpecialties([])
            setHighestSpecialty(0)
        }
    }

    function getPercentage(price: number) {

        let percentage = 0;
        if (price !== highestSpecialty) {
            const fraction = price / highestSpecialty;

            percentage = fraction * 100

        } else {
            percentage = 100
        }
        return percentage;
    }

    if (loading) return <p>Carregando</p>

    return (
        <div className="col-md-6 text-black mt-4">
            <div className="bg-white p-4 rounded  minh-400">

                <h5>Especialidades mais atendidas</h5>
                {highestSpecialty == 0 ? <p className="text-danger mt-5 ">Nenhuma especilidade no périodo de tempo escolhido</p>
                    :
                    <>
                        <div className="d-flex gap-3">
                            {specialties.map((el, index) =>
                                <div key={index} className="d-flex mt-3">
                                    <svg width={30} height={30}>
                                        <circle cx={15} cy={12} r="10" fill={`${el.color}`} />
                                    </svg>
                                    <span className="text-capitalize">{el.specialty}</span>
                                </div>
                            )}
                        </div>

                        <div className="finance-chart d-flex mt-3 gap-4">
                            <div className="d-flex flex-column text-secondary gap-5 minh-260 justify-content-between">
                                <span>{highestSpecialty}</span>
                                {/* <span>{Math.round(highestSpecialty / 2)}</span>
                        <span>{Math.round(highestSpecialty / 3)}</span>
                        <span>{Math.round(highestSpecialty / 4)}</span> */}
                                <span>0</span>
                            </div>
                            <div className="d-flex gap-5 overflow-auto specialty-chart">
                                {highestSpecialty > 0 &&
                                    <div className="d-flex gap-4 align-items-end">
                                        {specialties.map((el, index) =>
                                            <div className="h-100 d-flex flex-column align-items-center justify-content-end">
                                                <div role="button" style={{ height: `${getPercentage(el.total_price)}%`, backgroundColor: el.color }} className="finance-chart-bar"></div>
                                                <span>{el.total_price}</span>
                                            </div>
                                        )}
                                    </div>
                                }
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default SpecialtyChart;