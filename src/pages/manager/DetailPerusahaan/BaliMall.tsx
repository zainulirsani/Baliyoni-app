import { BalimallType } from "@/type/balimall.type";
import BaliMallView from "@/views/Manager/DetailPerusahaan/BaliMall";

const BaliMallPage = ({balimall}:{ balimall: BalimallType}) => {
    return (
        <BaliMallView data={balimall} />
    )
}

export default BaliMallPage;

export async function getStaticProps() {
    const res = await fetch('http://127.0.0.1:8005/api/balimall');
    const response = await res.json();
    return {
        props: {
           balimall : response
        },
    };
}