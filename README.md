# 5Ticket - Nền tảng Đặt vé Sự kiện

Ứng dụng web đặt vé sự kiện được xây dựng với Next.js 15, hỗ trợ đa ngôn ngữ (Tiếng Việt/English) và tối ưu hóa trải nghiệm người dùng.

## 🚀 Công nghệ

- **Framework**: Next.js 15.5.4 (App Router)
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Internationalization**: next-intl 4.3.9
- **State Management**: Zustand 5.0.8
- **Data Fetching**: TanStack Query 5.90.2
- **Forms**: React Hook Form 7.63.0
- **Authentication**: NextAuth 4.24.11

## 📁 Cấu trúc dự án

```
src/
├── app/
│   ├── [locale]/          # Routing đa ngôn ngữ
│   │   ├── (pub)/         # Public routes
│   │   │   └── events/    # Trang sự kiện
│   │   └── layout.tsx     # Layout với i18n provider
│   ├── error.tsx          # Error boundary
│   └── layout.tsx         # Root layout
├── components/
│   ├── header/            # Header & LanguageSwitcher
│   ├── locale-switcher/   # Chuyển đổi ngôn ngữ
│   └── ui/                # shadcn/ui components
├── i18n/
│   ├── routing.ts         # Cấu hình routing i18n
│   ├── request.ts         # Server-side i18n config
│   └── navigation.ts      # Typed navigation helpers
├── fonts/                 # Reddit Sans font family
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities (cn, utils)
├── styles/                # Global CSS
├── types/                 # TypeScript types
├── utils/                 # Helper functions
└── middleware.ts          # i18n middleware

messages/
├── vi.json                # Bản dịch Tiếng Việt
└── en.json                # Bản dịch English
```

## 🌐 Đa ngôn ngữ (i18n)

- **Ngôn ngữ hỗ trợ**: Tiếng Việt (mặc định), English
- **Routing**: `/vi/*`, `/en/*`
- **Auto-detection**: Tự động phát hiện ngôn ngữ trình duyệt
- **Chuyển đổi**: Component LanguageSwitcher với cờ quốc gia

## 🎨 UI/UX

- **Design System**: shadcn/ui với Radix UI primitives
- **Theme**: Dark mode với màu nền #0d0d0d
- **Typography**: Reddit Sans font family
- **Icons**: Lucide React
- **Responsive**: Mobile-first design

## 🛠️ Scripts

```bash
# Development với Turbopack
npm run dev

# Build production
npm run build

# Start production server
npm start

# Linting
npm run lint

# Type checking
npm run check-types

# Pre-commit hooks
npm run lint-staged
```

## 📦 Cài đặt

```bash
# Clone repository
git clone <repository-url>

# Cài đặt dependencies
npm install
# hoặc
yarn install

# Chạy development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## 🔧 Cấu hình

### TypeScript Paths

```json
{
  "@/*": ["./src/*"],
  "@/components/*": ["./src/components/*"],
  "@/i18n/*": ["./src/i18n/*"]
}
```

### Environment Variables

Tạo file `.env.local`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

## 📝 Code Quality

- **ESLint**: Cấu hình Next.js + TypeScript
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **Commitlint**: Conventional commits
- **Lint-staged**: Pre-commit linting

## 🚢 Deployment

Triển khai dễ dàng trên [Vercel Platform](https://vercel.com/new):

```bash
# Build và kiểm tra
npm run build
npm run start
```

## 📚 Tài liệu tham khảo

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl.dev/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TanStack Query](https://tanstack.com/query)

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'feat: Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Private project - All rights reserved
