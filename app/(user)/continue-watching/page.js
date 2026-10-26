"use client"
import ContinueWatchingCard from "@/components/Cards/ContinueWatchingCard/ContinueWatchingCard"
import { getWatchProgress } from "@/utils/GetProgress"
import { Fragment, useEffect, useState } from "react"
import Link from "next/link"
import { RiHistoryLine } from "react-icons/ri"

const ContinueWatching = () => {
  const [mappedData, setMappedData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const data = getWatchProgress(false)
    if (data) {
      setMappedData(data);
    }
    setLoaded(true);
  }, []);

  const handleClear = () => {
    if (confirm("Hapus semua riwayat tontonan?")) {
      localStorage.removeItem("watch_history");
      setMappedData([]);
    }
  };

  return (
    <Fragment>
      <div className="w-full flex flex-col items-center z-10 relative main-responsive top-[86px] pb-28">
        <div className="w-full max-w-[96rem] relative py-6">

          {/* small line separation */}
          <div className="w-[-webkit-fill-available] h-[1px] absolute bg-[#212029] top-[1px]"></div>

          <div className="mt-[15px] flex flex-col">
            <div className="flex items-center justify-between">
              <h1 className="text-[#ffffffea] font-medium text-[23px] font-['poppins'] flex items-center gap-2">
                <RiHistoryLine className="text-[#e0a948]" />
                Riwayat Nonton ({mappedData.length} Anime)
              </h1>

              {mappedData.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-[#8e95a5] hover:text-[#ed2672] transition"
                >
                  Hapus Riwayat
                </button>
              )}
            </div>

            {loaded && mappedData.length < 1 ? (
              <div className="text-center py-24 flex flex-col items-center gap-3">
                <RiHistoryLine className="text-5xl text-[#393e4d]" />
                <p className="text-white font-semibold text-lg">Belum Ada Riwayat Nonton</p>
                <p className="text-[#8e95a5] text-sm max-w-sm">
                  Anime yang kamu tonton akan otomatis muncul di halaman ini agar kamu bisa melanjutkan menonton kapan saja.
                </p>
                <Link
                  href="/schedule"
                  className="mt-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition shadow"
                >
                  Lihat Jadwal Anime
                </Link>
              </div>
            ) : (
              <div className="mt-8 mb-24 grid grid-cols-[repeat(auto-fit,minmax(343px,1fr))] max-[725px]:grid-cols-[repeat(auto-fit,minmax(285px,1fr))] gap-3">
                {mappedData.map(data => (
                  <ContinueWatchingCard key={data.id} data={data} />
                ))}

                {(mappedData?.length < 4) ? Array.from({ length: 4 - mappedData?.length }).map((i, _) => <ContinueWatchingCard key={_} hidden />) : null}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* background */}
      <div className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] bg-[#92b7fc8f] blur-[200px]"></div>
      <div className="fixed w-[500px] h-[370.13px] right-[50%] bottom-[20%] bg-[#576683b4] blur-[215.03px] translate-x-[70%] z-0 rounded-b-[30%]"></div>
    </Fragment>
  )
}

export default ContinueWatching