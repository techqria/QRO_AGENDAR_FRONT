import  { GET_ALL_VETS } from "../graphql/services/user.service";
import { useQuery } from "@apollo/client";
import { AuthHeader } from "../hooks/AuthHeader";

export const EmployeesSchedule = () => {


    const {data, loading} = useQuery(GET_ALL_VETS,AuthHeader())

    if(loading) return <p>Carregando</p>

    return (
        <div className="mt-4 d-flex gap-2 align-items-center">
            <div className="d-flex gap-5">
                {
                    data.getAllVets.map((el, index) => (
                        <div key={index} className="d-flex gap-1 align-items-center">
                            <img style={{ borderStyle: 'solid', borderWidth: 3, borderColor: el.color }} className="rounded-circle" width={50} src="/images/person.png" alt="" />
                            <h6 style={{ color: el.color }} className="m-0 text-capitalize">{el.name}</h6>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}