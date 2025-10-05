"use client";
import React, { useState } from "react";
import { Calendar, MapPin, ChevronDown, ChevronUp, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
export default function EventBooking() {
  const [expandedDay, setExpandedDay] = useState("day1");
  const [expandedTickets, setExpandedTickets] = useState({});
  const [showMobileTickets, setShowMobileTickets] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleTicket = (id) => {
    setExpandedTickets((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-[calc(100dvh-60px)] bg-zinc-950 text-white ">
      <div className="max-w-7xl mx-auto ">
        {/* Hero Section - Image + Info Side by Side on Desktop, Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-[2.6fr_1.4fr]  mb-8 sm:mb-12">
          {/* Left - Event Image */}
          <div className="relative rounded-3xl overflow-hidden aspect-[16/9] ">
            <Image src="/mock-event.png" alt="Event Hero" fill className="object-cover" />
          </div>

          {/* Right - Event Info */}
          <div className="flex flex-col justify-between  p-6 bg-dark rounded-3xl ">
            <div className="flex flex-col gap-3">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                [BẾN THÀNH] Đêm nhạc Minh Tuyết - Phạm Quỳnh Anh
              </h1>

              <div className=" text-sm sm:text-base flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0 text-zinc-400" />
                  <span className="text-light-active text-sm">05 tháng 09, 2025</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-zinc-400" />
                  <span className="text-light-active text-sm">
                    Khu đô thị Vạn Phúc, Phường Hiệp Bình Phước, Quận Thủ Đức, Thành Phố Hồ Chí Minh
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-6   lg:block">
              <div className="text-red-normal text-3xl lg:text-4xl font-bold mb-4">Từ 279.000đ</div>
              <Button
                variant="secondary"
                size="lg"
                className="w-full h-[48px] px-[84px] leading-[150%] rounded-4xl font-bold !text-base lg:text-lg transition text-light-white-hover"
              >
                Chọn lịch
              </Button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2.6fr_1.4fr] sm:gap-8">
          {/* Main Content */}
          <div className="space-y-6 sm:space-y-8 p-4 pb-24 lg:pb-9">
            {/* Description */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold">Giới thiệu</h2>
              <div className="relative">
                <p
                  className={`text-sm sm:text-base text-zinc-400 leading-relaxed transition-all duration-300 ${
                    isExpanded ? "" : "line-clamp-3"
                  }`}
                >
                  Lorem ipsum dolor sit amet consectetur. Tincidunt cursus mattis at commodo tempor
                  turpis vitae duis porttitor. Consequat potenti lobortis vitae urna rhoncus elit
                  massa eget sit. Cursus tristique blandit id enim facilisi tincidunt. Erat dolor
                  massa viverra gravida habitasse eget dictum at pellentesque. Eget erat odio
                  aliquam tristique est suspendisse. Ut ultrices mi semper nascetur sed pretium.
                  Auctor in vestibulum mauris porta risus. Mi sed nibh sed rhoncus duis nulla vitae
                  et nulla. Consequat malesuada sit faucibus urna dictumst quis euismod.
                </p>

                {/* Gradient overlay when collapsed */}
                {!isExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
                )}
              </div>
            </div>

            {/* Gallery - Only show when expanded */}
            {isExpanded && (
              <div className="relative rounded-3xl overflow-hidden aspect-[16/9] animate-in fade-in slide-in-from-top-4 duration-300">
                <Image src="/mock-event.png" alt="Event Hero" fill className="object-cover" />
              </div>
            )}

            {/* Toggle Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full py-3  rounded-lg text-sm sm:text-base text-zinc-400   transition-all flex items-center justify-center gap-2 group"
            >
              {isExpanded ? "Thu gọn" : "Xem thêm"}
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 group-hover:translate-y-[2px] transition-transform" />
              )}
            </button>
          </div>

          {/* Sidebar - Ticket Selection (Desktop Only) */}
          <div className="hidden lg:block space-y-3">
            {/* Day 1 */}
            <div className="bg-zinc-900 rounded-3xl overflow-hidden">
              <button
                onClick={() => setExpandedDay(expandedDay === "day1" ? null : "day1")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-zinc-800 transition"
              >
                <div className="flex items-center gap-3">
                  {expandedDay === "day1" ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                  <span className="font-bold text-base">Ngày 1 (27/08/2025)</span>
                </div>
                <Button
                  variant="secondary"
                  className="text-light-white-hover px-4 py-2 rounded-3xl text-sm font-bold"
                >
                  Mua vé ngay
                </Button>
              </button>

              {expandedDay === "day1" && (
                <div className="px-6 pb-4 space-y-0.5">
                  {/* Ticket 1 */}
                  <div className="bg-dark rounded-3xl overflow-hidden">
                    <button
                      onClick={() => toggleTicket("ticket1")}
                      className="w-full px-4 py-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        {expandedTickets["ticket1"] ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                        <span className="font-bold text-base text-light">SVIP1</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-pink-500 font-bold">10.000.000đ</span>
                        <button className="!py-1 !px-4 text-dark-active rounded-3xl text-sm font-bold bg-dark-lighter hover:bg-dark-lighter">
                          Hết vé
                        </button>
                      </div>
                    </button>
                    {expandedTickets["ticket1"] && (
                      <div className="px-4 pb-3 pt-1 text-sm text-zinc-400">
                        Lorem ipsum dolor sit amet consectetur. Morbi fringilla nunc vestibulum leo
                        orci.
                      </div>
                    )}
                  </div>

                  {/* Ticket 2 */}
                  <div className="bg-dark rounded-3xl overflow-hidden">
                    <button
                      onClick={() => toggleTicket("ticket2")}
                      className="w-full px-4 py-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        {expandedTickets["ticket2"] ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                        <span className="font-bold text-base text-light">SVIP2</span>
                      </div>
                      <span className="text-pink-500 font-bold">10.000.000đ</span>
                    </button>
                    {expandedTickets["ticket2"] && (
                      <div className="px-4 pb-3  text-sm text-light-normal">
                        Lorem ipsum dolor sit amet consectetur. Pellentesque sed tellus bibendum
                        nulla eget.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Day 2 */}
            <div className="bg-zinc-900 rounded-3xl overflow-hidden">
              <button
                onClick={() => setExpandedDay(expandedDay === "day2" ? null : "day2")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-zinc-800 transition"
              >
                <div className="flex items-center gap-3">
                  {expandedDay === "day2" ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                  <span className="font-bold text-base">Ngày 2 (28/08/2025)</span>
                </div>
                <Button
                  variant="secondary"
                  className="text-light-white-hover px-4 py-2 rounded-3xl text-sm font-bold"
                >
                  Mua vé ngay
                </Button>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Selection Modal */}
      {showMobileTickets && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end lg:items-center">
          <div className="bg-zinc-900 w-full lg:max-w-2xl lg:mx-auto rounded-t-2xl lg:rounded-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 px-4 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Chọn vé</h3>
              <button
                onClick={() => setShowMobileTickets(false)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              {/* Day 1 */}
              <div className="bg-zinc-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedDay(expandedDay === "day1" ? null : "day1")}
                  className="w-full px-4 py-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {expandedDay === "day1" ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                    <span className="font-medium">Ngày 1 (27/08/2025)</span>
                  </div>
                </button>

                {expandedDay === "day1" && (
                  <div className="px-4 pb-4 space-y-3">
                    {/* Ticket 1 */}
                    <div className="bg-zinc-900 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleTicket("mobile-ticket1")}
                        className="w-full px-4 py-3 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          {expandedTickets["mobile-ticket1"] ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                          <span className="font-medium">SVIP1</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-pink-500 font-bold text-sm">10.000.000đ</span>
                          <button className="px-3 py-1 bg-zinc-700 rounded text-xs">Hết vé</button>
                        </div>
                      </button>
                      {expandedTickets["mobile-ticket1"] && (
                        <div className="px-4 pb-3 pt-1 text-sm text-zinc-400">
                          Lorem ipsum dolor sit amet consectetur. Morbi fringilla nunc vestibulum
                          leo orci.
                        </div>
                      )}
                    </div>

                    {/* Ticket 2 */}
                    <div className="bg-zinc-900 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleTicket("mobile-ticket2")}
                        className="w-full px-4 py-3 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          {expandedTickets["mobile-ticket2"] ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                          <span className="font-medium">SVIP1</span>
                        </div>
                        <span className="text-pink-500 font-bold text-sm">10.000.000đ</span>
                      </button>
                      {expandedTickets["mobile-ticket2"] && (
                        <div className="px-4 pb-3 pt-1 text-sm text-zinc-400">
                          Lorem ipsum dolor sit amet consectetur. Pellentesque sed tellus bibendum
                          nulla eget.
                        </div>
                      )}
                    </div>

                    <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">
                      Mua vé ngay
                    </button>
                  </div>
                )}
              </div>

              {/* Day 2 */}
              <div className="bg-zinc-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedDay(expandedDay === "day2" ? null : "day2")}
                  className="w-full px-4 py-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {expandedDay === "day2" ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                    <span className="font-medium">Ngày 2 (28/08/2025)</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 px-4 py-3 lg:hidden z-50">
        <Button
          onClick={() => setShowMobileTickets(true)}
          className="w-full h-[48px] rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base"
        >
          Chọn vé
        </Button>
      </div>
    </div>
  );
}
