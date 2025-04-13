import { PerusahaanType } from "@/type/Perusahaan.type";
import Dashboard from "@/views/Manager/Dashboard";
const DashboardManager = (props: { perusahaans: PerusahaanType[] }) => {
    const { perusahaans } = props;
    return (
        <div>
          <Dashboard perusahaans={perusahaans} />
        </div>
    )
}

export default DashboardManager;

export async function getServerSideProps(context: { req: any; }) {
    const { req } = context;
    const res = await fetch('http://127.0.0.1:8000/api/perusahaan', {
        headers: {
            Cookie: req.headers.cookie || '',
        },
    });

    if (res.status === 401) {
        // Kalau tidak terautentikasi, redirect ke halaman login
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    const response = await res.json();

    return {
        props: {
            perusahaans: response,
        },
    };
}

