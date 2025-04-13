import { ArmailType } from "@/type/armail.type";
import ArmaiView from "@/views/Manager/DetailPerusahaan/Armail";


const ArmailPage = ({ armail}: { armail: ArmailType}) => {
    return (
        <ArmaiView data={armail} />
    )
}

export default ArmailPage;

export async function getStaticProps() {
    const res = await fetch('http://127.0.0.1:8004/api/surats');
    const response = await res.json();
    return {
        props: {
           armail : response
        },
    };
}