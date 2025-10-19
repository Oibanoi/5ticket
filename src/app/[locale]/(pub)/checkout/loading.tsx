export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-white text-lg">Đang tải thông tin thanh toán...</p>
      </div>
    </div>
  );
}
