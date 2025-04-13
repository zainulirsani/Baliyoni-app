import { ArproType } from "@/type/arpro.type";
import ArproView from "@/views/Manager/DetailPerusahaan/Arpro";

interface ArproPageProps {
  arpro: ArproType[];
}

const ArproPage = ({ arpro }: ArproPageProps) => {
  return <ArproView data={arpro} />;
};

export default ArproPage;

export async function getStaticProps() {
  const res = await fetch('http://127.0.0.1:8002/api/presale');
  const response = await res.json();

  return {
      props: {
          arpro: response.data.totalPertanggal,
      },
      revalidate: 500,
  };
}

