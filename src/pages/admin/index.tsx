import { PerusahaanType } from "@/type/Perusahaan.type";
import Dashboard from "@/views/Admin/Dashboard";
const DashboardAdmin = (props: { perusahaans: PerusahaanType[] }) => {
    const { perusahaans } = props;
    return (
        <div>
          <Dashboard perusahaans={perusahaans} />
        </div>
    )
}

export default DashboardAdmin;

export async function getServerSideProps() {
    const res = await fetch('http://127.0.0.1:8000/api/perusahaan');
    const response = await res.json();

    return {
        props: {
            perusahaans: response
        }
    };
}


