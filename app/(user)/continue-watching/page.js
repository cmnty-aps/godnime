"use client";
import ContinueWatchingCard from "@/components/Cards/ContinueWatchingCard/ContinueWatchingCard";
import { getWatchProgress } from "@/utils/GetProgress";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RiHistoryLine, RiDeleteBin6Line, RiPlayCircleLine } from "react-icons/ri";

const ContinueWatching = () => {
  const [mappedData, setMappedData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const data = getWatchProgress(false);
    if (data && Array.isArray(data)) {
      setMappedData(data);
    }
    setLoaded(true);
  }, []);

  const handleClear = () => {
    if (confirm("Apakah Anda yakin ingin menghapus seluruh riwayat tontonan?")) {
      localStorage.removeItem("watch_history");
      setMappedData([]);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#12111a] text-white pt-[106px] pb-32 px-4 sm:px-8 max-w-[96rem] mx-auto select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#221f33] mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Outfit']">
            Riwayat Nonton
          </h1>
          <p className="text-[#8e95a5] text-xs sm:text-sm mt-1">
            Lanjutkan menonton episode anime favorit yang pernah Anda tonton sebelumnya.
          </p>
        </div>

        {mappedData.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-2 bg-[#201d2e] hover:bg-[#2e1d28] hover:text-[#ed2672] text-[#8e95a5] text-xs font-semibold px-4 py-2.5 rounded-xl border border-[#2d293d] transition self-start sm:self-auto"
          >
            <RiDeleteBin6Line className="text-sm" />
            Hapus Riwayat ({mappedData.length})
          </button>
        )}
      </div>

      {/* Content Area */}
      {loaded && mappedData.length === 0 ? (
        <div className="bg-[#161424] border border-[#232036] rounded-3xl p-12 text-center max-w-lg mx-auto my-12 flex flex-col items-center shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-[#201d33] text-[#e0a948] flex items-center justify-center mb-4 text-3xl shadow-inner">
            <RiHistoryLine />
          </div>
          <h2 className="text-white font-bold text-xl mb-2 font-['Outfit']">
            Belum Ada Riwayat Tontonan
          </h2>
          <p className="text-[#8e95a5] text-xs sm:text-sm leading-relaxed mb-6">
            Anime dan episode yang Anda tonton akan tersimpan secara otomatis di sini agar Anda dapat melanjutkan kapan saja.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/catalog"
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-lg shadow-[#2563eb33] flex items-center gap-2"
            >
              <RiPlayCircleLine className="text-base" />
              Jelajahi Katalog
            </Link>
            <Link
              href="/schedule"
              className="bg-[#201d30] hover:bg-[#2a263f] text-white text-xs font-semibold px-5 py-2.5 rounded-xl border border-[#2d2942] transition"
            >
              Lihat Jadwal
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mappedData.map((data, idx) => (
            <ContinueWatchingCard key={data.id || idx} data={data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContinueWatching;