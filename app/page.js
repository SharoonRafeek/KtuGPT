import Image from "next/image";

export default function Home() {
  return (
    <main className="flex w-full text-white h-screen">
      <div className="w-1/4 h-full bg-gray-500">
        <div className="flex justify-center">
          History
        </div>
      </div>
      <div className="w-3/4 flex flex-col justify-end bg-black">
        <div className="w-full p-5 flex justify-center h-15">
          <input type="text" className="w-3/4 rounded-md h-10 p-4 text-black"  placeholder="Ask me.."/>
        </div>
      </div>
    </main>
  );
}
