import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

type SuratType = {
  jenis_surat: string;
  tanggal_awal: string;
  tanggal_akhir: string;
  perihal?: string;
};

type CalendarProps = {
  data: SuratType[];
};

const CustomCalender: React.FC<CalendarProps> = ({ data }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Cek jika layar <= 768px (mobile)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const converted = data.map((item) => ({
      title: item.jenis_surat,
      start: item.tanggal_awal,
      end: item.tanggal_akhir,
      extendedProps: {
        perihal: item.perihal || "-",
      },
    }));
    setEvents(converted);
  }, [data]);

  return (
    <div className="bg-white shadow-lg p-3 rounded-xl">
      <style jsx global>{`
    .fc .fc-toolbar-title {
      font-size: 1.5rem !important; /* kecilkan font title */
    }
  `}</style>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={
          isMobile
            ? {
              left: "prev,next",
              center: "title",
              right: "",
            }
            : {
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }
        }
        eventDidMount={(info) => {
          tippy(info.el, {
            content: info.event.extendedProps.perihal,
          });
        }}
      />
    </div>

  );
};

export default CustomCalender;
