import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [veriler, setVeriler] = useState([]);

  const fetchSheet = async () => {
    const res = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRizgYbFKpmcsBp8nUlW9_Apu6QFCUtk3SoRy1SesUm8sIW-harYDhjFsrWSwordGH5oTf3MmJrYP5t/pub?gid=0&single=true&output=csv");
    const text = await res.text();
    const rows = text.split("\n").slice(1);
    const parsed = rows.map(row => row.split(",").map(cell => cell.replaceAll('"', ''))).filter(r => r.length >= 4);
    setVeriler(parsed);
  };

  useEffect(() => {
    fetchSheet();
  }, []);

  const now = new Date();
  const saat = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const tarih = now.toLocaleDateString();

  return (
    <div className="min-h-screen bg-black text-yellow-400 p-6 font-sans">
      <Head>
        <title>Altunlar Kuyumculuk</title>
      </Head>
      <div className="flex justify-between items-center w-full max-w-6xl mx-auto mb-6">
        <div className="flex items-center gap-4">
          <Image src="/altunlar-logo.png" alt="Altunlar Logo" width={120} height={120} className="object-contain drop-shadow-lg" />
          <h1 className="text-4xl font-bold tracking-wide">Altunlar Kuyumculuk</h1>
        </div>
        <div className="text-right text-sm text-yellow-300">
          <div>{tarih}</div>
          <div>{saat}</div>
        </div>
      </div>

      <div className="text-center mb-4">
        <button
          onClick={fetchSheet}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-xl shadow-lg"
        >
          Fiyatları Güncelle
        </button>
      </div>

      <table className="table-auto w-full max-w-6xl mx-auto border border-yellow-700 text-base">
        <thead>
          <tr className="bg-zinc-800 text-yellow-300">
            <th className="p-3 border-b border-yellow-700 text-left">Ürün Cinsi</th>
            <th className="p-3 border-b border-yellow-700 text-left">Satış (KDV Dahil)</th>
            <th className="p-3 border-b border-yellow-700 text-left">Değiştirme</th>
            <th className="p-3 border-b border-yellow-700 text-left">Geri Alım</th>
          </tr>
        </thead>
        <tbody>
          {veriler.map((row, i) => (
            <tr key={i} className="even:bg-zinc-900 odd:bg-zinc-950">
              {row.map((cell, j) => (
                <td key={j} className="p-3 border-b border-yellow-700 font-medium">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="mt-10 text-sm text-zinc-500 text-center">
        Güncel fiyat listesi &copy; {now.getFullYear()} Altunlar Kuyumculuk
      </footer>
    </div>
  );
}